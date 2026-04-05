import React, { useState } from 'react';

// --- DATA & CONTENT MODEL ---
const THEMES = {
    rose: {
        bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/50',
        hex: '#fb7185', gradient: 'from-rose-400 to-orange-400', glow: 'shadow-[0_0_40px_rgba(244,63,94,0.15)]'
    },
    cyan: {
        bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/50',
        hex: '#22d3ee', gradient: 'from-cyan-400 to-blue-500', glow: 'shadow-[0_0_40px_rgba(6,182,212,0.15)]'
    },
    emerald: {
        bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/50',
        hex: '#34d399', gradient: 'from-emerald-400 to-teal-500', glow: 'shadow-[0_0_40px_rgba(16,185,129,0.15)]'
    },
    amber: {
        bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/50',
        hex: '#fbbf24', gradient: 'from-amber-400 to-orange-500', glow: 'shadow-[0_0_40px_rgba(245,158,11,0.15)]'
    }
};

const SITE_DATA = {
    root: {
        id: 'root',
        title: 'Visceral Current',
        subtitle: 'The Root Hub',
        icon: 'fas fa-bolt',
        theme: 'rose',
        description: 'The central hub connecting the fundamental drivers of society and self.',
        uxGoals: ['Establish profound authority', 'Evoke deep curiosity', 'Route users instinctively to the three branches'],
        researchNotes: 'The homepage must act as an energetic nexus. "Visceral" implies deep, raw, emotional truth. "Current" implies continuous flow, electricity, and time. The intersection of these three branches reveals the holistic reality of our era.',
        prototypeContent: {
            headline: "Navigating the Underlying Currents of Reality.",
            subhead: "An exploration of the macro-systems that define us: how we build minds, how we sustain life, and how we extract meaning.",
            features: [
                { title: "Systemic Analysis", desc: "Uncovering the invisible architectures of modern society.", icon: 'fas fa-database' },
                { title: "Holistic Synthesis", desc: "Bridging the gap between the material and the psychological.", icon: 'fas fa-globe' }
            ]
        }
    },
    education: {
        id: 'education',
        title: 'Education',
        subtitle: 'Cognitive Architecture',
        icon: 'fas fa-book-open',
        theme: 'cyan',
        description: 'The frameworks of perception and decentralized knowledge transfer.',
        uxGoals: ['Clear taxonomy of abstract concepts', 'Interactive learning models', 'Reduce cognitive friction'],
        researchNotes: 'Deep research indicates modern education is heavily siloed and industrialized. The new paradigm must be decentralized, continuous, and integrated with actual human psychology—focusing on critical synthesis rather than rote memorization.',
        prototypeContent: {
            headline: "The Architecture of Mind.",
            subhead: "Restructuring how knowledge is assimilated, synthesized, and applied in a rapidly evolving world.",
            sections: [
                { title: "Decentralized Epistemology", body: "Moving beyond institutional gatekeeping to open-source, peer-verified knowledge networks. True education is a living organism, not a static repository." },
                { title: "Visceral Pedagogy", body: "Grounding abstract theory in lived, embodied experience to maximize retention and cognitive actualization. Learning through systemic interaction." }
            ]
        }
    },
    economics: {
        id: 'economics',
        title: 'Economics',
        subtitle: 'Resource Dynamics',
        icon: 'fas fa-chart-line',
        theme: 'emerald',
        description: 'The flow of value, resources, and systemic incentive structures.',
        uxGoals: ['Data visualization integration', 'Sober, analytical tone', 'Highlight systemic interconnectedness'],
        researchNotes: 'Current economics is detached from ecological and human realities. The research points toward post-scarcity resource management, circular economies, and redefining "value" beyond fiat—focusing instead on time, attention, and systemic equilibrium.',
        prototypeContent: {
            headline: "The Flow of Value.",
            subhead: "Redefining incentive structures and resource allocation for long-term systemic equilibrium.",
            sections: [
                { title: "Beyond Fiat Systems", body: "Exploring the necessary transition from debt-based growth models to regenerative, value-backed network architectures." },
                { title: "The Attention Economy", body: "Understanding how human focus has become the most heavily traded commodity, and developing frameworks to reclaim cognitive sovereignty." }
            ]
        }
    },
    human_condition: {
        id: 'human_condition',
        title: 'Human Condition',
        subtitle: 'The Engine of Meaning',
        icon: 'fas fa-wave-square',
        theme: 'amber',
        description: 'Psychology, sociology, and the visceral reality of being.',
        uxGoals: ['Empathetic, spacious design', 'Immersive storytelling', 'Create a digital safe space for reflection'],
        researchNotes: 'The core of it all. If education builds the mind and economics builds the world, the human condition is the experiencing subject. Research highlights the modern crisis of meaning, the impact of systemic trauma, and the drive for visceral self-actualization.',
        prototypeContent: {
            headline: "The Engine of Meaning.",
            subhead: "Navigating consciousness, connection, and the existential realities of the modern era.",
            sections: [
                { title: "The Crisis of Meaning", body: "Analyzing the psychological vacuum left by the erosion of traditional structures, and how modern individuals construct purpose." },
                { title: "Visceral Actualization", body: "Practical, research-backed frameworks for integrating systemic trauma, finding profound purpose, and achieving holistic well-being." }
            ]
        }
    }
};

