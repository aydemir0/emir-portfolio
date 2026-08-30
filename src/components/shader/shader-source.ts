// Vertex shader — standard passthrough.
// Passes UV coordinates to the fragment shader.
// No vertex displacement needed for a fullscreen quad.
export const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    // Pass the mesh UV to the fragment shader unchanged
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader — custom neural-aurora field.
// Uses u_time, u_resolution, and u_mouse to produce a blue/violet/cyan flow.
export const fragmentShader = /* glsl */ `
  // --- Uniforms ---
  // u_time:       seconds elapsed, drives continuous slow animation
  // u_resolution: canvas pixel size, keeps the pattern proportional on any screen
  // u_mouse:      normalized pointer position (0→1), gently shifts the flow origin
  uniform float u_time;
  uniform vec2  u_resolution;
  uniform vec2  u_mouse;

  // Passed from vertex shader — not used for the main UV (we use gl_FragCoord instead),
  // but kept for the vignette calculation which benefits from the interpolated mesh UV.
  varying vec2 vUv;

  void main() {

    // --- Block 1: Normalize UV from pixel coordinates ---
    // gl_FragCoord.xy is in pixel space (0 → canvas width/height).
    // Dividing by resolution gives 0→1 range, same across all screen sizes.
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // --- Block 2: Center UV around the origin ---
    // Shift 0→1 range to -0.5→0.5 so the wave pattern is symmetric
    // around the screen center rather than the corner.
    uv -= 0.5;

    // --- Block 3: Aspect-ratio correction ---
    // Multiply the x axis by width/height so the pattern stays circular
    // on wide screens instead of stretching horizontally.
    uv.x *= u_resolution.x / u_resolution.y;

    // --- Block 4: Normalized mouse position ---
    // u_mouse arrives as 0→1. Re-center to -0.5→0.5.
    // Scale the influence to 0.15 — decorative lean, not aggressive tracking.
    vec2 mouse = (u_mouse - 0.5) * 0.15;

    // --- Block 5: Apply gentle mouse influence ---
    // Shift the wave origin slightly toward the pointer.
    uv += mouse;

    // --- Block 6: Flow layer A — slow diagonal wave ---
    // A large-scale sine/cosine pair driven by both UV axes and time.
    // Coefficient 0.4 on time keeps the animation calm (not frantic).
    float waveA = sin(uv.x * 2.8 + u_time * 0.4) * cos(uv.y * 2.1 + u_time * 0.3);

    // --- Block 7: Flow layer B — perpendicular ripple ---
    // Rotated 90° relative to layer A, creating a crossing interference pattern
    // that looks like overlapping aurora bands.
    float waveB = sin(uv.y * 3.2 + u_time * 0.25) * cos(uv.x * 2.5 - u_time * 0.35);

    // --- Block 8: Flow layer C — diagonal accent ---
    // Uses the sum (uv.x + uv.y) to produce a diagonal stripe that breaks
    // the symmetry of layers A and B, adding organic variety.
    float waveC = sin((uv.x + uv.y) * 2.0 + u_time * 0.2);

    // --- Block 9: Combine layers into one flow value ---
    // Average the three waves; result is in the -1→1 range.
    float flow = (waveA + waveB + waveC) / 3.0;

    // --- Block 10: Remap to 0→1 for color mixing ---
    float t = flow * 0.5 + 0.5;

    // --- Block 11: Blue/violet/cyan palette ---
    // Three anchor colors matching the portfolio's accent palette.
    vec3 colBlue   = vec3(0.196, 0.388, 1.0);   // approx #3262ff — deep blue
    vec3 colViolet = vec3(0.545, 0.361, 0.965);  // approx #8b5cf6 — violet
    vec3 colCyan   = vec3(0.024, 0.714, 0.831);  // approx #06b6d4 — cyan
    // In the first half of t blend blue→violet; in the second half violet→cyan.
    vec3 color = t < 0.5
      ? mix(colBlue, colViolet, t * 2.0)
      : mix(colViolet, colCyan, (t - 0.5) * 2.0);

    // --- Block 12: Subtle deterministic grain ---
    // fract(sin(dot(...)) * large_number) produces a stable pseudo-random value
    // per fragment that does NOT change with time, so there is no per-frame flicker.
    // 3% opacity is enough to break the overly-synthetic gradient look.
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(127.1, 311.7))) * 43758.5453);
    color = mix(color, vec3(grain), 0.03);

    // --- Block 13: Vignette for text readability ---
    // Darken toward the hero edges using vUv (0→1 from mesh UV).
    // The headline and CTA sit near center-top, which stays brightest.
    float dist = length(vUv - 0.5);
    float vignette = 1.0 - smoothstep(0.3, 0.85, dist * 1.5);
    color *= vignette;

    // --- Block 14: Base darkness ---
    // Multiply the final color down so the hero feels like a dark-mode
    // background rather than a bright light source.
    color *= 0.55;

    gl_FragColor = vec4(color, 1.0);
  }
`;
