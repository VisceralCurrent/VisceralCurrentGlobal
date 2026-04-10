'use client';

import { motion } from 'framer-motion';
import { DomainMastery, domainMasteryLabel } from './MasteryProvider';

interface DomainCardProps {
  domain: {
    key: string;
    label: string;
    cluster: string;
    focus: string;
  };
  state: DomainMastery;
}

export function DomainCard({ domain, state }: DomainCardProps) {
  return (
    <motion.article
      className="domain-card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <h3>{domain.label}</h3>
      <p>{domain.focus}</p>
      <div className="tag">
        <span>{domain.cluster}</span>
        <span>{state.spirit ? 'Spirit active' : 'Spirit dormant'}</span>
        <span>Understanding {(state.understanding * 100).toFixed(0)}%</span>
      </div>
      <div className="tag" style={{ marginTop: '1rem' }}>
        <span>{domainMasteryLabel(state)}</span>
      </div>
    </motion.article>
  );
}
