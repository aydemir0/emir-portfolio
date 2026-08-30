export interface ThreeCapabilityResult {
  reducedMotion: boolean;
  lowPower: boolean;
  shouldRender3D: boolean;
}

export function getThreeCapabilities(): ThreeCapabilityResult {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return { reducedMotion: false, lowPower: false, shouldRender3D: true };
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  let hardwareConcurrency: number | undefined;
  let deviceMemory: number | undefined;
  
  if (typeof navigator !== 'undefined') {
    hardwareConcurrency = (navigator as unknown as { hardwareConcurrency?: number }).hardwareConcurrency;
    deviceMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
  }

  const lowPower = 
    (hardwareConcurrency !== undefined && hardwareConcurrency <= 4) ||
    (deviceMemory !== undefined && deviceMemory <= 4);

  return {
    reducedMotion,
    lowPower,
    shouldRender3D: !reducedMotion && !lowPower,
  };
}