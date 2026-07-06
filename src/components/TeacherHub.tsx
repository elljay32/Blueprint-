import React, { useState } from "react";
import { Sparkles, Calendar, BookOpen, FileText, CheckSquare, ClipboardCopy, Loader2, Send } from "lucide-react";

export default function TeacherHub() {
  const [subject, setSubject] = useState("Practical Woodwork");
  const [level, setLevel] = useState("National 5");
  const [toolType, setToolType] = useState("lesson_plan");
  const [topic, setTopic] = useState("Introduction to Bevel-Edged Chisels and Safety");
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError("");
    setGeneratedContent("");
    setCopied(false);

    try {
      const res = await fetch("/api/gemini/teacher-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          level,
          toolType,
          topic
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate resource");
      }
      setGeneratedContent(data.content);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during resource generation. Ensure your GEMINI_API_KEY is active in Settings.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8" id="teacher-hub-panel">
      {/* Subject Header */}
      <div className="bg-gradient-to-r from-slate-100 to-indigo-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <span className="bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
            Scottish Teacher's Office
          </span>
          <h2 className="text-2xl font-bold tracking-tight mt-2 flex items-center gap-2 text-slate-900">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            CfE Lesson Prep & Resource Generator
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Streamline your class prep! Instantly generate detailed 50-minute lesson plans, step-by-step workshop task sheets, SQA-aligned marking rubrics, or retrieval quiz questions.
          </p>
        </div>
        <div className="bg-white border border-slate-200 shadow-xs rounded-xl p-3 text-center">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Standard Alignment</span>
          <span className="text-xs font-bold text-slate-800">CfE v2.4 + SQA Cores</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-950 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600" /> Lesson Creator Configuration
          </h3>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">Subject Area</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-indigo-500 focus:outline-none bg-white"
                >
                  <option value="Practical Woodwork">Practical Woodwork</option>
                  <option value="Design & Manufacture">Design & Manufacture</option>
                  <option value="Graphic Communication">Graphic Communication</option>
                  <option value="BGE Design & Craft">BGE Design & Craft</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">Curricular Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-indigo-500 focus:outline-none bg-white"
                >
                  <option value="BGE (S1-S3)">BGE Level 3 & 4</option>
                  <option value="National 4">National 4</option>
                  <option value="National 5">National 5</option>
                  <option value="Higher">Higher</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">Resource Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setToolType("lesson_plan")}
                  className={`py-2 px-3 text-[11px] font-semibold rounded-lg border text-center transition-all flex items-center justify-center gap-1.5 ${
                    toolType === "lesson_plan"
                      ? "bg-indigo-50 border-indigo-500 text-indigo-700 font-bold"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" /> 50m Lesson Plan
                </button>
                <button
                  type="button"
                  onClick={() => setToolType("workshop_task")}
                  className={`py-2 px-3 text-[11px] font-semibold rounded-lg border text-center transition-all flex items-center justify-center gap-1.5 ${
                    toolType === "workshop_task"
                      ? "bg-indigo-50 border-indigo-500 text-indigo-700 font-bold"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" /> Task Sheet
                </button>
                <button
                  type="button"
                  onClick={() => setToolType("marking_rubric")}
                  className={`py-2 px-3 text-[11px] font-semibold rounded-lg border text-center transition-all flex items-center justify-center gap-1.5 ${
                    toolType === "marking_rubric"
                      ? "bg-indigo-50 border-indigo-500 text-indigo-700 font-bold"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5" /> Marking Rubric
                </button>
                <button
                  type="button"
                  onClick={() => setToolType("quiz_questions")}
                  className={`py-2 px-3 text-[11px] font-semibold rounded-lg border text-center transition-all flex items-center justify-center gap-1.5 ${
                    toolType === "quiz_questions"
                      ? "bg-indigo-50 border-indigo-500 text-indigo-700 font-bold"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" /> Retrieval Quiz
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Unit Topic / Target Concept</label>
                <button
                  type="button"
                  onClick={() => {
                    if (subject === "Practical Woodwork") {
                      setTopic("Introduction to Cross Halving joints and try squares");
                    } else if (subject === "Design & Manufacture") {
                      setTopic("Evaluating the 6 Rs of Sustainability in plastic chairs");
                    } else if (subject === "Graphic Communication") {
                      setTopic("Understanding DTP Bleed boundaries and margins");
                    } else {
                      setTopic("Workshop safety sign colors and definitions");
                    }
                  }}
                  className="text-[10px] text-indigo-600 hover:text-indigo-800 underline font-semibold"
                >
                  Load Topic Prompt
                </button>
              </div>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Using the pillar drill safely, or Anthropometrics percentiles"
                className="w-full text-xs border border-slate-200 rounded-lg p-2.5 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Curricular Resource...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" /> Create SQA-Aligned Resource
                </>
              )}
            </button>
          </form>
        </div>

        {/* Generated output Column */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[400px]">
          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-3 py-10">
              <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
              <div className="text-center">
                <p className="text-xs font-bold text-slate-800">Generating Markdown content...</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Structuring learning intentions, safety rules, and assessment columns...</p>
              </div>
            </div>
          )}

          {!loading && !generatedContent && !error && (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 py-12 text-center">
              <FileText className="w-10 h-10 text-slate-300 mb-3" />
              <h4 className="font-bold text-slate-600 text-xs">Resource Desk Empty</h4>
              <p className="text-[11px] text-slate-400 max-w-sm mt-1 leading-relaxed">
                Configure your subject guidelines on the left and click 'Create' to auto-generate downloadable worksheets and teaching sequences.
              </p>
            </div>
          )}

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl p-4 my-auto">
              <span className="font-bold block uppercase mb-1">Resource Creation Error</span>
              <p>{error}</p>
              <p className="mt-2 text-[11px] text-rose-700">Please make sure your GEMINI_API_KEY is active in the Secrets menu of AI Studio.</p>
            </div>
          )}

          {!loading && generatedContent && (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Classroom Ready Material</span>
                    <h4 className="text-sm font-bold text-slate-900">Markdown Document Preview</h4>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <ClipboardCopy className="w-4 h-4" />
                    {copied ? "Copied!" : "Copy Markdown"}
                  </button>
                </div>

                <div className="mt-4 overflow-y-auto max-h-[380px] bg-slate-50 border border-slate-100 rounded-xl p-4">
                  <div className="prose prose-sm text-xs text-slate-700 leading-relaxed whitespace-pre-line font-medium">
                    {generatedContent}
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-indigo-950 text-[11px] mt-4 leading-normal">
                <span className="font-bold block uppercase text-[10px] text-indigo-800">Assessor Guide Note</span>
                All generated materials are structured to meet standard SQA specifications. You can paste this directly into Microsoft Word, Google Docs, or school virtual learning systems.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
