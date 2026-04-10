'use client';

import { motion } from 'framer-motion';
import { DomainMastery } from './MasteryProvider';

interface VisceralMapProps {
  domains: Array<{ key: string; label: string; cluster: string }>;
  state: Record<string, DomainMastery>;
}

const clusters = {
  Foundation: ['Physical', 'Intellectual', 'Emotional'],
  Expansion: ['Relational', 'Financial', 'Professional'],
  Sovereignty: ['Creative', 'Spiritual', 'Sovereign'],
};

export function VisceralMap({ domains, state }: VisceralMapProps) {
  return (
    <div className="map-grid">
      {domains.map((domain) => {
        const mastery = state[domain.key];
        return (
          <motion.div
            key={domain.key}
            className="map-node"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.25 }}
          >
            <strong>{domain.label}</strong>
            <span>{domain.cluster}</span>
            <span>{mastery.understanding >= 0.9 ? 'Flow engaged' : 'Flow emerging'}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
