import React, { useState } from "react";
import PracticalWoodwork from "./components/PracticalWoodwork";
import DesignManufacture from "./components/DesignManufacture";
import GraphicCommunication from "./components/GraphicCommunication";
import BgeClasses from "./components/BgeClasses";
import AssessmentHub from "./components/AssessmentHub";
import TeacherHub from "./components/TeacherHub";

import { 
  Hammer, 
  Compass, 
  PenTool, 
  BookOpen, 
  Award, 
  Sparkles, 
  User, 
  BookMarked, 
  ArrowRight,
  ChevronRight,
  Menu,
  X
} from "lucide-react";

type ActiveTab = "home" | "woodwork" | "design" | "graphics" | "bge" | "assessment" | "teacher";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Quick helper to scroll to top on tab change
  const navigateTo = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 border-t-8 border-blue-600">
      
      {/* Header Bar */}
      <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo("home")}>
          <div className="w-10 h-10 bg-blue-600 flex items-center justify-center rounded-lg shadow-sm">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path>
            </svg>
          </div>
          <div>
            <h1 className="text-xl lg:text-2xl font-black tracking-tighter uppercase text-slate-900">
              Blueprint<span className="text-blue-600">.</span>
            </h1>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block -mt-1">
              Scottish CfE Hub
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6 xl:gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
          <button 
            onClick={() => navigateTo("home")} 
            className={`pb-1 transition-all ${activeTab === "home" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-blue-600"}`}
          >
            Home
          </button>
          <button 
            onClick={() => navigateTo("woodwork")} 
            className={`pb-1 transition-all ${activeTab === "woodwork" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-blue-600"}`}
          >
            Woodwork
          </button>
          <button 
            onClick={() => navigateTo("design")} 
            className={`pb-1 transition-all ${activeTab === "design" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-blue-600"}`}
          >
            Design & Man
          </button>
          <button 
            onClick={() => navigateTo("graphics")} 
            className={`pb-1 transition-all ${activeTab === "graphics" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-blue-600"}`}
          >
            Graphics
          </button>
          <button 
            onClick={() => navigateTo("bge")} 
            className={`pb-1 transition-all ${activeTab === "bge" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-blue-600"}`}
          >
            BGE Classes
          </button>
          <button 
            onClick={() => navigateTo("assessment")} 
            className={`pb-1 transition-all ${activeTab === "assessment" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-blue-600"}`}
          >
            Assessment Hub
          </button>
          <button 
            onClick={() => navigateTo("teacher")} 
            className={`pb-1 transition-all ${activeTab === "teacher" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-blue-600 text-indigo-600"}`}
          >
            Teacher Desk
          </button>
        </nav>

        {/* Mobile menu toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-blue-600 rounded-lg"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 py-4 px-6 flex flex-col gap-3 font-bold uppercase tracking-wider text-xs text-slate-600">
          <button onClick={() => navigateTo("home")} className={`text-left py-2 ${activeTab === "home" ? "text-blue-600" : ""}`}>Home</button>
          <button onClick={() => navigateTo("woodwork")} className={`text-left py-2 ${activeTab === "woodwork" ? "text-blue-600" : ""}`}>Practical Woodwork</button>
          <button onClick={() => navigateTo("design")} className={`text-left py-2 ${activeTab === "design" ? "text-blue-600" : ""}`}>Design & Manufacture</button>
          <button onClick={() => navigateTo("graphics")} className={`text-left py-2 ${activeTab === "graphics" ? "text-blue-600" : ""}`}>Graphic Communication</button>
          <button onClick={() => navigateTo("bge")} className={`text-left py-2 ${activeTab === "bge" ? "text-blue-600" : ""}`}>BGE Classes</button>
          <button onClick={() => navigateTo("assessment")} className={`text-left py-2 ${activeTab === "assessment" ? "text-blue-600" : ""}`}>Assessment Hub</button>
          <button onClick={() => navigateTo("teacher")} className={`text-left py-2 text-indigo-600 ${activeTab === "teacher" ? "text-blue-600" : ""}`}>Teacher Desk</button>
        </div>
      )}

      {/* Main Area Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-12 py-8">
        
        {/* Render Dashboard Page */}
        {activeTab === "home" && (
          <div className="space-y-8">
            
            {/* Welcome banner with Geometric Balance styling */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b-8 border-blue-600">
              <div className="space-y-3 max-w-xl z-10">
                <span className="bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded">
                  Curricular Hub
                </span>
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                  DESIGN & TECHNOLOGY BLUEPRINT
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Welcome to the ultimate digital aid for Scottish Secondary pupils. Prepare for National 4, National 5, and Higher assessments with interactive modules and instant AI-driven portfolio feedback.
                </p>
              </div>

              {/* Quick statistics for pupils */}
              <div className="flex gap-4 z-10">
                <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/10 text-center min-w-[120px]">
                  <span className="text-2xl font-black text-blue-400 block">4</span>
                  <span className="text-[10px] font-extrabold text-slate-300 uppercase">Core Subjects</span>
                </div>
                <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/10 text-center min-w-[120px]">
                  <span className="text-2xl font-black text-rose-400 block">CfE</span>
                  <span className="text-[10px] font-extrabold text-slate-300 uppercase">Standards</span>
                </div>
              </div>

              {/* Backing geometry accents */}
              <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute left-1/3 top-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Core Subjects Grid - Split into 4 Blocks matching User Intent */}
            <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1 mb-4">
                Explore Core Curriculums
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Practical Woodwork */}
                <section 
                  onClick={() => navigateTo("woodwork")}
                  className="bg-white border-l-8 border-amber-600 p-8 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between rounded-r-2xl border border-slate-200 cursor-pointer group"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="text-2xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">Practical Woodwork</h4>
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        N4 / N5 Level
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed max-w-md">
                      Master essential hand tools, layout marking, joint manufacturing, and wood selection. Perfect for preparation of the SQA practical coursework exam.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-6 border-t border-slate-100 pt-4 text-center">
                    <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Interactive</p>
                      <p className="text-[11px] font-bold text-slate-800">Joints Guide</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Reference</p>
                      <p className="text-[11px] font-bold text-slate-800">Woods Lib</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Helper</p>
                      <p className="text-[11px] font-bold text-slate-800">Cutting list</p>
                    </div>
                  </div>
                </section>

                {/* 2. Design & Manufacture */}
                <section 
                  onClick={() => navigateTo("design")}
                  className="bg-white border-l-8 border-teal-600 p-8 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between rounded-r-2xl border border-slate-200 cursor-pointer group"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="text-2xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">Design & Manufacture</h4>
                      <span className="bg-teal-100 text-teal-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        N5 / Higher
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed max-w-md">
                      Analyze consumer needs, research materials, specify requirements, and master industrial production. Features the AI-driven SQA Brainstormer.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-6 border-t border-slate-100 pt-4">
                    <div className="bg-teal-600 text-white rounded-lg py-2.5 text-center text-xs font-bold uppercase tracking-widest">
                      Idea Generation
                    </div>
                    <div className="border border-teal-600 text-teal-600 hover:bg-teal-50 rounded-lg py-2.5 text-center text-xs font-bold uppercase tracking-widest">
                      Materials Finder
                    </div>
                  </div>
                </section>

                {/* 3. Graphic Communication */}
                <section 
                  onClick={() => navigateTo("graphics")}
                  className="bg-white border-l-8 border-blue-600 p-8 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between rounded-r-2xl border border-slate-200 cursor-pointer group"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Graphic Communication</h4>
                      <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        N5 / Higher
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed max-w-md">
                      Study orthographic CAD models, BSI line standards, Desktop Publishing layout principles (bleed, gutters, grids), and color psychology.
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center text-xs">
                    <span className="font-mono text-slate-400 uppercase text-[10px]">CAD, DTP & RENDERING</span>
                    <span className="text-blue-600 font-bold flex items-center gap-0.5">Explore Lines & Colors <ChevronRight className="w-4 h-4" /></span>
                  </div>
                </section>

                {/* 4. BGE Classes */}
                <section 
                  onClick={() => navigateTo("bge")}
                  className="bg-slate-900 border-l-8 border-rose-500 p-8 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between rounded-r-2xl cursor-pointer group text-white"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="text-2xl font-bold text-white group-hover:text-rose-400 transition-colors">BGE Classes</h4>
                      <span className="bg-rose-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Levels 3 & 4
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed max-w-md">
                      Fun and educational craft modules for S1, S2, and S3. Play the interactive Tool Matcher game or explore essential workshop safety symbols.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-6 border-t border-slate-800 pt-4">
                    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-300">Junior S1-S3 Projects</span>
                      <span className="text-rose-500 font-black">&rarr;</span>
                    </div>
                    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-300">Safety & Signs Board</span>
                      <span className="text-rose-500 font-black">&rarr;</span>
                    </div>
                  </div>
                </section>

              </div>
            </div>

            {/* Platform Utility Links (Assessment & Teacher tools) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div 
                onClick={() => navigateTo("assessment")}
                className="bg-blue-600 rounded-2xl p-6 text-white cursor-pointer hover:bg-blue-700 transition-all flex justify-between items-center shadow-sm"
              >
                <div className="space-y-1">
                  <h4 className="text-lg font-bold">Interactive Assessment Desk</h4>
                  <p className="text-xs text-blue-100">Take multiple-choice tests or grade your folder draft against CfE benchmarks.</p>
                </div>
                <Award className="w-10 h-10 text-white/30" />
              </div>

              <div 
                onClick={() => navigateTo("teacher")}
                className="bg-indigo-600 rounded-2xl p-6 text-white cursor-pointer hover:bg-indigo-700 transition-all flex justify-between items-center shadow-sm"
              >
                <div className="space-y-1">
                  <h4 className="text-lg font-bold">Teacher Class Preparation Desk</h4>
                  <p className="text-xs text-indigo-100">Create custom lesson plans, task sheets, or SQA rubrics automatically.</p>
                </div>
                <BookMarked className="w-10 h-10 text-white/30" />
              </div>
            </div>

          </div>
        )}

        {/* Subjects & Utilities Sub-Pages */}
        {activeTab === "woodwork" && <PracticalWoodwork />}
        {activeTab === "design" && <DesignManufacture />}
        {activeTab === "graphics" && <GraphicCommunication />}
        {activeTab === "bge" && <BgeClasses />}
        {activeTab === "assessment" && <AssessmentHub />}
        {activeTab === "teacher" && <TeacherHub />}

      </main>

      {/* Footer Status Bar with Geometric Balance standards */}
      <footer className="h-14 bg-white border-t border-slate-200 px-6 lg:px-12 flex items-center justify-between text-xs font-semibold shrink-0 mt-12">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
              Curriculum v2.4 Compliant
            </span>
          </div>
          <div className="h-4 w-px bg-slate-200 hidden md:block"></div>
          <span className="text-[10px] font-bold text-slate-400 uppercase hidden md:inline">
            Benchmarks: 1.1a, 1.2b, 2.1c, 4.4a
          </span>
        </div>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Design & Technology Scotland
        </div>
      </footer>
    </div>
  );
}
