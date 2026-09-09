export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  uniform float u_time;
  uniform vec2  u_resolution;
  uniform vec2  u_mouse;
  varying vec2 vUv;

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv -= 0.5;
    uv.x *= u_resolution.x / u_resolution.y;
    vec2 mouse = (u_mouse - 0.5) * 0.15;
    uv += mouse;
    float waveA = sin(uv.x * 2.8 + u_time * 0.3) * cos(uv.y * 2.1 + u_time * 0.2);
    float waveB = sin(uv.y * 3.2 + u_time * 0.2) * cos(uv.x * 2.5 - u_time * 0.25);
    float waveC = sin((uv.x + uv.y) * 2.0 + u_time * 0.15);
    float flow = (waveA + waveB + waveC) / 3.0;
    float t = flow * 0.5 + 0.5;
    
    vec3 colGraphite = vec3(0.02, 0.03, 0.04);
    vec3 colSteel    = vec3(0.06, 0.08, 0.12);
    vec3 colCobalt   = vec3(0.1, 0.3, 0.9);
    
    vec3 color = t < 0.6
      ? mix(colGraphite, colSteel, t * 1.6)
      : mix(colSteel, colCobalt, (t - 0.6) * 2.5);
      
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(127.1, 311.7))) * 43758.5453);
    color = mix(color, vec3(grain), 0.06);
    
    float dist = length(vUv - 0.5);
    float vignette = 1.0 - smoothstep(0.15, 0.95, dist * 1.3);
    color *= vignette;
    
    // Add grid effect
    vec2 gridUv = vUv * 20.0;
    float grid = max(step(0.95, fract(gridUv.x)), step(0.95, fract(gridUv.y)));
    color = mix(color, colCobalt * 0.5, grid * 0.1 * vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`;
