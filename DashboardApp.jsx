import React, { useState, useMemo, useCallback } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- MOCK CLIENT DATA ---
const CLIENT_DATA = {
    vanflow: {
        id: 'vanflow',
        name: 'VanFlowCo Conduit',
        status: 'Phase Shift Active',
        frequency: '528 Hz',
        metrics: {
            nu: { label: 'Visceral Current (Sales Budget)', value: '$125,000', desc: 'Market intent quantified. The Origin (o) of architecture.', icon: 'fas fa-bolt', color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10' },
            p: { label: 'Purpose (Purchases)', value: '$45,000', desc: 'Resources mathematically required to sustain growth.', icon: 'fas fa-bullseye', color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/10' },
            phi: { label: 'Phase Shift (Friction)', value: '14.2%', desc: 'Operational costs. Variance minimized via performance reports.', icon: 'fas fa-wave-square', color: 'text-rose-400', border: 'border-rose-500/30', bg: 'bg-rose-500/10' },
            a: { label: 'Area of Impact (Net Income)', value: '$80,000', desc: 'Final integration over time (dt). Result scales to infinity.', icon: 'fas fa-infinity', color: 'text-visceral-gold', border: 'border-yellow-500/30', bg: 'bg-yellow-500/10' }
        },
        varianceScore: 92,
        recentLogs: [
            { date: '04.01.2026', log: 'Libra Full Moon Alignment: Area of Impact weighed.' },
            { date: '03.28.2026', log: 'Schedule 2 (Purchases) audited against Schedule 1.' },
            { date: '03.15.2026', log: 'Phase Shift (ϕ) initiated. Friction reduced by 4%.' }
        ],
        chartData: [
            { period: 'Phase 1', impact: 20000 },
            { period: 'Phase 2', impact: 35000 },
            { period: 'Phase 3', impact: 42000 },
            { period: 'Phase 4', impact: 60000 },
            { period: 'Phase 5', impact: 75000 },
            { period: 'Current', impact: 80000 }
        ]
    },
    scarlett: {
        id: 'scarlett',
        name: 'ScarlettSky Productions',
        status: 'Equilibrium Achieved',
        frequency: '432 Hz',
        metrics: {
            nu: { label: 'Visceral Current (Sales Budget)', value: '$210,000', desc: 'Market intent quantified. The Origin (o) of architecture.', icon: 'fas fa-bolt', color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10' },
            p: { label: 'Purpose (Purchases)', value: '$65,000', desc: 'Resources mathematically required to sustain growth.', icon: 'fas fa-bullseye', color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/10' },
            phi: { label: 'Phase Shift (Friction)', value: '8.5%', desc: 'Operational costs. Variance minimized via performance reports.', icon: 'fas fa-wave-square', color: 'text-rose-400', border: 'border-rose-500/30', bg: 'bg-rose-500/10' },
            a: { label: 'Area of Impact (Net Income)', value: '$145,000', desc: 'Final integration over time (dt). Result scales to infinity.', icon: 'fas fa-infinity', color: 'text-visceral-gold', border: 'border-yellow-500/30', bg: 'bg-yellow-500/10' }
        },
        varianceScore: 98,
        recentLogs: [
            { date: '04.02.2026', log: 'Area of Impact (A) confirmed infinite.' },
            { date: '03.20.2026', log: 'Cinematic visual legacy rendered and deployed.' }
        ],
        chartData: [
            { period: 'Phase 1', impact: 40000 },
            { period: 'Phase 2', impact: 65000 },
            { period: 'Phase 3', impact: 80000 },
            { period: 'Phase 4', impact: 110000 },
            { period: 'Phase 5', impact: 130000 },
            { period: 'Current', impact: 145000 }
        ]
    }
};

// --- COMPONENTS ---
// Advanced Memoization: Prevent unnecessary re-renders of heavy UI elements
const MetricCard = React.memo(({ data }) => (
    <div className={`relative p-6 rounded-2xl border ${data.border} bg-[#0a0c10]/80 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden group`}>
        <div className={`absolute top-0 left-0 w-1 h-full ${data.bg.replace('/10', '')}`}></div>
        <div className="flex justify-between items-start mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${data.bg} ${data.color}`}>
                <i className={`${data.icon} text-lg`}></i>
            </div>
        </div>
        <h3 className="text-3xl font-bold text-white mb-1 tracking-tight">{data.value}</h3>
        <p className="text-xs font-mono tracking-widest uppercase text-slate-500 mb-3">{data.label}</p>
        <p className="text-sm text-slate-400 leading-relaxed font-light">{data.desc}</p>
    </div>
));

export default function DashboardApp() {
    const [activeProject, setActiveProject] = useState('vanflow');
    
    // Computation Caching: Only recalculate the active project data when the ID changes
    const project = useMemo(() => CLIENT_DATA[activeProject], [activeProject]);

    // Identity Stability: Stable callback for button interactions
    const handleProjectChange = useCallback((id) => {
        setActiveProject(id);
    }, []);

    return (
        <div className="flex h-full w-full relative">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-emerald-900/10 blur-[120px] rounded-full mix-blend-screen"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#00e5ff]/5 blur-[120px] rounded-full mix-blend-screen"></div>
            </div>

            {/* Sidebar */}
            <aside className="w-72 bg-[#05070a]/90 backdrop-blur-xl border-r border-white/5 flex flex-col z-10 relative">
                <div className="p-8 border-b border-white/5">
                    <div className="flex items-center gap-3 cursor-pointer group mb-2" onClick={() => window.location.href='index.html'}>
                        <div className="w-2 h-2 bg-[#00e5ff] rounded-full group-hover:scale-150 transition duration-500 shadow-[0_0_10px_#00e5ff]"></div>
                        <span className="font-serif text-xl tracking-widest text-white">VISCERAL</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Client Matrix</p>
                </div>

                <div className="p-6 flex-1">
                    <h2 className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-4">Active Coordinates</h2>
                    <div className="space-y-2">
                        {Object.values(CLIENT_DATA).map(p => (
                            <button 
                                key={p.id} onClick={() => handleProjectChange(p.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${activeProject === p.id ? 'bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30 shadow-[inset_0_0_15px_rgba(0,229,255,0.05)]' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
                            >
                                <i className={`fas fa-circle-notch mr-3 text-[10px] ${activeProject === p.id ? 'animate-spin' : 'opacity-50'}`}></i>
                                {p.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6 border-t border-white/5 bg-black/20">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-400"><i className="fas fa-user"></i></div>
                        <div>
                            <p className="text-sm font-bold text-white">Scarlett Delaine</p>
                            <p className="text-[10px] text-[#00e5ff] font-mono tracking-widest uppercase">Sovereign Access</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto z-10 relative scroll-smooth">
                <header className="px-10 py-12 border-b border-white/5 bg-gradient-to-b from-[#0a0f16] to-transparent">
                    <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase tracking-widest mb-4">
                                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>{project.status}
                            </div>
                            <h1 className="text-4xl font-serif text-white tracking-wide mb-2">{project.name}</h1>
                            <p className="text-slate-400 font-light">Operating Frequency: <span className="text-[#00e5ff] font-mono">{project.frequency}</span></p>
                        </div>
                        <div className="flex items-center gap-4 bg-[#0a0c10]/80 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur">
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-1 text-right">Alignment Score</p>
                                <p className="text-2xl font-bold text-white text-right">{project.varianceScore}<span className="text-slate-500 text-lg">/100</span></p>
                            </div>
                            <div className="relative w-12 h-12 flex items-center justify-center">
                                <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                    <path strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                                    <path strokeDasharray={`${project.varianceScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#00e5ff" strokeWidth="3" className="drop-shadow-[0_0_5px_rgba(0,229,255,0.8)]" />
                                </svg>
                                <i className="fas fa-check text-[#00e5ff] text-xs"></i>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="px-10 py-10 max-w-5xl mx-auto space-y-10">
                    <div className="bg-[#05070a]/50 border border-white/5 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 justify-between">
                        <div>
                            <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mb-1">Active Calculation</p>
                            <p className="text-lg text-slate-300 font-serif italic">The Infinite Sum ($S$)</p>
                        </div>
                        <div className="text-[#00e5ff] font-mono text-xl tracking-widest opacity-80">S = lim(t→∞) ∑ (P·C) / ϕⁿ</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MetricCard data={project.metrics.nu} />
                        <MetricCard data={project.metrics.p} />
                        <MetricCard data={project.metrics.phi} />
                        <MetricCard data={project.metrics.a} />
                    </div>

                    <div className="bg-[#0a0c10]/80 border border-white/5 rounded-2xl p-8 backdrop-blur">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Infinite Sum Progression</h3>
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={project.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={activeProject === 'vanflow' ? '#34d399' : '#00e5ff'} stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor={activeProject === 'vanflow' ? '#34d399' : '#00e5ff'} stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="period" stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
                                    <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#05070a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                        itemStyle={{ color: activeProject === 'vanflow' ? '#34d399' : '#00e5ff', fontWeight: 'bold' }}
                                        labelStyle={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}
                                        formatter={(value) => [`$${value.toLocaleString()}`, 'Area of Impact']}
                                    />
                                    <Area type="monotone" dataKey="impact" stroke={activeProject === 'vanflow' ? '#34d399' : '#00e5ff'} strokeWidth={2} fillOpacity={1} fill="url(#colorImpact)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-[#0a0c10]/80 border border-white/5 rounded-2xl p-8 backdrop-blur">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Calibration Log</h3>
                        <div className="space-y-4">
                            {project.recentLogs.map((log, i) => (
                                <div key={i} className="flex gap-4 items-start group">
                                    <div className="text-[10px] text-slate-500 font-mono mt-1 w-24 shrink-0 group-hover:text-[#00e5ff] transition-colors">{log.date}</div>
                                    <div className="text-sm text-slate-300 font-light leading-relaxed border-l border-white/10 pl-4 group-hover:border-[#00e5ff]/50 transition-colors">{log.log}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}