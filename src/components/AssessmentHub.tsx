import React, { useState } from "react";
import { quizQuestions } from "../data";
import { Sparkles, Trophy, RotateCcw, Award, CheckCircle, HelpCircle, Loader2, Send, Info, ChevronRight, Bookmark } from "lucide-react";

export default function AssessmentHub() {
  const [activeTab, setActiveTab] = useState<"quiz" | "folio-grader">("quiz");

  // Quiz State
  const [subjectFilter, setSubjectFilter] = useState<"all" | "woodwork" | "design" | "graphics" | "bge">("all");
  const filteredQuestions = quizQuestions.filter(q => subjectFilter === "all" || q.subject === subjectFilter);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answersLog, setAnswersLog] = useState<Array<{ questionId: string; selected: number; correct: boolean }>>([]);

  // Folio Grader State
  const [level, setLevel] = useState("National 5");
  const [subject, setSubject] = useState("Design & Manufacture");
  const [stage, setStage] = useState("User Research & Product Design Specification (PDS)");
  const [portfolioContent, setPortfolioContent] = useState("");
  const [gradingResult, setGradingResult] = useState<any | null>(null);
  const [gradingLoading, setGradingLoading] = useState(false);
  const [gradingError, setGradingError] = useState("");

  const handleOptionSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const submitAnswer = () => {
    if (selectedOption === null || isSubmitted) return;
    
    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.answerIndex;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswersLog([...answersLog, {
      questionId: currentQuestion.id,
      selected: selectedOption,
      correct: isCorrect
    }]);

    setIsSubmitted(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
    setAnswersLog([]);
  };

  const handleGraderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!portfolioContent.trim()) return;

    setGradingLoading(true);
    setGradingError("");
    setGradingResult(null);

    try {
      const res = await fetch("/api/gemini/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level,
          subject,
          stage,
          content: portfolioContent
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to grade portfolio work");
      }
      setGradingResult(data);
    } catch (err: any) {
      console.error(err);
      setGradingError(err.message || "An error occurred during evaluation. Make sure GEMINI_API_KEY is configured.");
    } finally {
      setGradingLoading(false);
    }
  };

  return (
    <div className="space-y-8" id="assessment-subject-panel">
      {/* Subject Header */}
      <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50 border border-slate-200/60 rounded-2xl p-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Award className="w-6 h-6 text-blue-600" />
            Scottish CfE Assessment Hub
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Prepare for SQA assignments and end-of-unit tests! Practice with interactive quizzes, or get instant automated formative marking for your draft design folders.
          </p>
        </div>

        {/* Dynamic Selector Tabs */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
          <button
            onClick={() => {
              setActiveTab("quiz");
              resetQuiz();
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "quiz" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Retrieval Practice Quiz
          </button>
          <button
            onClick={() => setActiveTab("folio-grader")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "folio-grader" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Digital Folio Assessor (AI)
          </button>
        </div>
      </div>

      {activeTab === "quiz" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Quiz Control panel */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Select Subject Area</h3>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => { setSubjectFilter("all"); resetQuiz(); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    subjectFilter === "all" ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  All CfE Core Subjects
                </button>
                <button
                  onClick={() => { setSubjectFilter("woodwork"); resetQuiz(); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    subjectFilter === "woodwork" ? "bg-amber-600 text-white" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Practical Woodwork
                </button>
                <button
                  onClick={() => { setSubjectFilter("design"); resetQuiz(); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    subjectFilter === "design" ? "bg-teal-600 text-white" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Design & Manufacture
                </button>
                <button
                  onClick={() => { setSubjectFilter("graphics"); resetQuiz(); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    subjectFilter === "graphics" ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Graphic Communication
                </button>
                <button
                  onClick={() => { setSubjectFilter("bge"); resetQuiz(); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    subjectFilter === "bge" ? "bg-rose-600 text-white" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  BGE Classes (Junior)
                </button>
              </div>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 text-blue-950 text-xs leading-relaxed space-y-2">
              <span className="font-extrabold text-[10px] text-blue-800 uppercase tracking-widest block">Active Recall Tip</span>
              <p>
                Retrieval quizzes build permanent neural paths! Answering these multiple-choice challenges prepares you directly for the high-pressure written exams in May.
              </p>
            </div>
          </div>

          {/* Active Quiz Area */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            {filteredQuestions.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                No active questions loaded for this filter selection.
              </div>
            ) : quizCompleted ? (
              <div className="py-8 text-center space-y-5">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <Trophy className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Quiz Completed!</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    You scored <span className="font-black text-slate-900">{score}</span> out of <span className="font-black text-slate-900">{filteredQuestions.length}</span>!
                  </p>
                </div>

                <div className="max-w-md mx-auto bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs text-left space-y-2">
                  <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Your Scottish Benchmark Scorecard</span>
                  <p className="text-slate-700 leading-relaxed">
                    {score === filteredQuestions.length 
                      ? "Outstanding work! You have shown deep knowledge of National 5 and Higher design concepts. Keep up this standard!" 
                      : score >= filteredQuestions.length / 2 
                      ? "Good pass! You are achieving SQA curriculum targets. Review the specific questions you missed below." 
                      : "Working towards the benchmarks. Go back to the module guides, study the woodwork joints and BSI line structures, and try again!"
                    }
                  </p>
                </div>

                <button
                  onClick={resetQuiz}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-4 rounded-xl inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" /> Try Again
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Question Info */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold bg-blue-50 text-blue-700 px-2 py-0.5 rounded uppercase border border-blue-100">
                      {filteredQuestions[currentQuestionIndex].level}
                    </span>
                    <span className="text-[10px] font-extrabold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase">
                      {filteredQuestions[currentQuestionIndex].subject}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 font-mono">
                    Question {currentQuestionIndex + 1} of {filteredQuestions.length}
                  </span>
                </div>

                {/* Question Text */}
                <h3 className="text-base font-bold text-slate-950 leading-snug">
                  {filteredQuestions[currentQuestionIndex].question}
                </h3>

                {/* Multi-choice options */}
                <div className="space-y-2">
                  {filteredQuestions[currentQuestionIndex].options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrectOption = idx === filteredQuestions[currentQuestionIndex].answerIndex;

                    let optionStyle = "border-slate-200 bg-white text-slate-800 hover:bg-slate-50";
                    if (isSelected && !isSubmitted) {
                      optionStyle = "border-blue-600 bg-blue-50 text-blue-900 font-semibold";
                    } else if (isSubmitted) {
                      if (isCorrectOption) {
                        optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold";
                      } else if (isSelected) {
                        optionStyle = "border-rose-400 bg-rose-50 text-rose-950";
                      } else {
                        optionStyle = "border-slate-100 bg-slate-50/50 text-slate-400";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isSubmitted}
                        onClick={() => handleOptionSelect(idx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{option}</span>
                        {isSubmitted && isCorrectOption && <span className="text-emerald-600 text-[10px] font-bold uppercase bg-emerald-100 px-2 py-0.5 rounded">Correct ✔</span>}
                        {isSubmitted && isSelected && !isCorrectOption && <span className="text-rose-600 text-[10px] font-bold uppercase bg-rose-100 px-2 py-0.5 rounded">Wrong ❌</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation feedback block */}
                {isSubmitted && (
                  <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 text-xs space-y-1">
                    <span className="font-extrabold text-[10px] text-slate-500 uppercase tracking-widest block">Educational Explanation</span>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {filteredQuestions[currentQuestionIndex].explanation}
                    </p>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="border-t border-slate-100 pt-4 flex justify-end">
                  {!isSubmitted ? (
                    <button
                      disabled={selectedOption === null}
                      onClick={submitAnswer}
                      className="bg-slate-900 hover:bg-slate-950 disabled:opacity-50 text-white font-bold text-xs py-2 px-5 rounded-lg transition-all cursor-pointer"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-5 rounded-lg inline-flex items-center gap-1 transition-all cursor-pointer"
                    >
                      {currentQuestionIndex === filteredQuestions.length - 1 ? "Finish Quiz" : "Next Question"} <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "folio-grader" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Settings Column */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-slate-950 flex items-center gap-1.5">
              <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" /> Digital Assessment Engine
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Scottish teachers frequently assess pupil folders against specific **CfE Benchmark Codes**. Select your parameters and paste your design folder draft work to receive instant formative feedback.
            </p>

            <form onSubmit={handleGraderSubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">CfE/SQA Level</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option value="BGE (S1-S3)">BGE Level 3 & 4</option>
                    <option value="National 4">National 4</option>
                    <option value="National 5">National 5</option>
                    <option value="Higher">Higher</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">Subject Area</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option value="Practical Woodwork">Practical Woodwork</option>
                    <option value="Design & Manufacture">Design & Manufacture</option>
                    <option value="Graphic Communication">Graphic Communication</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">Design Folder Stage</label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white"
                >
                  <option value="User Research & Product Design Specification (PDS)">User Research & PDS</option>
                  <option value="Idea Generation & Design Sketches">Idea Generation & Sketches</option>
                  <option value="Material Justification & Selection">Material Selection</option>
                  <option value="Manufacturing Sequence & Tool Selection">Manufacturing Sequence</option>
                  <option value="Evaluation against Specification">Evaluation & Testing</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Your Folder Text</label>
                  <button
                    type="button"
                    onClick={() => {
                      setPortfolioContent(
                        "My client is a school pupil. I will construct a phone holder from Scots Pine softwood because it is cheap, easy to sand, and sustainable. I plan to use a cross-halving joint to make the main frame, which I will mark using a try square and set out to half wood depth with a marking gauge, before sawing with a Tenon Saw. This will hold the phone securely."
                      );
                    }}
                    className="text-[10px] text-blue-600 hover:text-blue-800 underline font-semibold"
                  >
                    Load Sample Work
                  </button>
                </div>
                <textarea
                  required
                  rows={4}
                  value={portfolioContent}
                  onChange={(e) => setPortfolioContent(e.target.value)}
                  placeholder="Paste your folder explanations, research paragraphs, or material justification sentences here..."
                  className="w-full text-xs border border-slate-200 rounded-lg p-2.5 focus:ring-1 focus:ring-blue-500 focus:outline-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={gradingLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                {gradingLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Evaluating SQA Standards...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Submit for CfE Review
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Graded Output Column */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[400px]">
            {gradingLoading && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-3 py-10">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                <div className="text-center">
                  <p className="text-xs font-bold text-slate-800">Assessing against CfE Benchmarks...</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Calculating matched standards and teacher next steps...</p>
                </div>
              </div>
            )}

            {!gradingLoading && !gradingResult && !gradingError && (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 py-12 text-center">
                <Bookmark className="w-10 h-10 text-slate-300 mb-3" />
                <h4 className="font-bold text-slate-600 text-xs">Awaiting Folder Submission</h4>
                <p className="text-[11px] text-slate-400 max-w-sm mt-1 leading-relaxed">
                  Pupils can write or paste draft SQA portfolio texts on the left, then click 'Submit' to receive benchmark matching and teacher feedback.
                </p>
              </div>
            )}

            {gradingError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl p-4 my-auto">
                <span className="font-bold block uppercase mb-1">Submission Error</span>
                <p>{gradingError}</p>
                <p className="mt-2 text-[11px] text-rose-700">Please make sure your GEMINI_API_KEY is active in the Secrets menu of AI Studio.</p>
              </div>
            )}

            {!gradingLoading && gradingResult && (
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3 flex-wrap gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Automated Teacher Report</span>
                      <h4 className="text-md font-bold text-slate-900">CfE Benchmark Appraisal</h4>
                    </div>
                    
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        gradingResult.rating === "Excellent / Exceeded"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : gradingResult.rating === "Achieved"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {gradingResult.rating}
                    </span>
                  </div>

                  {/* Matched Benchmarks List */}
                  <div className="mt-4 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Matched Benchmarks & SQA Skills</span>
                    <div className="flex flex-wrap gap-1.5">
                      {gradingResult.matchedBenchmarks && gradingResult.matchedBenchmarks.map((bench: string, i: number) => (
                        <span key={i} className="bg-slate-100 text-slate-800 text-[10px] font-semibold px-2.5 py-1 rounded-md border border-slate-200/50">
                          {bench}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Formatted feedback text */}
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Detailed Formative Feedback</span>
                    <div className="prose prose-sm text-xs text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 border border-slate-100 rounded-xl p-4">
                      {gradingResult.feedback}
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-blue-50/50 border border-blue-100 rounded-xl p-3 flex gap-2 text-blue-950 text-[11px] items-center">
                  <Info className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                  <p>
                    <span className="font-bold">Next Steps:</span> Copy the AI's suggestions and use them to refine your design folder before handing in your work to your class teacher!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
