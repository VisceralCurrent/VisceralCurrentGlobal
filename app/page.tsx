 'use client';
import { MasteryProvider, useMastery } from '../components/MasteryProvider';
import { DomainCard } from '../components/DomainCard';
import { VisceralMap } from '../components/VisceralMap';

const domains = [
  { key: 'physical', label: 'Physical', cluster: 'Foundation', focus: 'Essence of the body, environment, and presence.' },
  { key: 'intellectual', label: 'Intellectual', cluster: 'Foundation', focus: 'Clarity, systems thinking, and pattern awareness.' },
  { key: 'emotional', label: 'Emotional', cluster: 'Foundation', focus: 'Feeling, resilience, and inner attunement.' },
  { key: 'relational', label: 'Relational', cluster: 'Expansion', focus: 'Connection, communication, and social resonance.' },
  { key: 'financial', label: 'Financial', cluster: 'Expansion', focus: 'Value creation, stewardship, and exchange.' },
  { key: 'professional', label: 'Professional', cluster: 'Expansion', focus: 'Contribution, mastery, and purpose in work.' },
  { key: 'creative', label: 'Creative', cluster: 'Sovereignty', focus: 'Imagination, expression, and innovation.' },
  { key: 'spiritual', label: 'Spiritual', cluster: 'Sovereignty', focus: 'Meaning, presence, and connection to the infinite.' },
  { key: 'sovereign', label: 'Sovereign', cluster: 'Sovereignty', focus: 'Autonomy, leadership, and aligned authority.' },
];

function HomePageContent() {
  const { state, totalityStatus } = useMastery();

  return (
    <main>
      <section>
        <p style={{ opacity: 0.75, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Visceral Current Multidimensional University</p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: 1.02, marginTop: '0.6rem' }}>
          A living ecosystem for infinite spirit and balanced mastery.
        </h1>
        <p style={{ maxWidth: '720px', marginTop: '1rem', color: 'rgba(229, 231, 235, 0.85)' }}>
          The website is organized as a 3x3 matrix of domains where essence, application, and integration converge. Each domain tracks the state of your visceral journey, while the Mastery 360 matrix monitors totality and unlocks the Master Builder layer.
        </p>
      </section>

      <section className="mastery-banner">
        <div className="mastery-pill">Totality: {totalityStatus}</div>
        <p style={{ marginTop: '1rem', color: 'rgba(229, 231, 235, 0.88)' }}>
          Mastery 360 does not separate the student into levels. It begins with Infinite Spirit and coalesces essence, understanding, and integration across all domains.
        </p>
      </section>

      <section className="grid-9" style={{ marginTop: '2rem' }}>
        {domains.map((domain) => (
          <DomainCard key={domain.key} domain={domain} state={state[domain.key]} />
        ))}
      </section>

      <section className="map-card">
        <h2>Non-linear Navigation Map</h2>
        <p style={{ marginTop: '0.75rem', color: 'rgba(229, 231, 235, 0.78)' }}>
          This constellation reflects the 9-node circuit of experience and the flow between the Spheres Alpha, Beta, and Gamma.
        </p>
        <VisceralMap domains={domains} state={state} />
      </section>
    </main>
  );
}

export default function HomePage() {
  return (
    <MasteryProvider>
      <HomePageContent />
    </MasteryProvider>
  );
}
