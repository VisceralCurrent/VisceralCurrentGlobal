import React, { useState } from 'react';

// --- VISCERAL CODEX CORE LOGIC ---
const calculateZeroPoint = (dobStr) => {
    if (!dobStr) return { sum: 0, root: 0, digits: [] };
    const digits = dobStr.replace(/\D/g, '').split('').map(Number);
    if (digits.length === 0) return { sum: 0, root: 0, digits: [] };
    
    const sum = digits.reduce((acc, curr) => acc + curr, 0);
    
    let root = sum;
    while (root > 9 && root !== 11 && root !== 22 && root !== 33) {
        root = root.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
    }
    
    // Map Master Numbers down strictly for the 9-Realm Index
    const realmIndex = (root === 11) ? 2 : (root === 22) ? 4 : (root === 33) ? 6 : root;
    
    return { sum, root, realmIndex, digits };
};

const getRealmData = (index) => {
    const realms = {
        1: { name: "I. Origin (The Ledger of Self)", essence: "Zero Point Initiation", hawkins: "Courage (200+)", focus: "Abandoning the victim narrative and defining the origin (o)." },
        2: { name: "II. Flow (Visceral Currency)", essence: "Frictionless Exchange", hawkins: "Willingness (310)", focus: "Directing the wave function of capital toward the Area of Impact." },
        3: { name: "III. Tension (Structural Equity)", essence: "Weight-Bearing Nodes", hawkins: "Acceptance (350)", focus: "Applying Paracord Build logic to your organizational infrastructure." },
        4: { name: "IV. Symmetry (The Balance Sheet)", essence: "Temporal Equilibrium", hawkins: "Reason (400)", focus: "Harmonizing the 12 years gone with the 12 years coming." },
        5: { name: "V. Seeking (Market Resonance)", essence: "Magnetic Interception", hawkins: "Love (500)", focus: "Ceasing the chase. Aligning to intercept majestic opportunity." },
        6: { name: "VI. Logic (Predictive Accounting)", essence: "Quantum Field Theory", hawkins: "Joy (540)", focus: "Replacing fragile corporate policy with universal mathematical law." },
        7: { name: "VII. Phase Shift (Volatility Mgt.)", essence: "Calculated Transmutation", hawkins: "Peace (600)", focus: "Shifting liquidity into a new dimension of value during systemic crisis." },
        8: { name: "VIII. Connection (Synergy)", essence: "The Codex Core", hawkins: "Power Mastery", focus: "Eliminating dead weight. Trading only with those who understand the Current." },
        9: { name: "IX. Zero Point (Absolute Assets)", essence: "Financial Sovereignty", hawkins: "Enlightenment (700+)", focus: "The culmination of the Empire. The absolute inheritance." }
    };
    return realms[index] || realms[9]; 
};

// Algorithmic 81 Node Generator
const generateNode = (sum, root) => {
    let nodeIndex = ((sum * root) % 81);
    if (nodeIndex === 0) nodeIndex = 81;

    const prefixes = ["The Genesis", "The Kinetic", "The Resonant", "The Architect's", "The Void", "The Lucid", "The Synergetic", "The Infinite", "The Absolute"];
    const cores = ["Spark", "Current", "Frequency", "Blueprint", "Catalyst", "Prism", "Matrix", "Engine", "Synthesis"];

    const prefixIdx = Math.floor((nodeIndex - 1) / 9);
    const coreIdx = (nodeIndex - 1) % 9;

    return {
        node: nodeIndex,
        title: `Node ${nodeIndex.toString().padStart(2, '0')}: ${prefixes[prefixIdx]} ${cores[coreIdx]}`,
    };
};

