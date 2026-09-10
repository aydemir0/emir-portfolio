"use client";

import Image from "next/image";
import Link from "next/link";
import { CopyEmailButton } from "../components/CopyEmailButton";
import ContactForm from "../components/ContactForm";
import { Navbar } from "../components/Navbar";
import { ShaderHeroBackground } from "../components/shader/ShaderHeroBackground";
import { community } from "../data/community";
import { experience } from "../data/experience";
import { profile } from "../data/profile";
import styles from "./page.module.css";

const hitCapabilities = [
  "Streaming AI Chat",
  "Structured Analysis",
  "Tool-driven Workflows",
  "Prompt-injection Defense",
  "Resilience & Checkpointing",
  "Prioritizer Agent",
  "Deterministic Fallback",
  "Behavioral Evaluation",
];

const arsenal = [
  { label: "Languages", skills: profile.skills.languages, proof: "Master of the Sands / full-stack systems", tone: "cobalt" },
  { label: "Web / Full Stack", skills: profile.skills.web, proof: "Hit.AI / Ada Tarım", tone: "green" },
  { label: "AI Engineering", skills: profile.skills.ai, proof: "Hit.AI / Codex Engineering Kit", tone: "cobalt" },
  { label: "Mobile", skills: profile.skills.mobile, proof: "Campus Social", tone: "cyan" },
  { label: "3D / Interaction", skills: ["React Three Fiber", "Three.js", "WebGL"], proof: "Emir’s Galaxy", tone: "violet" },
  { label: "Testing / Delivery", skills: profile.skills.testing, proof: "Codex Engineering Kit / Hit.AI", tone: "cobalt" },
  { label: "Systems / Hardware", skills: profile.skills.hardware, proof: "SBA / Kinetic Energy", tone: "amber" },
];

const communityMarks: Record<string, string> = {
  AIESEC: "AIE",
  "English Club": "EN",
  "Erasmus Club": "ER",
  "Animal Husbandry Community": "AHC",
};

const identityNodes = [
  { key: "ai", label: "AI Systems", proof: "Hit.AI · Codex Engineering Kit", description: "Typed products and inspectable AI workflows", href: "#hit-ai" },
  { key: "delivery", label: "Web / Product Delivery", proof: "Nef Ajans · Ada Tarım · Ditravo", description: "From brief to production surface", href: "#work" },
  { key: "mobile", label: "Mobile", proof: "Campus Social", description: "Student-first product experiences", href: "#work" },
  { key: "hardware", label: "Systems / Hardware", proof: "SBA Mühendislik", description: "Control, diagnostics, and embedded work", href: "#work" },
  { key: "creative", label: "Creative Engineering", proof: "Emir’s Galaxy · Master of Sands", description: "Interactive worlds with authored feeling", href: "#work" },
  { key: "community", label: "Community Leadership", proof: "AIESEC · English · Erasmus · AHC", description: "Communication that brings people together", href: "#beyond" },
] as const;

