import React, { useState } from "react";
import { lineStandards, dtpTerms } from "../data";
import { PenTool, Layers, Eye, RefreshCw, Sparkles, Check } from "lucide-react";

export default function GraphicCommunication() {
  const [activeTab, setActiveTab] = useState<"lines" | "dtp" | "color-theory">("lines");
  const [selectedLine, setSelectedLine] = useState(lineStandards[0]);
  const [selectedTerm, setSelectedTerm] = useState(dtpTerms[0]);

  // Bleed visualization toggle
  const [showBleedGuides, setShowBleedGuides] = useState(true);

  // Color selection state
  const [primaryColor, setPrimaryColor] = useState({ name: "Primary Blue", hex: "#2563EB", contrastHex: "#FFFFFF" });
  const [selectedScheme, setSelectedScheme] = useState<"complementary" | "analogous" | "split">("complementary");

  const getColorScheme = () => {
    switch (primaryColor.name) {
      case "Primary Blue":
        return {
          complementary: { name: "Orange", hex: "#EA580C" },
          analogous: [{ name: "Teal", hex: "#0D9488" }, { name: "Indigo", hex: "#4F46E5" }],
          split: [{ name: "Warm Yellow", hex: "#CA8A04" }, { name: "Coral Red", hex: "#E11D48" }]
        };
      case "Emerald Green":
        return {
          complementary: { name: "Rose Red", hex: "#E11D48" },
          analogous: [{ name: "Lime", hex: "#65A30D" }, { name: "Teal", hex: "#0D9488" }],
          split: [{ name: "Deep Violet", hex: "#7C3AED" }, { name: "Tangerine", hex: "#D97706" }]
        };
      case "Sunset Red":
        return {
          complementary: { name: "Teal-Cyan", hex: "#0891B2" },
          analogous: [{ name: "Orange", hex: "#EA580C" }, { name: "Fuchsia", hex: "#C026D3" }],
          split: [{ name: "Green", hex: "#16A34A" }, { name: "Electric Purple", hex: "#7C3AED" }]
        };
      default:
        return {
          complementary: { name: "Orange", hex: "#EA580C" },
          analogous: [{ name: "Teal", hex: "#0D9488" }, { name: "Indigo", hex: "#4F46E5" }],
          split: [{ name: "Warm Yellow", hex: "#CA8A04" }, { name: "Coral Red", hex: "#E11D48" }]
        };
    }
  };

  const scheme = getColorScheme();

  return (
    <div className="space-y-8" id="graphics-subject-panel">
      {/* Subject Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 rounded-2xl p-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-blue-900 tracking-tight flex items-center gap-2">
            <PenTool className="w-6 h-6 text-blue-600" />
            Graphic Communication (N5 / Higher)
          </h2>
          <p className="text-sm text-blue-800/80 mt-1 max-w-2xl">
            Acquire vital design vocabulary and standards across 2D/3D orthographic CAD modeling, Desktop Publishing layouts, and color psychology.
          </p>
        </div>
        
        {/* Tab Buttons with Geometric style */}
        <div className="flex gap-1 bg-blue-100/60 p-1.5 rounded-xl self-end md:self-auto shrink-0">
          <button
            onClick={() => setActiveTab("lines")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "lines" ? "bg-white text-blue-900 shadow-xs" : "text-blue-700 hover:text-blue-950"
            }`}
          >
            BSI Line Standards
          </button>
          <button
            onClick={() => setActiveTab("dtp")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "dtp" ? "bg-white text-blue-900 shadow-xs" : "text-blue-700 hover:text-blue-950"
            }`}
          >
            DTP Layout Guides
          </button>
          <button
            onClick={() => setActiveTab("color-theory")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "color-theory" ? "bg-white text-blue-900 shadow-xs" : "text-blue-700 hover:text-blue-950"
            }`}
          >
            Color Selector
          </button>
        </div>
      </div>

      {activeTab === "lines" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* List Box */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">British Standards (BSI)</h3>
            <div className="space-y-2">
              {lineStandards.map((line) => (
                <button
                  key={line.id}
                  onClick={() => setSelectedLine(line)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedLine.id === line.id
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white text-slate-800 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <span className="font-bold text-xs block">{line.name}</span>
                  <span className={`text-[10px] uppercase font-bold tracking-wider block mt-1 ${selectedLine.id === line.id ? "text-blue-100" : "text-slate-400"}`}>
                    {line.industryName}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Details & Live Interactive Diagram View */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-full">{selectedLine.industryName}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">{selectedLine.name}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  <span className="font-semibold text-slate-800">Primary Use:</span> {selectedLine.use}
                </p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  <span className="font-semibold text-slate-800">Drafting Appearance:</span> {selectedLine.appearance}
                </p>
              </div>

              {/* Pure SVG diagram renderer explaining the selected line standard */}
              <div className="border border-slate-100 rounded-xl p-4 bg-slate-50">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-3">Interactive BSI CAD Example</span>
                <div className="h-44 bg-white border border-slate-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <svg className="w-full h-full p-4" viewBox="0 0 400 160">
                    {/* Outline Object (Standard Box) */}
                    <rect x="100" y="30" width="200" height="100" fill="#F1F5F9" stroke="#1E293B" strokeWidth={selectedLine.id === "continuous-thick" ? "3" : "1.5"} />
                    
                    {/* Inner detail (Hidden pocket circle) */}
                    <circle cx="200" cy="80" r="30" fill="none" 
                      stroke="#475569" 
                      strokeWidth={selectedLine.id === "continuous-thick" ? "1.5" : "2"}
                      strokeDasharray={selectedLine.id === "dashed-thin" ? "4,4" : selectedLine.id === "chain-thin" ? "12,4,2,4" : "0"} 
                    />

                    {/* Centering crosslines */}
                    <line x1="100" y1="80" x2="300" y2="80" 
                      stroke="#2563EB" 
                      strokeWidth="1" 
                      strokeDasharray={selectedLine.id === "chain-thin" ? "12,3,2,3" : "0"} 
                      opacity={selectedLine.id === "chain-thin" ? "1" : "0.2"} 
                    />
                    <line x1="200" y1="20" x2="200" y2="140" 
                      stroke="#2563EB" 
                      strokeWidth="1" 
                      strokeDasharray={selectedLine.id === "chain-thin" ? "12,3,2,3" : "0"} 
                      opacity={selectedLine.id === "chain-thin" ? "1" : "0.2"} 
                    />

                    {/* Dimensions (Continuous thin lines) */}
                    <g opacity={selectedLine.id === "continuous-thin" ? "1" : "0.3"}>
                      <line x1="100" y1="145" x2="300" y2="145" stroke="#475569" strokeWidth="1" />
                      <path d="M 100 145 L 108 142 L 108 148 Z M 300 145 L 292 142 L 292 148 Z" fill="#475569" />
                      <line x1="100" y1="130" x2="100" y2="152" stroke="#94A3B8" strokeWidth="1" />
                      <line x1="300" y1="130" x2="300" y2="152" stroke="#94A3B8" strokeWidth="1" />
                      <text x="200" y="140" fill="#475569" fontSize="10" fontFamily="monospace" textAnchor="middle">200 mm</text>
                    </g>

                    {/* Left corner fold projection lines */}
                    <g opacity={selectedLine.id === "chain-double-dash" ? "1" : "0.1"}>
                      <line x1="100" y1="30" x2="30" y2="30" stroke="#E11D48" strokeWidth="1.5" strokeDasharray="12,3,2,3,2,3" />
                      <text x="40" y="25" fill="#E11D48" fontSize="8" fontWeight="bold">FOLD LINE</text>
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl text-blue-900 text-xs leading-relaxed">
              <span className="font-bold uppercase block text-blue-800">Exam Reminder (Scottish SQA)</span>
              Always use a sharp <span className="font-bold">2H pencil</span> for thin line standards (dimensioning/projections) and a softer <span className="font-bold">HB pencil</span> for bold object outlines!
            </div>
          </div>
        </div>
      )}

      {activeTab === "dtp" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Terms Column */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">DTP Graphic Principles</h3>
            <div className="space-y-2">
              {dtpTerms.map((term) => (
                <button
                  key={term.id}
                  onClick={() => setSelectedTerm(term)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedTerm.id === term.id
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white text-slate-800 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <span className="font-bold text-xs block">{term.name}</span>
                  <span className={`text-[11px] block mt-1 line-clamp-1 ${selectedTerm.id === term.id ? "text-blue-100" : "text-slate-500"}`}>
                    {term.definition}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* DTP Layout Sandbox with interactive Toggle */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-md font-bold text-slate-900">{selectedTerm.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{selectedTerm.definition}</p>
              </div>
              <button
                onClick={() => setShowBleedGuides(!showBleedGuides)}
                className="bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1 transition-all"
              >
                <Eye className="w-3.5 h-3.5 text-slate-600" />
                {showBleedGuides ? "Hide DTP Overlays" : "Show DTP Overlays"}
              </button>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Magazine Page Mockup</span>
              
              <div className="h-64 bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden p-6 border-4 border-slate-300">
                
                {/* Bleed Margin Overlay (3mm expansion guide) */}
                {showBleedGuides && (
                  <div className="absolute inset-1 border border-dashed border-red-500/80 pointer-events-none z-20 flex items-start justify-end p-1">
                    <span className="text-[8px] font-bold text-red-500 bg-black/80 px-1 py-0.5 rounded leading-none">3mm Bleed Boundary</span>
                  </div>
                )}

                {/* Main Art (Aesthetic layout example) */}
                <div className="w-full h-full bg-slate-950 text-white rounded p-4 relative flex flex-col justify-between">
                  {/* Title banner */}
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-wider">Issue #14 • DESIGN HUB</span>
                      <h4 className="text-xl font-black uppercase tracking-tighter leading-none text-white">THE WORKSHOP AGE</h4>
                    </div>
                    <div className="w-12 h-12 bg-indigo-600 rounded flex items-center justify-center text-[10px] font-black italic">
                      T.
                    </div>
                  </div>

                  {/* 2-Column Text Layout demonstrating Gutter and Alignment */}
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="space-y-1 border-l border-cyan-500/30 pl-2">
                      <p className="text-[8px] text-slate-300 font-medium leading-normal">
                        Scottish craft curriculum requires students to carefully examine sustainable forestry resources before sawing blocks of soft pine wood.
                      </p>
                    </div>

                    <div className="space-y-1 border-l border-cyan-500/30 pl-2">
                      <p className="text-[8px] text-slate-300 font-medium leading-normal">
                        By applying exact BSI standards, engineering drawings can be exported seamlessly into manufacturing plants without manual sizing mistakes.
                      </p>
                    </div>
                  </div>

                  {/* DTP Term specific interactive highlights */}
                  {showBleedGuides && selectedTerm.id === "bleed" && (
                    <div className="absolute bottom-2 left-2 right-2 bg-red-600/95 border border-red-400 rounded p-2 z-30 text-white text-[10px]">
                      <span className="font-bold uppercase block text-white">Bleed Demonstration</span>
                      The dark slate background goes all the way past the red dashed guide to ensure seamless full-color printing borders!
                    </div>
                  )}

                  {showBleedGuides && selectedTerm.id === "gutter" && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-24 bg-yellow-500/80 border border-yellow-400 text-yellow-950 font-bold flex items-center justify-center text-[8px] z-30 text-center">
                      GUTTER
                    </div>
                  )}

                  {showBleedGuides && selectedTerm.id === "alignment" && (
                    <div className="absolute inset-y-0 left-[110px] w-[1px] bg-green-500 z-30 flex items-center justify-center">
                      <span className="text-[8px] font-bold bg-green-600 text-white px-1 rounded transform rotate-90 whitespace-nowrap">ALIGN GRID</span>
                    </div>
                  )}

                  {showBleedGuides && selectedTerm.id === "contrast" && (
                    <div className="absolute top-2 right-2 w-14 h-14 bg-white text-black font-black flex items-center justify-center text-[9px] rounded-full border-4 border-cyan-400 z-30 shadow-lg text-center leading-tight">
                      HIGH CONTRAST
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 border-t border-slate-100 pt-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aesthetic Purpose</span>
                <p className="text-xs text-slate-700 font-medium mt-0.5">{selectedTerm.purpose}</p>
              </div>
              <div className="border-l border-slate-100 pl-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Quick Folio Tip</span>
                <p className="text-xs text-slate-700 italic mt-0.5">{selectedTerm.tip}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "color-theory" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Color Theory & Brand Psychology</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              In Graphic Communication, color choices dictate target user response. Select a Base Color and examine harmonized pairings using CfE standards:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Color Base picker */}
            <div className="md:col-span-4 space-y-4">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest block">1. Choose Primary Color</span>
              <div className="space-y-2">
                <button
                  onClick={() => setPrimaryColor({ name: "Primary Blue", hex: "#2563EB", contrastHex: "#FFFFFF" })}
                  className={`w-full p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    primaryColor.name === "Primary Blue" ? "border-blue-600 bg-blue-50/50" : "border-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-600 border border-slate-200" />
                    <span className="text-xs font-bold text-slate-800">Primary Blue</span>
                  </div>
                  {primaryColor.name === "Primary Blue" && <Check className="w-4 h-4 text-blue-600" />}
                </button>

                <button
                  onClick={() => setPrimaryColor({ name: "Emerald Green", hex: "#10B981", contrastHex: "#FFFFFF" })}
                  className={`w-full p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    primaryColor.name === "Emerald Green" ? "border-emerald-600 bg-emerald-50/50" : "border-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-600 border border-slate-200" />
                    <span className="text-xs font-bold text-slate-800">Emerald Green</span>
                  </div>
                  {primaryColor.name === "Emerald Green" && <Check className="w-4 h-4 text-emerald-600" />}
                </button>

                <button
                  onClick={() => setPrimaryColor({ name: "Sunset Red", hex: "#EF4444", contrastHex: "#FFFFFF" })}
                  className={`w-full p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    primaryColor.name === "Sunset Red" ? "border-red-600 bg-red-50/50" : "border-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-red-600 border border-slate-200" />
                    <span className="text-xs font-bold text-slate-800">Sunset Red</span>
                  </div>
                  {primaryColor.name === "Sunset Red" && <Check className="w-4 h-4 text-red-600" />}
                </button>
              </div>
            </div>

            {/* Scheme Picker & Render */}
            <div className="md:col-span-8 bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex gap-2 mb-4 border-b border-slate-200/50 pb-3">
                  <button
                    onClick={() => setSelectedScheme("complementary")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      selectedScheme === "complementary" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-950"
                    }`}
                  >
                    Complementary
                  </button>
                  <button
                    onClick={() => setSelectedScheme("analogous")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      selectedScheme === "analogous" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-950"
                    }`}
                  >
                    Analogous
                  </button>
                  <button
                    onClick={() => setSelectedScheme("split")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      selectedScheme === "split" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-950"
                    }`}
                  >
                    Split Complementary
                  </button>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Matched Palette Rendering</span>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white">
                      <div className="h-20" style={{ backgroundColor: primaryColor.hex }} />
                      <div className="p-3 text-center">
                        <span className="text-xs font-bold text-slate-950 block">{primaryColor.name}</span>
                        <span className="text-[10px] font-mono text-slate-500">{primaryColor.hex}</span>
                      </div>
                    </div>

                    {selectedScheme === "complementary" && (
                      <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white col-span-2">
                        <div className="h-20" style={{ backgroundColor: scheme.complementary.hex }} />
                        <div className="p-3 text-center">
                          <span className="text-xs font-bold text-slate-950 block">Complementary: {scheme.complementary.name}</span>
                          <span className="text-[10px] font-mono text-slate-500">{scheme.complementary.hex}</span>
                        </div>
                      </div>
                    )}

                    {selectedScheme === "analogous" && (
                      <>
                        {scheme.analogous.map((color, idx) => (
                          <div key={idx} className="rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white">
                            <div className="h-20" style={{ backgroundColor: color.hex }} />
                            <div className="p-3 text-center">
                              <span className="text-xs font-bold text-slate-950 block">{color.name}</span>
                              <span className="text-[10px] font-mono text-slate-500">{color.hex}</span>
                            </div>
                          </div>
                        ))}
                      </>
                    )}

                    {selectedScheme === "split" && (
                      <>
                        {scheme.split.map((color, idx) => (
                          <div key={idx} className="rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white">
                            <div className="h-20" style={{ backgroundColor: color.hex }} />
                            <div className="p-3 text-center">
                              <span className="text-xs font-bold text-slate-950 block">{color.name}</span>
                              <span className="text-[10px] font-mono text-slate-500">{color.hex}</span>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-100 p-2.5 mt-4 text-indigo-950 rounded-xl text-[11px] leading-relaxed">
                <span className="font-bold uppercase text-[10px] block text-indigo-800">DTP Color Psychology (Scottish SQA)</span>
                {primaryColor.name === "Primary Blue" && "Blue represents reliability, trust, and professionalism. It is classified as a COLD color, which contrasts beautifully with warm colors like Orange to draw reader emphasis."}
                {primaryColor.name === "Emerald Green" && "Green represents organic freshness, growth, and eco-sustainability. It is an ideal brand color choice for portfolios focused on environmental products."}
                {primaryColor.name === "Sunset Red" && "Red represents high energy, excitement, caution, or passion. It is classified as a WARM color and acts as an immediate visual driver / call-to-action on a cover folder page."}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
