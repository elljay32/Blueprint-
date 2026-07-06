import React, { useState } from "react";
import { designFactors } from "../data";
import { Compass, Lightbulb, Recycle, ShieldAlert, Cpu, Send, Sparkles, Loader2, ArrowRight } from "lucide-react";

export default function DesignManufacture() {
  const [selectedFactor, setSelectedFactor] = useState(designFactors[0]);
  const [brief, setBrief] = useState("");
  const [helperAction, setHelperAction] = useState<"specification" | "research_plan" | "ideas" | "materials">("specification");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleHelpRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brief.trim()) return;
    
    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch("/api/gemini/folio-helper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: "Design & Manufacture",
          brief,
          action: helperAction
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate suggestions");
      }
      setResponse(data.suggestions);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while calling the helper API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8" id="design-subject-panel">
      {/* Subject Header */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200/60 rounded-2xl p-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-teal-900 tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-teal-600" />
            Design & Manufacture (N5 / Higher)
          </h2>
          <p className="text-sm text-teal-800/80 mt-1 max-w-2xl">
            Navigate the complete design journey—from initial user need to high-volume commercial production. Study user factors, mass materials, and SQA design portfolios.
          </p>
        </div>
        <div className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-teal-200/50">
          Scottish CfE Level 4 & 5
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Design Factors Explorer */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-md font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-teal-600" /> Key Design Factors
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              To achieve a top grade in your design portfolio, you must address how each of these SQA design factors influences your final design proposal.
            </p>

            {/* Factor Tabs */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {designFactors.map((factor) => (
                <button
                  key={factor.id}
                  onClick={() => setSelectedFactor(factor)}
                  className={`text-left p-3 rounded-xl border text-xs font-semibold transition-all ${
                    selectedFactor.id === factor.id
                      ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {factor.name}
                </button>
              ))}
            </div>

            {/* Selected Factor Details */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
              <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">
                Focus Question: {selectedFactor.question}
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {selectedFactor.description}
              </p>
              
              <div className="border-t border-slate-200/60 pt-3">
                <h4 className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Portfolio Examples</h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {selectedFactor.examples.map((ex, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-lg p-2.5 mt-2 text-teal-900">
                <span className="text-[10px] font-bold uppercase block text-teal-800">Assessor's Top Tip</span>
                <p className="text-[11px] mt-0.5 leading-relaxed">{selectedFactor.tips}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Folio Idea Generator & Brainstormer */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-md font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-600 animate-pulse" />
              Interactive SQA Design Folio Brainstormer
            </h3>
            <p className="text-xs text-slate-500">
              Need inspiration? Type your design brief or project idea (e.g., "A modern key holder for school lockers" or "An adjustable laptop stand made of sustainable birch plywood") and let our CfE AI assistant help you draft key sections of your folio.
            </p>

            <form onSubmit={handleHelpRequest} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">Your Design Brief</label>
                <textarea
                  required
                  rows={2}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="e.g. Design a sustainable garden planter that stores light hand tools."
                  className="w-full text-xs border border-slate-200 rounded-lg p-2.5 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">Select Folio Stage Assist</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setHelperAction("specification")}
                    className={`py-2 px-3 text-[11px] font-semibold rounded-lg border text-center transition-all ${
                      helperAction === "specification"
                        ? "bg-teal-50 border-teal-500 text-teal-700 font-bold"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Product Spec
                  </button>
                  <button
                    type="button"
                    onClick={() => setHelperAction("research_plan")}
                    className={`py-2 px-3 text-[11px] font-semibold rounded-lg border text-center transition-all ${
                      helperAction === "research_plan"
                        ? "bg-teal-50 border-teal-500 text-teal-700 font-bold"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Research Plan
                  </button>
                  <button
                    type="button"
                    onClick={() => setHelperAction("ideas")}
                    className={`py-2 px-3 text-[11px] font-semibold rounded-lg border text-center transition-all ${
                      helperAction === "ideas"
                        ? "bg-teal-50 border-teal-500 text-teal-700 font-bold"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Idea Generation
                  </button>
                  <button
                    type="button"
                    onClick={() => setHelperAction("materials")}
                    className={`py-2 px-3 text-[11px] font-semibold rounded-lg border text-center transition-all ${
                      helperAction === "materials"
                        ? "bg-teal-50 border-teal-500 text-teal-700 font-bold"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Material Sourcing
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating Expert Suggestions...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Generate Folio Section
                  </>
                )}
              </button>
            </form>
          </div>

          {/* AI Response Block */}
          <div className="mt-4 border-t border-slate-100 pt-4 flex-1 flex flex-col justify-between">
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl p-3">
                <span className="font-bold">Error:</span> {error}
              </div>
            )}
            
            {loading && (
              <div className="flex flex-col items-center justify-center py-8 text-slate-400 space-y-2">
                <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
                <p className="text-xs italic">Consulting Scottish Curriculum guidelines...</p>
              </div>
            )}

            {!loading && !response && !error && (
              <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-6 text-center text-slate-400 text-xs py-10">
                <Lightbulb className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                Your generated folder template ideas will appear here. Get started above!
              </div>
            )}

            {!loading && response && (
              <div className="bg-teal-50/40 border border-teal-100 rounded-xl p-4 max-h-[300px] overflow-y-auto">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Generated CfE Assistance
                  </span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(response);
                    }}
                    className="text-[10px] text-teal-600 hover:text-teal-800 underline font-bold"
                  >
                    Copy Text
                  </button>
                </div>
                <div className="prose prose-sm text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {response}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
