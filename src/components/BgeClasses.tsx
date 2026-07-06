import React, { useState } from "react";
import { safetySigns } from "../data";
import { Sparkles, Shield, Compass, HelpCircle, CheckCircle2, XCircle, Info, Flame, Eye } from "lucide-react";

export default function BgeClasses() {
  const [activeTab, setActiveTab] = useState<"projects" | "safety" | "tool-game">("projects");
  const [selectedSign, setSelectedSign] = useState(safetySigns[0]);

  // Workshop project details
  const bgeProjects = [
    {
      level: "S1 Craft",
      title: "Wooden Key Rack",
      duration: "6 Weeks",
      material: "Scots Pine & Acrylic hooks",
      skills: ["Marking out with try square", "Using a tenon saw", "Drilling with pillar drill", "Abrasive paper sanding"],
      safetyAlert: "Always wear safety goggles when drilling hooks."
    },
    {
      level: "S2 Design",
      title: "Acrylic Desk Organizer",
      duration: "8 Weeks",
      material: "Acrylic (Plastic) & MDF Base",
      skills: ["Scribing plastic with marking knife", "Using a strip heater to bend plastic", "Filing and polishing acrylic edges", "Applying PVA wood glue"],
      safetyAlert: "The strip heater gets extremely hot! Do not touch the heating wire."
    },
    {
      level: "S3 Engineering",
      title: "Pneumatic Control Board",
      duration: "10 Weeks",
      material: "Syringe cylinders, tubing, pine frame",
      skills: ["Understanding pneumatic cylinders", "Building simple 3/2 valve circuits", "Testing mechanical leverage", "Evaluating flow control"],
      safetyAlert: "Do not exceed maximum manual syringe pressure to avoid tube separation."
    }
  ];

  // Tool matching game state
  const toolsList = [
    { id: "tenon", name: "Tenon Saw", desc: "Has a brass spine to keep the blade completely stiff. Perfect for fine, accurate straight cuts in wood.", correctMatch: "straight-wood" },
    { id: "coping", name: "Coping Saw", desc: "Has a thin flexible blade held in a C-shaped steel frame. Ideal for cutting complex curved lines in wood or plastic.", correctMatch: "curves" },
    { id: "try-square", name: "Try Square", desc: "Has a heavy metal stock and steel blade set at exactly 90 degrees. Used to mark lines perpendicular to an edge.", correctMatch: "right-angles" },
    { id: "bevel-chisel", name: "Bevel-Edge Chisel", desc: "Has sloped sides to let it fit into joint shoulders. Used with a mallet to carve away waste wood.", correctMatch: "joints" }
  ];

  const matchesList = [
    { id: "curves", label: "Cutting curves in thin wood / acrylic" },
    { id: "right-angles", label: "Marking or checking 90 degree right angles" },
    { id: "straight-wood", label: "Making straight, precise joints in timber" },
    { id: "joints", label: "Slicing wood fibers to carve out joint shoulders" }
  ];

  const [gameSelection, setGameSelection] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [message, setMessage] = useState("Click on a Tool, then select its correct workshop use below!");

  const handleToolClick = (toolId: string) => {
    if (matchedIds.includes(toolId)) return;
    setGameSelection(toolId);
    setMessage(`Selected tool. Now choose its correct matching use!`);
  };

  const handleMatchClick = (matchId: string) => {
    if (!gameSelection) {
      setMessage("Please select a Tool from the list first!");
      return;
    }

    const currentTool = toolsList.find(t => t.id === gameSelection);
    if (currentTool && currentTool.correctMatch === matchId) {
      setScore(score + 10);
      setMatchedIds([...matchedIds, gameSelection]);
      setGameSelection(null);
      setMessage("Correct! That tool matches its workshop function perfectly! 🎉");
    } else {
      setScore(Math.max(0, score - 5));
      setMessage("Whoops! That use doesn't fit this tool. Check the description and try again! ❌");
    }
  };

  const resetGame = () => {
    setScore(0);
    setMatchedIds([]);
    setGameSelection(null);
    setMessage("Click on a Tool, then select its correct workshop use below!");
  };

  return (
    <div className="space-y-8" id="bge-subject-panel">
      {/* Subject Header */}
      <div className="bg-slate-900 border-l-8 border-rose-500 rounded-2xl p-6 text-white flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <span className="bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
            Broad General Education (S1 - S3)
          </span>
          <h2 className="text-2xl font-bold tracking-tight mt-2 flex items-center gap-2 text-white">
            <Compass className="w-6 h-6 text-rose-500" />
            BGE Craft & Design Hub
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Welcome, junior designers! Learn vital health & safety rules, explore your first school workshop projects, and practice identifying essential craft tools.
          </p>
        </div>

        <div className="flex gap-1.5 bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "projects" ? "bg-rose-500 text-white" : "text-slate-300 hover:text-white"
            }`}
          >
            S1-S3 Projects
          </button>
          <button
            onClick={() => setActiveTab("safety")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "safety" ? "bg-rose-500 text-white" : "text-slate-300 hover:text-white"
            }`}
          >
            Safety Signs
          </button>
          <button
            onClick={() => setActiveTab("tool-game")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "tool-game" ? "bg-rose-500 text-white" : "text-slate-300 hover:text-white"
            }`}
          >
            Tool Matcher
          </button>
        </div>
      </div>

      {activeTab === "projects" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bgeProjects.map((project, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-extrabold uppercase bg-rose-50 text-rose-600 px-2 py-0.5 rounded border border-rose-100">
                      {project.level}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 font-mono">{project.duration}</span>
                  </div>
                  <h3 className="text-md font-bold text-slate-900">{project.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    <span className="font-semibold text-slate-700">Material:</span> {project.material}
                  </p>

                  <div className="mt-4 space-y-2">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Skills You'll Master</h4>
                    <ul className="space-y-1">
                      {project.skills.map((skill, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 bg-rose-50 border border-rose-100 rounded-xl p-3 flex gap-2 text-rose-950 text-[11px] items-start">
                  <Flame className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <span className="font-bold">Safety Rule:</span> {project.safetyAlert}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "safety" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sign Buttons Grid */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Workshop Safety Signs</h3>
            <div className="space-y-2">
              {safetySigns.map((sign) => (
                <button
                  key={sign.id}
                  onClick={() => setSelectedSign(sign)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedSign.id === sign.id
                      ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                      : "bg-white text-slate-800 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs">{sign.title}</span>
                    <span
                      className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-extrabold ${
                        selectedSign.id === sign.id
                          ? "bg-rose-700/50 text-white"
                          : sign.category === "Prohibition"
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : sign.category === "Warning"
                          ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                          : sign.category === "Safe Condition"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {sign.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sign Focus Render */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                {/* Simulated safety icon badge */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center border-4 text-white font-extrabold text-2xl ${
                    selectedSign.category === "Prohibition"
                      ? "bg-red-600 border-red-200"
                      : selectedSign.category === "Warning"
                      ? "bg-yellow-500 border-yellow-100 text-slate-950"
                      : selectedSign.category === "Safe Condition"
                      ? "bg-green-600 border-green-200"
                      : "bg-blue-600 border-blue-200"
                  }`}
                >
                  {selectedSign.category === "Prohibition" && "⊘"}
                  {selectedSign.category === "Warning" && "⚠"}
                  {selectedSign.category === "Safe Condition" && "✚"}
                  {selectedSign.category === "Mandatory" && "✔"}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest block">{selectedSign.category} Category</span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedSign.title}</h3>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {selectedSign.description}
                </p>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">BSI Sign Colors & Meanings</span>
                  <p className="text-xs text-slate-700">
                    <span className="font-semibold text-slate-800">Layout:</span> {selectedSign.color}
                  </p>
                  <p className="text-xs text-slate-700">
                    <span className="font-semibold text-slate-800">Pictogram Symbol:</span> {selectedSign.symbol}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-rose-50/50 border border-rose-100 p-3 rounded-xl flex gap-2 text-rose-950 text-xs mt-4 items-start">
              <Shield className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <span className="font-bold uppercase">Workshop Access Rule:</span> Teachers will ask you to identify these signs before you are allowed to switch on any power tools or machinery in the craft block. Make sure to remember the background shapes and colors!
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "tool-game" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-start md:items-center border-b border-slate-100 pb-4 flex-col md:flex-row gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-5 h-5 text-rose-500 animate-pulse" /> S1-S3 Craft Tool Matcher Game
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Test your workshop tool knowledge and build up your skills points!</p>
            </div>
            <div className="flex items-center gap-4 self-end md:self-auto">
              <span className="text-xs bg-slate-900 text-white font-mono px-3 py-1.5 rounded-lg border border-slate-800 font-bold">
                SCORE: {score} PTS
              </span>
              <button
                onClick={resetGame}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
              >
                Reset Matcher
              </button>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center text-xs font-semibold text-slate-700">
            {message}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Saws & Tools Column */}
            <div className="space-y-3">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block">1. Select a Tool</span>
              <div className="grid grid-cols-1 gap-3">
                {toolsList.map((tool) => {
                  const isMatched = matchedIds.includes(tool.id);
                  const isSelected = gameSelection === tool.id;

                  return (
                    <button
                      key={tool.id}
                      disabled={isMatched}
                      onClick={() => handleToolClick(tool.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-start ${
                        isMatched
                          ? "bg-slate-100 text-slate-400 border-slate-100 cursor-not-allowed"
                          : isSelected
                          ? "bg-rose-500 text-white border-rose-500 shadow-sm shadow-rose-500/10"
                          : "bg-white text-slate-800 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div>
                        <span className="font-extrabold text-xs block">{tool.name}</span>
                        <p className={`text-[11px] mt-1 leading-normal ${isSelected ? "text-rose-100" : "text-slate-500"}`}>
                          {tool.desc}
                        </p>
                      </div>
                      {isMatched && <span className="text-emerald-600 font-bold text-xs uppercase bg-emerald-50 px-2 py-0.5 rounded">Matched ✔</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target Uses Column */}
            <div className="space-y-3">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block">2. Select the Appropriate Use</span>
              <div className="grid grid-cols-1 gap-3">
                {matchesList.map((match) => {
                  const isMatched = matchedIds.some(id => toolsList.find(t => t.id === id)?.correctMatch === match.id);

                  return (
                    <button
                      key={match.id}
                      disabled={isMatched}
                      onClick={() => handleMatchClick(match.id)}
                      className={`w-full text-left p-4 rounded-xl border font-semibold text-xs transition-all ${
                        isMatched
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100 cursor-not-allowed"
                          : "bg-white text-slate-800 border-slate-200 hover:bg-rose-50 hover:border-rose-300"
                      }`}
                    >
                      {match.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
