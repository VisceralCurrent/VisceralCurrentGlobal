import { useMemo } from 'react';
import { DomainMastery } from '../components/MasteryProvider';

export interface VisceralFlowState {
  currentDomain: string;
  lastUpdated: number;
  trajectory: string[];
  impact: number;
}

export function useVisceralFlow(domains: Record<string, DomainMastery>) {
  return useMemo<VisceralFlowState>(() => {
    const keys = Object.keys(domains);
    const currentDomain = keys[Math.floor(Math.random() * keys.length)];
    const lastUpdated = Date.now();
    const trajectory = keys.slice(0, 3);
    const impact = keys.reduce((sum, key) => sum + domains[key].understanding, 0) / keys.length;

    return {
      currentDomain,
      lastUpdated,
      trajectory,
      impact,
    };
  }, [domains]);
}
