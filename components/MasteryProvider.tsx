'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';

export interface DomainMastery {
  spirit: boolean;
  understanding: number;
  integration: boolean;
}

const defaultDomains: Record<string, DomainMastery> = {
  physical: { spirit: true, understanding: 0.78, integration: false },
  intellectual: { spirit: true, understanding: 0.82, integration: false },
  emotional: { spirit: true, understanding: 0.76, integration: false },
  relational: { spirit: true, understanding: 0.91, integration: false },
  financial: { spirit: true, understanding: 0.69, integration: false },
  professional: { spirit: true, understanding: 0.88, integration: false },
  creative: { spirit: true, understanding: 0.85, integration: false },
  spiritual: { spirit: true, understanding: 0.94, integration: false },
  sovereign: { spirit: true, understanding: 0.79, integration: false },
};

type MasteryState = Record<string, DomainMastery>;

interface MasteryContextValue {
  state: MasteryState;
  totalityStatus: string;
  updateDomain: (key: string, update: Partial<DomainMastery>) => void;
}

const MasteryContext = createContext<MasteryContextValue | undefined>(undefined);

const calculateMastery = (spirit: boolean, understanding: number, integration: boolean) => {
  if (spirit && understanding >= 0.99 && integration) {
    return 'Master Builder';
  }
  return 'Seeker';
};

const computeTotality = (state: MasteryState) => {
  const full = Object.values(state).every((domain) => domain.spirit && domain.understanding >= 0.99 && domain.integration);
  return full ? 'Master Builder' : 'Infinite Spirit';
};

export function MasteryProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<MasteryState>(defaultDomains);

  const updateDomain = (key: string, update: Partial<DomainMastery>) => {
    setState((prev: MasteryState) => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...update,
      },
    }));
  };

  const totalityStatus = useMemo(() => computeTotality(state), [state]);

  return (
    <MasteryContext.Provider value={{ state, totalityStatus, updateDomain }}>
      {children}
    </MasteryContext.Provider>
  );
}

export function useMastery() {
  const context = useContext(MasteryContext);
  if (!context) {
    throw new Error('useMastery must be used within MasteryProvider');
  }
  return context;
}

export function domainMasteryLabel(domain: DomainMastery) {
  return calculateMastery(domain.spirit, domain.understanding, domain.integration);
}