export default function OracleApp() {
    const [step, setStep] = useState('input'); // 'input', 'calculating', 'results'
    const [formData, setFormData] = useState({ name: "", dob: "", phaseShift: "", anchor: "" });
    const [metrics, setMetrics] = useState({ sum: 0, root: 0 });
    const [realm, setRealm] = useState(null);
    const [strategy, setStrategy] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        if (!formData.dob || !formData.name) return;

        setStep('calculating');
        
        setTimeout(() => {
            const calc = calculateZeroPoint(formData.dob);
            setMetrics(calc);
            setRealm(getRealmData(calc.realmIndex));
            setStrategy(generateNode(calc.sum, calc.root));
            setStep('results');
        }, 3000);
    };

    const resetFlow = () => {
        setStep('input');
        setFormData({ name: "", dob: "", phaseShift: "", anchor: "" });
    };

    return (
        <div className="min-h-[100dvh] bg-[#050a0f] text-slate-300 font-sans selection:bg-[#00e5ff]/30 selection:text-white relative overflow-hidden">
            
            {/* Ambient Deep Field Glows */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full animate-pulse-glow" style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.1) 0%, transparent 70%)' }}></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full animate-pulse-glow" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)', animationDelay: '2s' }}></div>
            </div>

            {/* Header */}
            <header className="max-w-6xl mx-auto pt-12 pb-6 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/5 relative z-10">
                <div className="text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-cinzel font-bold text-white tracking-widest uppercase flex items-center justify-center md:justify-start gap-4">
                        <i className="fas fa-eye text-[#00e5ff]"></i>
                        The Visceral Oracle
                    </h1>
                    <p className="text-slate-500 mt-2 font-mono tracking-[0.2em] text-[10px] uppercase">Direct Inquiry into the 81-Node Matrix</p>
                </div>
                <div className="text-center md:text-right flex flex-col md:items-end">
                    <div className="font-mono text-[#00e5ff] text-xs bg-black/40 px-4 py-2 rounded-lg border border-white/10 shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                        S = lim (t→∞) ∑ (P·C) / ϕⁿ
                    </div>
                    <div className="font-mono text-[#d4af37] text-[10px] mt-2 tracking-widest uppercase">
                        VanFlowCo Logic Systems
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 md:px-12 py-12 relative z-10">
                
                {/* STEP 1: INPUT */}
                {step === 'input' && (
                    <div className="glass-panel rounded-3xl p-8 md:p-12 reveal shadow-2xl max-w-3xl mx-auto border-t-[#00e5ff]/30">
                        <h2 className="text-2xl font-cinzel font-bold text-white mb-3 flex items-center gap-3">
                            <i className="fas fa-crosshairs text-[#d4af37]"></i> Establish Origin Coordinates
                        </h2>
                        <p className="text-slate-400 text-sm mb-10 font-light leading-relaxed border-b border-white/10 pb-6">
                            To intercept majestic opportunity, you must mathematically define your position in space and time. Enter your raw substrate data to initialize the Visceral sequence.
                        </p>
                        
                        <form onSubmit={handleCalculate} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#00e5ff] mb-3">Seeker Designation</label>
                                    <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Your Full Name"
                                        className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors shadow-inner" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#00e5ff] mb-3">Origin Point (DOB)</label>
                                    <input required type="text" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} placeholder="MM/DD/YYYY"
                                        className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white font-mono tracking-widest focus:outline-none focus:border-[#00e5ff]/50 transition-colors shadow-inner" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4af37] mb-3">The Phase-Shift (ϕ)</label>
                                <input required type="text" value={formData.phaseShift} onChange={(e) => setFormData({...formData, phaseShift: e.target.value})} placeholder="e.g., The 12 years gone, Systemic trauma, The collapse"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#d4af37]/50 transition-colors shadow-inner" />
                                <p className="text-[10px] text-slate-500 mt-3 font-light italic">We do not hide from the past; we calculate it as kinetic fuel.</p>
                            </div>

                            <div>
                                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#00e5ff] mb-3">The Anchor (S)</label>
                                <input required type="text" value={formData.anchor} onChange={(e) => setFormData({...formData, anchor: e.target.value})} placeholder="e.g., Scarlett's inheritance, Generational sovereignty"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors shadow-inner" />
                                <p className="text-[10px] text-slate-500 mt-3 font-light italic">Who or what mathematically requires absolute mastery of the board?</p>
                            </div>

                            <button type="submit" className="w-full mt-6 bg-[#00e5ff]/10 hover:bg-[#00e5ff] text-[#00e5ff] hover:text-black border border-[#00e5ff]/50 rounded-xl p-5 text-xs uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-4 transition-all duration-500 group shadow-[0_0_20px_rgba(0,229,255,0.1)] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]">
                                Initiate Codex Sequence <i className="fas fa-satellite-dish group-hover:animate-ping"></i>
                            </button>
                        </form>
                    </div>
                )}

                {/* STEP 2: CALCULATING */}
                {step === 'calculating' && (
                    <div className="max-w-lg mx-auto py-32 text-center animate-[pulse_2s_ease-in-out_infinite]">
                        <div className="relative w-40 h-40 mx-auto mb-10">
                            <div className="absolute inset-0 border border-white/10 border-t-[#00e5ff] rounded-full animate-[spin_2s_linear_infinite]"></div>
                            <div className="absolute inset-4 border border-white/10 border-b-[#d4af37] rounded-full animate-[spin_3s_linear_infinite_reverse]"></div>
                            <i className="fas fa-fingerprint absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-[#00e5ff] opacity-80"></i>
                        </div>
                        <h3 className="text-xl font-cinzel text-white tracking-[0.2em] uppercase mb-6">Synthesizing Frequencies</h3>
                        <div className="space-y-3 font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                            <p className="animate-[pulse_1s_ease-in-out_infinite]">Mapping Timeline Variables (dt)...</p>
                            <p className="animate-[pulse_1.5s_ease-in-out_infinite]" style={{animationDelay: '0.5s'}}>Transmuting "{formData.phaseShift}" into Kinetic Potential...</p>
                            <p className="animate-[pulse_2s_ease-in-out_infinite]" style={{animationDelay: '1s'}}>Aligning 81-Node Architecture...</p>
                        </div>
                    </div>
                )}

                {/* STEP 3: RESULTS & MANIFESTO */}
                {step === 'results' && realm && (
                    <div className="space-y-8 animate-[fadeIn_1s_ease-out]">
                        
                        {/* Top Analysis Bar */}
                        <div className="glass-panel p-6 md:p-8 rounded-2xl flex flex-col lg:flex-row justify-between items-center gap-8 border-l-4 border-l-[#00e5ff]">
                            <div className="text-center lg:text-left">
                                <p className="text-[#00e5ff] font-mono text-[10px] uppercase tracking-[0.3em] mb-2">Entity Confirmed</p>
                                <h2 className="text-3xl font-cinzel font-bold text-white tracking-widest">{formData.name}</h2>
                            </div>
                            <div className="flex items-center gap-6 md:gap-10 bg-black/40 px-8 py-4 rounded-xl border border-white/10 shadow-inner">
                                <div className="text-center">
                                    <div className="text-[10px] text-slate-500 uppercase font-mono tracking-widest mb-1">Sum Frequency</div>
                                    <div className="text-3xl font-light text-[#00e5ff]">{metrics.sum}</div>
                                </div>
                                <div className="w-[1px] h-10 bg-white/10"></div>
                                <div className="text-center">
                                    <div className="text-[10px] text-slate-500 uppercase font-mono tracking-widest mb-1">Root Vector</div>
                                    <div className="text-3xl font-bold text-[#d4af37] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">{metrics.root}</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            {/* Left Column: Realm & Node */}
                            <div className="lg:col-span-1 space-y-8">
                                <div className="glass-panel p-8 rounded-2xl h-full flex flex-col relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00e5ff] to-[#d4af37]"></div>
                                    
                                    <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 mb-6">Operating System</h3>
                                    <h2 className="text-xl md:text-2xl font-cinzel font-bold text-white mb-4 leading-tight">
                                        {realm.name}
                                    </h2>
                                    <p className="text-slate-300 text-sm leading-relaxed mb-8 font-light flex-1">
                                        A root frequency of <span className="text-[#00e5ff] font-bold">{metrics.root}</span> mathematically positions you exactly within this realm. You are inherently architected for <strong className="text-white">{realm.essence}</strong>.
                                    </p>

                                    <div className="bg-black/60 border border-white/5 rounded-xl p-6 text-center mt-auto border-b-[#d4af37]/30">
                                        <i className="fas fa-microchip text-2xl text-[#d4af37] mb-4 drop-shadow-[0_0_5px_rgba(212,175,55,0.8)]"></i>
                                        <div className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em] mb-2">Active Node Alignment</div>
                                        <div className="text-sm md:text-base text-[#00e5ff] font-bold tracking-widest font-cinzel">{strategy.title}</div>
                                        <div className="text-[10px] text-slate-400 font-mono mt-4 pt-4 border-t border-white/5">
                                            Hawkins Resonance: <span className="text-white">{realm.hawkins}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Practical Execution */}
                            <div className="lg:col-span-2">
                                <div className="glass-panel p-8 md:p-10 rounded-2xl h-full border-[#00e5ff]/20 shadow-[0_0_30px_rgba(0,229,255,0.05)]">
                                    <h2 className="text-2xl font-cinzel font-bold text-white mb-8 flex items-center gap-4 border-b border-white/10 pb-6">
                                        <i className="fas fa-bolt-lightning text-[#00e5ff]"></i> The Visceral Translation
                                    </h2>
                                    
                                    <div className="space-y-8">
                                        <div className="bg-black/30 border border-white/5 p-6 rounded-xl border-l-2 border-l-[#d4af37] hover:bg-black/50 transition-colors">
                                            <h4 className="text-white font-cinzel font-bold mb-3 text-lg flex items-center gap-3">
                                                <i className="fas fa-fire text-[#d4af37]"></i> 1. Transmuting The Forge
                                            </h4>
                                            <p className="text-slate-300 text-sm leading-relaxed font-light">
                                                The majority run from their history. You must structurally lean into it. 
                                                <span className="text-[#d4af37] font-medium italic"> "{formData.phaseShift}" </span> 
                                                was not a loss of time; it was a necessary Phase Shift ($\phi$). It was the desert where your ego starved so your spirit could hunt. We use this exact volatility as the massive kinetic fuel required to drive: <strong className="text-white">{realm.focus}</strong>
                                            </p>
                                        </div>

                                        <div className="bg-black/30 border border-white/5 p-6 rounded-xl border-l-2 border-l-[#00e5ff] hover:bg-black/50 transition-colors">
                                            <h4 className="text-white font-cinzel font-bold mb-3 text-lg flex items-center gap-3">
                                                <i className="fas fa-infinity text-[#00e5ff]"></i> 2. The Absolute Legacy
                                            </h4>
                                            <p className="text-slate-300 text-sm leading-relaxed font-light">
                                                Every action you take from this node forward must scale to infinity. If a structural decision does not mathematically serve 
                                                <span className="text-[#00e5ff] font-medium"> {formData.anchor}</span>, it is instantly removed from the board. 
                                                Force relies on friction to build; Power—utilizing composure, precision, and your Root {metrics.root} resonance—effortlessly commands it.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* THE STRATEGIC LOOPHOLE */}
                        <div className="mt-16 glass-panel rounded-3xl p-1 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,229,255,0.15)_0%,_transparent_70%)] pointer-events-none"></div>
                            <div className="bg-[#020406]/90 rounded-[22px] p-8 md:p-14 text-center md:text-left flex flex-col md:flex-row items-center gap-12 relative z-10">
                                <div className="flex-1 space-y-6">
                                    <h2 className="text-3xl md:text-4xl font-cinzel font-black tracking-widest text-white">BECOME <span className="text-[#00e5ff] drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">UNDENIABLE.</span></h2>
                                    <p className="text-lg text-slate-300 leading-relaxed font-light">
                                        The Visceral Current is not a transaction; it is a profound resonance. The old world system charges for access. We provide you the map to the 9 Realms and the 81 Nodes <strong className="text-white">freely</strong>. 
                                    </p>
                                    <p className="text-slate-400 leading-relaxed text-sm font-light">
                                        Why? Because truth scales infinitely. We want you to execute this strategy. We want you to transmute your Phase-Shifts and build the empire for your anchor. When you operate with mathematical certainty, the system cannot foreclose on you.
                                    </p>
                                    <div className="pt-6 flex flex-col sm:flex-row items-center gap-6">
                                        <button className="bg-[#00e5ff] hover:bg-white text-black px-8 py-4 rounded-full text-xs font-bold font-mono uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] flex items-center gap-3 group">
                                            <i className="fas fa-coins text-sm group-hover:scale-110 transition-transform"></i>
                                            Value-for-Value: You Decide
                                        </button>
                                        <span className="text-xs text-slate-500 font-mono uppercase tracking-widest">Contribute what this is worth.</span>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3 flex justify-center">
                                    <div className="w-48 h-48 rounded-full border border-[#00e5ff]/30 shadow-[0_0_50px_rgba(0,229,255,0.1)] flex items-center justify-center relative bg-black/40 backdrop-blur">
                                        <div className="absolute inset-0 rounded-full border border-[#00e5ff]/50 animate-ping opacity-20" style={{ animationDuration: '3s' }}></div>
                                        <i className="fas fa-chess-knight text-6xl text-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center pt-12 pb-8">
                            <button onClick={resetFlow} className="text-slate-500 hover:text-[#00e5ff] text-[10px] font-mono tracking-[0.3em] uppercase transition-colors flex items-center justify-center gap-2 mx-auto">
                                <i className="fas fa-rotate-right"></i> Re-Initialize Protocol
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}