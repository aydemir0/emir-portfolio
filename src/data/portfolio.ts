// portfolio.ts — backward-compatibility barrel.
// Canonical data now lives in the split files:
//   src/data/profile.ts
//   src/data/experience.ts
//   src/data/projects.ts
//   src/data/community.ts
export { profile as portfolioData } from "./profile";