function ActionLink({ href, children, primary = false }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const external = href.startsWith("http");

  return (
    <a
      className={`${styles.action} ${primary ? styles.actionPrimary : ""}`}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function Home() {
  return (
    <div className={styles.shell}>
      <Navbar />

      <main data-testid="main-content-wrapper">
        <section id="hero" className={styles.hero}>
          <div className={styles.shader} aria-hidden="true"><ShaderHeroBackground /></div>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.ghostName} aria-hidden="true">
            <span>MUHAMMED</span><span>EMIR</span><span>AYDIN</span>
          </div>

          <div className={styles.heroPortrait}>
            <Image
              src="/emir-portrait-2026.jpg"
              alt="Portrait of Muhammed Emir Aydın"
              fill
              priority
              sizes="(max-width: 767px) 80vw, 46vw"
            />
          </div>

          <div className={styles.heroInner}>
            <div className={styles.heroIdentity}>
              <p className={styles.eyebrow}>AI / FULL-STACK / INTERACTIVE SYSTEMS</p>
              <h1 className={styles.heroName}>
                <span>MUHAMMED</span>{" "}<span>EMIR</span>{" "}<span>AYDIN</span>
                <span className="sr-only">Muhammed Emir Aydin</span>
              </h1>
              <p className={styles.heroStatement}>
                I design, build, and ship systems that work beyond the demo.
              </p>
              <p className={styles.heroSecondary}>
                AI, full-stack products, mobile software, and interactive systems.
              </p>

              <div className={styles.heroActions}>
                <ActionLink href="#work" primary>VIEW WORK</ActionLink>
                <ActionLink href={profile.socials.github}>GITHUB</ActionLink>
                <ActionLink href={profile.socials.cv}>RESUME</ActionLink>
                <ActionLink href="#contact">CONTACT</ActionLink>
              </div>
            </div>

            <p className={styles.heroIndex}>
              4TH YEAR COMPUTER ENGINEERING · KÜTAHYA / TÜRKİYE · OPEN TO INTERNATIONAL OPPORTUNITIES
            </p>
          </div>
        </section>

        <section id="identity-map" className={`${styles.section} ${styles.identitySection}`}>
          <div className={styles.sectionInner}>
            <div className={styles.identityHeading}>
              <p className={styles.eyebrow}>00 / MEA IDENTITY MAP</p>
              <h2>SIX SIGNALS.<br />ONE SYSTEM.</h2>
              <p>A proof-backed map of the systems, products, and people-centered work that shape how I build.</p>
            </div>

            <div className={styles.identityMap} aria-label="MEA engineering identity map">
              <svg className={styles.identityLines} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path className={`${styles.identityLine} ${styles.identityLineAi}`} d="M50 11 C50 20 48 32 50 42" />
                <path className={`${styles.identityLine} ${styles.identityLineDelivery}`} d="M84 25 C76 28 66 34 58 43" />
                <path className={`${styles.identityLine} ${styles.identityLineMobile}`} d="M84 75 C76 72 66 66 58 57" />
                <path className={`${styles.identityLine} ${styles.identityLineHardware}`} d="M50 89 C50 80 50 70 50 61" />
                <path className={`${styles.identityLine} ${styles.identityLineCreative}`} d="M16 75 C24 72 34 66 42 57" />
                <path className={`${styles.identityLine} ${styles.identityLineCommunity}`} d="M16 25 C24 28 34 34 42 43" />
                <circle className={styles.identityPulse} r="0.8"><animateMotion dur="4.5s" repeatCount="indefinite" path="M50 11 C50 20 48 32 50 42" /></circle>
                <circle className={styles.identityPulse} r="0.8"><animateMotion dur="5.2s" begin="-.7s" repeatCount="indefinite" path="M84 25 C76 28 66 34 58 43" /></circle>
                <circle className={styles.identityPulse} r="0.8"><animateMotion dur="4.8s" begin="-1.4s" repeatCount="indefinite" path="M84 75 C76 72 66 66 58 57" /></circle>
                <circle className={styles.identityPulse} r="0.8"><animateMotion dur="5.5s" begin="-2s" repeatCount="indefinite" path="M50 89 C50 80 50 70 50 61" /></circle>
                <circle className={styles.identityPulse} r="0.8"><animateMotion dur="5s" begin="-2.7s" repeatCount="indefinite" path="M16 75 C24 72 34 66 42 57" /></circle>
                <circle className={styles.identityPulse} r="0.8"><animateMotion dur="4.9s" begin="-3.3s" repeatCount="indefinite" path="M16 25 C24 28 34 34 42 43" /></circle>
              </svg>
              <div className={styles.identityCenter}><span>MEA</span><small>MUHAMMED EMİR</small><small className={styles.identityCenterSub}>ENGINEERING IDENTITY</small></div>
              {identityNodes.map((node) => (
                <a className={`${styles.identityNode} ${styles[`identityNode${node.key[0].toUpperCase()}${node.key.slice(1)}`]}`} href={node.href} key={node.key}>
                  <span className={styles.identityNodeIndex}>{node.key === "ai" ? "01" : node.key === "delivery" ? "02" : node.key === "mobile" ? "03" : node.key === "hardware" ? "04" : node.key === "creative" ? "05" : "06"}</span>
                  <strong>{node.label}</strong>
                  <small>{node.proof}</small>
                  <span className={styles.identityProof}>PROOF → {node.proof}</span>
                  <em>{node.description}</em>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="hit-ai" className={`${styles.section} ${styles.hitSection}`}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>01 / FLAGSHIP PROJECT</p>
              <h2>APPLIED AI<br />ENGINEERING</h2>
              <p>
                Engineering Evidence over claims: a resilient AI career product built around typed outputs, observable failures, and useful decisions.
              </p>
            </div>

            <article className={styles.hitShowcase} data-testid="project-hit-ai">
              <div className={styles.hitCopy}>
                <div className={styles.statusLine}><span>HIT.AI</span><span>Active Development</span></div>
                <h3>Career intelligence that explains its work.</h3>
                <p>
                  Streaming analysis, tool-driven workflows, validation, failure handling, and evidence-based Apply / Maybe / Skip decisions.
                </p>
                <ul className={styles.capabilityList}>
                  {hitCapabilities.map((capability) => <li key={capability}>{capability}</li>)}
                </ul>
                <div className={styles.inlineActions}>
                  <ActionLink href="/projects/hit-ai" primary>HIT.AI CASE STUDY</ActionLink>
                  <ActionLink href="https://github.com/aydemir0/Hit-the-Target---Hit.AI">GITHUB</ActionLink>
                </div>
              </div>

              <div className={styles.hitVisual}>
                <div className={styles.browserBar} aria-hidden="true">
                  <span /><span /><span /><p>hit-ai.vercel.app / prioritize</p>
                </div>
                <iframe
                  className={styles.productFrame}
                  src="https://hit-ai.vercel.app/prioritize"
                  title="Live preview of the Hit.AI prioritizer"
                  loading="lazy"
                  tabIndex={-1}
                />
                <div className={styles.frameScrim} aria-hidden="true" />
                <p className={styles.liveLabel}>LIVE PRODUCT SURFACE</p>
              </div>

              <div className={styles.architecture} aria-label="Hit.AI architecture">
                {["USER INPUT", "SERVER ACTION", "AI SDK + GROQ", "TYPED TOOLS", "VALIDATION", "GENERATIVE UI"].map((node, index) => (
                  <div className={styles.architectureNode} key={node}>
                    <span>{String(index + 1).padStart(2, "0")}</span><strong>{node}</strong>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="work" className={`${styles.section} ${styles.workSection}`}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>02 / SELECTED WORK</p>
              <h2>ONE ENGINEER.<br />DIFFERENT WORLDS.</h2>
              <p>Projects only. Each one keeps the visual language of the product it was built to become.</p>
            </div>

            <article className={styles.codexProject} data-testid="project-codex-engineering-kit">
              <div className={styles.codexCopy}>
                <div className={styles.codexStatus}><span>OPEN SOURCE / AI ENGINEERING TOOLING</span><strong>v0.1 PREVIEW</strong></div>
                <h3>CODEX<br />ENGINEERING KIT</h3>
                <p>A public toolkit for inspectable planning, architecture, verification, evals, and release readiness.</p>
                <div className={styles.codexMeta}><span>WINDOWS / POWERSHELL-FIRST</span><span>INDEPENDENT COMMUNITY PROJECT</span></div>
                <div className={styles.inlineActions}>
                  <ActionLink href="https://github.com/aydemir0/codex-engineering-kit" primary>GITHUB REPOSITORY</ActionLink>
                </div>
                <p className={styles.codexDisclaimer}>INDEPENDENT · NOT AN OFFICIAL OPENAI PROJECT</p>
              </div>

              <div className={styles.codexVisual} aria-label="Codex Engineering Kit workflow architecture">
                <div className={styles.codexTerminalBar}><span /><span /><span /><p>codex-engineering-kit / workflow</p></div>
                <div className={styles.codexFlow}>
                  <div><span>01</span><strong>ENGINEERING TASK</strong></div><i>→</i>
                  <div><span>02</span><strong>ORCHESTRATOR</strong></div><i>→</i>
                  <div><span>03</span><strong>FOCUSED ROLE</strong></div><i>→</i>
                  <div><span>04</span><strong>IMPLEMENTATION</strong></div><i>→</i>
                  <div><span>05</span><strong>VERIFICATION LOOP</strong><small>READY / NOT READY / PARTIAL</small></div>
                </div>
                <div className={styles.codexGate}><span>READINESS GATE</span><strong>EXECUTABLE EVIDENCE BEFORE RELEASE</strong></div>
                <div className={styles.codexLearning}><span>SECONDARY PATH</span><strong>IMPLEMENTATION → LEARNING CANDIDATE → HUMAN REVIEW → TRUSTED GUIDANCE</strong></div>
                <div className={styles.codexProofGrid}>
                  {["ORCHESTRATOR", "CONTINUOUS LEARNING", "EVAL HARNESS", "VERIFICATION LOOP", "SOFTWARE ARCHITECTURE", "CONCURRENCY / PERFORMANCE"].map((skill, index) => <span key={skill}><b>{String(index + 1).padStart(2, "0")}</b>{skill}</span>)}
                </div>
              </div>
            </article>

            <article className={`${styles.project} ${styles.sandsProject}`}>
              <div className={styles.gameVisual}>
                <iframe
                  className={styles.productFrame}
                  src="https://kumlarin-hakimi-frontend.vercel.app"
                  title="Live preview of Master of the Sands"
                  loading="lazy"
                  tabIndex={-1}
                />
                <div className={styles.gameVeil} aria-hidden="true" />
                <p className={styles.liveLabel}>LIVE GAME OPENING</p>
              </div>
              <div className={styles.projectCopy}>
                <p className={styles.projectNumber}>02.2 / CINEMATIC GAME SYSTEM</p>
                <h3>MASTER OF<br />THE SANDS</h3>
                <p>
                  A cinematic desert decision game with branching consequences and an authored soundscape.
                </p>
                <div className={styles.stackLine}>UNITY / C# / ELEVENLABS</div>
                <div className={styles.inlineActions}>
                  <ActionLink href="https://kumlarin-hakimi-frontend.vercel.app" primary>LIVE DEMO</ActionLink>
                  <span className={styles.privateBadge}>PRIVATE REPOSITORY</span>
                </div>
              </div>
            </article>

            <article className={`${styles.project} ${styles.campusProject}`}>
              <div className={styles.projectCopy}>
                <p className={styles.projectNumber}>02.3 / MOBILE PRODUCT</p>
                <h3>CAMPUS SOCIAL<br />&amp; YOUTH NETWORK</h3>
                <p>A campus social app for events, community feeds, and student connection.</p>
                <div className={styles.stackLine}>FLUTTER / FIREBASE</div>
                <span className={styles.privateBadge}>PRIVATE REPOSITORY</span>
              </div>

              <div className={styles.phoneStage} aria-label="Campus Social mobile product presentation">
                <div className={`${styles.phone} ${styles.phoneBack}`}>
                  <div className={styles.phoneTop}>09:41</div>
                  <p className={styles.phoneKicker}>CAMPUS / EVENTS</p>
                  <strong>Meet your campus.</strong>
                  <div className={styles.phoneEvent}><span>THIS WEEK</span><b>Design &amp; Tech Meetup</b></div>
                  <div className={styles.phoneEvent}><span>COMMUNITY</span><b>Student Network</b></div>
                </div>
                <div className={`${styles.phone} ${styles.phoneFront}`}>
                  <div className={styles.phoneTop}>09:41</div>
                  <p className={styles.phoneKicker}>GENÇ AĞ</p>
                  <strong>What is happening?</strong>
                  <div className={styles.socialPost}><span /><p>Campus life, organized around the people living it.</p></div>
                  <div className={styles.socialPost}><span /><p>Discover events and join the conversation.</p></div>
                </div>
              </div>
            </article>

            <article className={`${styles.project} ${styles.adaProject}`}>
              <div className={styles.adaField} aria-hidden="true">
                <span>STRATEGY</span><span>DESIGN</span><span>BUILD</span><span>DELIVER</span>
              </div>
              <div className={styles.projectCopy}>
                <p className={styles.projectNumber}>02.4 / REAL CLIENT DELIVERY</p>
                <h3>ADA TARIM</h3>
                <p>
                  A production website delivered through Nef Ajans, covering architecture, implementation, SEO, and deployment.
                </p>
                <div className={styles.deliveryStamp}><span>DELIVERED VIA</span><strong>NEF AJANS</strong></div>
                <ActionLink href="https://adatarim.com" primary>LIVE WEBSITE</ActionLink>
              </div>
            </article>

            <article className={`${styles.project} ${styles.galaxyProject}`} data-testid="project-emirs-galaxy">
              <div
                className={styles.galaxyBackdrop}
                style={{ backgroundImage: "url(https://emirin-galaksisi.vercel.app/textures/uzay_arkaplan.jpg)" }}
                aria-hidden="true"
              />
              <div className={styles.orbitSystem} aria-hidden="true">
                <span className={styles.orbitOne} /><span className={styles.orbitTwo} />
                <span className={styles.planetOne} /><span className={styles.planetTwo} /><span className={styles.sun} />
              </div>
              <div className={styles.projectCopy}>
                <p className={styles.projectNumber}>02.5 / SPATIAL WEB EXPERIENCE</p>
                <h3>EMIR’S<br />GALAXY</h3>
                <p>An interactive 3D portfolio with spatial navigation, capability detection, and WebGL fallbacks.</p>
                <div className={styles.stackLine}>REACT THREE FIBER / THREE.JS / WEBGL</div>
                <span className={styles.experimentalBadge}>Experimental</span>
                <div className={styles.inlineActions}>
                  <ActionLink href="/projects/emirs-galaxy" primary>VIEW CASE STUDY</ActionLink>
                  <ActionLink href="https://github.com/aydemir0/emirin-galaksisi">GITHUB</ActionLink>
                  <ActionLink href="https://emirin-galaksisi.vercel.app">LIVE DEMO</ActionLink>
                </div>
              </div>
            </article>

            <div className={styles.additionalHeading}>
              <p className={styles.eyebrow}>ADDITIONAL ENGINEERING WORK</p><span>03 — 04</span>
            </div>

            <div className={styles.additionalGrid}>
              <article className={styles.blueprintProject}>
                <div className={styles.blueprintVisual} aria-hidden="true">
                  <span className={styles.blueprintRing} /><span className={styles.blueprintCore}>KINETIC</span>
                  <span className={styles.blueprintLine} /><span className={styles.blueprintNode}>ENERGY → SIGNAL → CONTROL</span>
                </div>
                <div>
                  <p className={styles.projectNumber}>03 / HARDWARE SYSTEM</p>
                  <h3>Kinetic Energy Conversion System</h3>
                  <p>Sensor integration, power management, and embedded control.</p>
                  <div className={styles.stackLine}>ARDUINO / C++ / IOT</div>
                </div>
              </article>

              <article className={styles.archiveProject}>
                <p className={styles.projectNumber}>04 / ENGINEERING ARCHIVE</p>
                <span className={styles.archiveMark}>UCM / 01</span>
                <h3>University Club Management System</h3>
                <p>Member tracking, event scheduling, and a relational database layer for campus administration.</p>
                <div className={styles.stackLine}>C# / .NET / SQL SERVER</div>
              </article>
            </div>
          </div>
        </section>

        <section id="experience" className={`${styles.section} ${styles.journeySection}`}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>03 / PROFESSIONAL EXPERIENCE</p>
              <h2>THE JOURNEY</h2>
              <p>Where I worked, what I owned, and the proof that travelled with me.</p>
            </div>

            <div className={styles.journey}>
              <svg className={styles.journeyPath} viewBox="0 0 1000 1800" preserveAspectRatio="none" aria-hidden="true">
                <path d="M500 0 C180 180 180 360 500 530 S820 880 500 1060 S180 1400 500 1580 L500 1800" />
                <path className={styles.journeyPulse} d="M500 0 C180 180 180 360 500 530 S820 880 500 1060 S180 1400 500 1580 L500 1800" />
              </svg>

              {experience.map((item, index) => (
                <article className={`${styles.milestone} ${index % 2 === 0 ? styles.milestoneLeft : styles.milestoneRight}`} key={item.company}>
                  <span className={styles.milestoneNode} aria-hidden="true" />
                  <p className={styles.milestoneIndex}>{String(index + 1).padStart(2, "0")}</p>
                  <h3>{item.company}</h3>
                  <p className={styles.milestoneRole}>{item.role} · {item.date}</p>
                  <p className={styles.milestoneLabel}>WHAT I DID</p>
                  <p>{item.points.join(" · ")}</p>
                  {item.company === "Nef Ajans" && <a className={styles.proofLink} href="#work">PROOF → ADA TARIM</a>}
                  {item.company === "FlyRank" && (
                    <p className={styles.verifiedNote}>Completed capstone project — AI Fluency certification awarded</p>
                  )}
                </article>
              ))}

              <div className={styles.futureNode}>
                <span>?</span><p>NEXT NODE</p><h3>NEW ADVENTURE WANTED</h3>
                <a href="#contact">THE JOURNEY CONTINUES ↓</a>
              </div>
            </div>
          </div>
        </section>

        <section id="skills-map" className={`${styles.section} ${styles.arsenalSection}`}>
          <div id="skills" className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>04 / CAPABILITY × PROOF</p>
              <h2>TECHNICAL<br />ARSENAL</h2>
              <p>Tools matter when they connect to shipped work. Follow each lane to the project where the capability became real.</p>
            </div>

            <div className={styles.arsenal}>
              {arsenal.map((group, index) => (
                <article className={styles.arsenalLane} data-tone={group.tone} key={group.label}>
                  <span className={styles.arsenalIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{group.label}</h3>
                  <div className={styles.skillsFlow}>{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
                  <p className={styles.arsenalProof}>PROOF → {group.proof}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="beyond" className={`${styles.section} ${styles.communitySection}`}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>05 / COMMUNITY &amp; LEADERSHIP</p>
              <h2>BEYOND<br />THE CODE</h2>
              <p>Leadership through communication, organization, and shared momentum.</p>
            </div>

            <div className={styles.communityStrip} aria-label="Community organizations">
              {community.map((item) => (
                <div className={styles.communityMark} key={item.organization}>
                  <span aria-hidden="true">{communityMarks[item.organization]}</span>
                  <p>{item.organization}</p>
                </div>
              ))}
            </div>

            <div className={styles.communityWords} aria-hidden="true">
              <span>COMMUNICATE</span><span>ORGANIZE</span><span>BUILD</span><span>ENGAGE</span>
            </div>

            <div className={styles.communityRail}>
              {community.map((item, index) => (
                <article key={item.organization}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div className={styles.communityIdentity}><h3>{item.organization}</h3><p>{item.role}</p></div>
                  <p className={styles.communityImpact}>{item.description}</p><small>PAST ROLE / IMPACT</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className={`${styles.section} ${styles.aboutSection}`}>
          <div className={styles.sectionInner}>
            <div className={styles.aboutGrid}>
              <div className={styles.aboutLead}>
                <p className={styles.eyebrow}>06 / ABOUT</p><h2>BUILT TO<br />CROSS<br />BOUNDARIES.</h2>
                <p className={styles.aboutSideNote}>COMPUTER ENGINEERING · KÜTAHYA / TÜRKİYE</p>
              </div>
              <figure className={styles.aboutPortrait}>
                <Image
                  src="/emir-portrait-2026.jpg"
                  alt="Muhammed Emir Aydın"
                  fill
                  sizes="(max-width: 800px) 78vw, 28vw"
                />
                <figcaption><span>04 / PROFILE</span><strong>ENGINEERING ACROSS BOUNDARIES</strong></figcaption>
              </figure>
              <div className={styles.aboutCopy}>
                <p>4th-year Computer Engineering student at Kütahya Dumlupınar University and founder of Nef Ajans.</p>
                <p>
                  I move between AI product engineering, full-stack web, Flutter mobile, interactive 3D, and hardware systems—turning creative ideas into reliable, shipped work with international ambition.
                </p>
                <div className={styles.aboutMeta}>
                  <span>AI + FULL STACK</span><span>MOBILE + SYSTEMS</span><span>CREATIVE ENGINEERING</span>
                </div>
                <div className={styles.aboutFacts}>
                  <p><span>YEAR</span><strong>04</strong></p>
                  <p><span>FOCUS</span><strong>END-TO-END</strong></p>
                  <p><span>FOUNDER</span><strong>NEF AJANS</strong></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className={`${styles.section} ${styles.contactSection}`}>
          <div className={styles.sectionInner}>
            <div className={styles.contactGrid}>
              <div className={styles.contactLead}>
                <p className={styles.eyebrow}>07 / CONTACT</p><h2>LET’S BUILD<br />WHAT’S NEXT.</h2>
                <p>Open to software engineering internships, junior engineering roles, and international opportunities.</p>
                <a className={styles.emailLink} href={`mailto:${profile.socials.email}`}>{profile.socials.email}</a>
                <div className={styles.contactActions}>
                  <ActionLink href={`mailto:${profile.socials.email}`} primary>EMAIL ME</ActionLink>
                  <CopyEmailButton email={profile.socials.email} />
                  <ActionLink href={profile.socials.github}>GITHUB</ActionLink>
                  <ActionLink href={profile.socials.linkedin}>LINKEDIN</ActionLink>
                  <ActionLink href={profile.socials.cv}>RESUME</ActionLink>
                  <ActionLink href={profile.socials.calendar}>SCHEDULE A CALL</ActionLink>
                </div>
              </div>
              <div className={styles.contactForm}><p className={styles.formLabel}>OR SEND A NOTE</p><ContactForm /></div>
            </div>
          </div>
        </section>
      </main>

      <div className={styles.mobileActionStrip} data-testid="mobile-action-strip">
        <a href={profile.socials.cv}>CV</a><a href={profile.socials.github}>GitHub</a><a href="#contact">Contact</a>
      </div>

      <footer className={styles.footer}>
        <strong>Muhammed Emir Aydın</strong>
        <nav aria-label="Footer navigation">
          <a href={profile.socials.github}>GitHub</a><a href={profile.socials.linkedin}>LinkedIn</a>
          <a href={profile.socials.cv}>Resume</a><a href={`mailto:${profile.socials.email}`}>Email</a>
          <Link href="/3d">Interactive Lab / 3D</Link>
        </nav>
      </footer>
    </div>
  );
}