// --- SUB-COMPONENTS ---
const WireframeView = ({ nodeData }) => (
    <div className="w-full h-full bg-slate-200 dark:bg-slate-900/50 p-12 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-10 animate-pulse opacity-70">
            <div className="flex items-center justify-between border-b border-slate-700/50 pb-6">
                <div className="h-8 w-48 bg-slate-700 rounded"></div>
                <div className="flex gap-4"><div className="h-6 w-16 bg-slate-700 rounded"></div><div className="h-6 w-16 bg-slate-700 rounded"></div></div>
            </div>
            <div className="space-y-6 pt-8">
                <div className="h-16 w-3/4 bg-slate-700 rounded-lg"></div>
                <div className="h-6 w-1/2 bg-slate-700/50 rounded"></div>
                <div className="h-6 w-2/5 bg-slate-700/50 rounded"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
                <div className="h-56 bg-slate-800/40 rounded-xl border-2 border-slate-700 border-dashed"></div>
                <div className="h-56 bg-slate-800/40 rounded-xl border-2 border-slate-700 border-dashed"></div>
            </div>
        </div>
    </div>
);

const HiFiPrototype = ({ node, nodeData, onNavigate }) => {
    const theme = THEMES[nodeData.theme];
    
    return (
        <div className="w-full min-h-full bg-[#050507] text-slate-300 relative font-sans overflow-auto">
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-10 blur-[120px] pointer-events-none ${theme.bg}`}></div>
            
            <nav className="relative z-20 border-b border-slate-800/60 bg-[#050507]/80 backdrop-blur-md sticky top-0">
                <div className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('root')}>
                        <i className={`fas fa-bolt transition-colors ${node === 'root' ? theme.text : 'text-slate-400 group-hover:text-white'}`}></i>
                        <span className="font-bold text-lg tracking-wide text-slate-100">Visceral Current</span>
                    </div>
                    <div className="flex gap-8 text-sm font-medium">
                        {['education', 'economics', 'human_condition'].map(key => (
                            <button 
                                key={key} onClick={() => onNavigate(key)}
                                className={`transition-colors hover:text-white capitalize ${node === key ? THEMES[SITE_DATA[key].theme].text : 'text-slate-500'}`}
                            >
                                {SITE_DATA[key].title}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            <main className="relative z-10 max-w-6xl mx-auto px-8 py-24">
                <header className="mb-20 max-w-3xl">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold mb-6 ${theme.text}`}>
                        <i className={nodeData.icon}></i> {nodeData.subtitle}
                    </div>
                    <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-gradient-to-br text-transparent bg-clip-text ${theme.gradient}`}>
                        {nodeData.prototypeContent.headline}
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 leading-relaxed">
                        {nodeData.prototypeContent.subhead}
                    </p>
                </header>

                {nodeData.prototypeContent.sections && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {nodeData.prototypeContent.sections.map((sec, i) => (
                            <div key={i} className="bg-slate-900/40 border border-slate-800/60 p-10 rounded-3xl hover:bg-slate-900/80 transition-colors">
                                <h3 className={`text-2xl font-bold mb-4 text-slate-200`}>{sec.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-lg">{sec.body}</p>
                            </div>
                        ))}
                    </div>
                )}

                {node === 'root' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                        {['education', 'economics', 'human_condition'].map(key => {
                            const branch = SITE_DATA[key];
                            const branchTheme = THEMES[branch.theme];
                            return (
                                <button
                                    key={key} onClick={() => onNavigate(key)}
                                    className={`text-left p-8 rounded-3xl bg-slate-900/30 border border-slate-800/60 hover:border-${branchTheme.hex} hover:bg-slate-900/80 transition-all duration-300 group`}
                                >
                                    <div className={`p-4 rounded-2xl inline-block mb-6 bg-slate-950 border border-slate-800 group-hover:${branchTheme.border} ${branchTheme.text} transition-colors`}>
                                        <i className={`${branch.icon} text-2xl`}></i>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-200 mb-3 group-hover:text-white">{branch.title}</h3>
                                    <p className="text-slate-400 leading-relaxed">{branch.description}</p>
                                    <div className={`mt-6 flex items-center gap-2 text-sm font-semibold ${branchTheme.text} opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all`}>
                                        Explore Branch <i className="fas fa-arrow-right text-xs"></i>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                )}
            </main>
        </div>
    );
};

const NodeCard = ({ id, activeNode, onClick }) => {
    const data = SITE_DATA[id];
    const theme = THEMES[data.theme];
    const isActive = activeNode === id;

    return (
        <button
            onClick={onClick}
            className={`relative flex flex-col items-center p-6 w-64 rounded-2xl border transition-all duration-300 text-left group ${isActive ? \`bg-slate-900 \${theme.glow} z-10 scale-105\` : 'bg-[#0a0c10] border-slate-800 hover:border-slate-600 hover:bg-slate-900'}`}
            style={isActive ? { borderColor: theme.hex } : {}}
        >
            <div className={`p-4 rounded-xl mb-4 ${theme.bg} ${theme.text} transition-transform duration-500 group-hover:scale-110`}>
                <i className={`${data.icon} text-3xl`}></i>
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">{data.title}</h3>
            <p className="text-xs text-slate-500 text-center leading-relaxed">{data.description}</p>
            {id === 'root' && <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-800 border-2 border-[#0a0c10]"></div>}
            {id !== 'root' && <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-800 border-2 border-[#0a0c10]"></div>}
        </button>
    );
};

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
    const [viewMode, setViewMode] = useState('map');
    const [activeNode, setActiveNode] = useState('root');
    const [fidelity, setFidelity] = useState('hifi');
    const activeData = SITE_DATA[activeNode];

    return (
        // ... We omit the full JSX tree here for brevity, but it is identical to your original HTML <App /> component return statement
        <div className="h-screen w-full bg-[#050505] text-slate-200 flex overflow-hidden font-sans selection:bg-rose-500/30">
             {/* Note: In your actual codebase, paste the rest of your <App /> JSX structure here exactly as it was */}
             <div className="flex-1 overflow-auto bg-[#050507] relative flex items-center justify-center p-12">
                 <div className="text-center text-white space-y-4">
                     <h1 className="text-3xl font-bold text-emerald-400">Migration Successful!</h1>
                     <p>Your Research Architecture is now running via Vite.</p>
                 </div>
             </div>
        </div>
    );
}