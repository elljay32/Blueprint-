import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const isESM = typeof import.meta !== "undefined" && import.meta.url;
const resolvedFilename = isESM ? fileURLToPath(import.meta.url) : (typeof __filename !== "undefined" ? __filename : "");
const resolvedDirname = isESM ? path.dirname(resolvedFilename) : (typeof __dirname !== "undefined" ? __dirname : "");

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client helper to avoid crashes on startup if API key is missing
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured. Please set it in your environment variables (e.g., Secrets panel in AI Studio, or Site Settings in Netlify).");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API Routes

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 1. Evaluate pupil folio / ideas against Scottish CfE standards
app.post("/api/gemini/evaluate", async (req, res) => {
  try {
    const { level, subject, stage, content } = req.body;
    
    if (!content || !stage || !subject || !level) {
      return res.status(400).json({ error: "Missing required fields: level, subject, stage, content" });
    }

    const ai = getAiClient();
    const systemPrompt = `You are an expert Scottish Secondary Design and Technology teacher and assessor. 
Your goal is to evaluate pupil work according to the Scottish Curriculum for Excellence (CfE) benchmarks and SQA specifications (National 4, National 5, Higher, and Broad General Education).
The target demographic is S1-S6 pupils (aged 11-17). Your tone MUST be extremely encouraging, constructive, clear, and age-appropriate (no heavy professional jargon without explanation). Use friendly bullet points and clear headings.

Evaluate the pupil's work for:
Subject: ${subject}
Level: ${level}
Design Stage: ${stage}

Work submitted by pupil:
"${content}"

Analyze if this meets common Scottish benchmarks (e.g., clear user research, detailed specifications, creative idea generation, ergonomics considerations, material selection, woodwork tooling/safety, or drawing standards depending on subject).

Provide your response as a JSON object matching this schema:
{
  "rating": "Working Towards" | "Achieved" | "Excellent / Exceeded",
  "matchedBenchmarks": ["string identifying 2-3 specific CfE benchmarks or skills demonstrated"],
  "feedback": "Friendly, encouraging feedback in Markdown format. Acknowledge what they did well, point out 1-2 constructive ways to improve, and suggest their 'Next Steps' to get a higher grade."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: systemPrompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text || "{}";
    const result = JSON.parse(responseText.trim());
    res.json(result);
  } catch (error: any) {
    console.error("Evaluation error:", error);
    res.status(500).json({ 
      error: "Could not perform evaluation. Please ensure your GEMINI_API_KEY is active in Settings.",
      details: error.message 
    });
  }
});

// 2. Folio generator / Brainstorm helper for pupils
app.post("/api/gemini/folio-helper", async (req, res) => {
  try {
    const { subject, brief, action } = req.body;
    
    if (!brief || !action || !subject) {
      return res.status(400).json({ error: "Missing required fields: subject, brief, action" });
    }

    const ai = getAiClient();
    
    let actionInstruction = "";
    if (action === "specification") {
      actionInstruction = "Generate 4-5 relevant Product Design Specification points covering Function, Aesthetics, Safety, Materials, and Ergonomics based on this brief.";
    } else if (action === "research_plan") {
      actionInstruction = "Outline a neat, simple Research Plan. Suggest who to interview, what existing products to analyze, and what sizes/ergonomics to measure.";
    } else if (action === "ideas") {
      actionInstruction = "Brainstorm 3 creative, distinctive design concepts. Describe their visual style, unique features, and how they solve the problem.";
    } else if (action === "materials") {
      actionInstruction = "Suggest suitable materials for making this (e.g. specific softwoods, hardwoods, manufactured boards, or plastics) and explain WHY they are appropriate for the environment it will be used in.";
    }

    const prompt = `You are a friendly D&T digital workshop helper for Scottish pupils aged 11-17.
Subject: ${subject}
The pupil is working on this design brief: "${brief}"
They have asked for help to: ${action}

Task: ${actionInstruction}

Format your response as markdown. Keep it engaging, split into digestible chunks with bold headings, and add quick "Top Tips" for drawing or modeling! Remember to mention Scottish workshop contexts where appropriate (e.g., craft rooms, safety, hand tools).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({ suggestions: response.text });
  } catch (error: any) {
    console.error("Folio helper error:", error);
    res.status(500).json({ 
      error: "Could not generate suggestions. Please check your AI API key.",
      details: error.message 
    });
  }
});

// 3. Teacher resource generator
app.post("/api/gemini/teacher-tool", async (req, res) => {
  try {
    const { subject, level, toolType, topic } = req.body;
    
    if (!subject || !level || !toolType || !topic) {
      return res.status(400).json({ error: "Missing required fields: subject, level, toolType, topic" });
    }

    const ai = getAiClient();
    
    let toolPrompt = "";
    if (toolType === "lesson_plan") {
      toolPrompt = "Write a complete 50-minute lesson plan including learning intentions (LI), success criteria (SC), introduction activity, main task, workshop safety reminder, and a plenary reflection.";
    } else if (toolType === "workshop_task") {
      toolPrompt = "Draft a student-friendly practical task sheet or design challenge, with step-by-step instructions, material list, tools required, and quality checkpoints.";
    } else if (toolType === "marking_rubric") {
      toolPrompt = "Create a structured marking rubric aligned to Scottish SQA National 4/5/Higher or CfE Benchmarks. Organize it into columns: 'Developing', 'Achieved', and 'Exceeded' across key skill areas.";
    } else if (toolType === "quiz_questions") {
      toolPrompt = "Generate 5 multiple-choice questions with answers and detailed explanations suitable for a retrieval quiz. Focus heavily on Scottish Curricular benchmarks.";
    }

    const prompt = `You are a Principal Teacher of Design and Technology in Scotland.
Generate an SQA and Curriculum for Excellence (CfE) aligned educational resource.

Subject Area: ${subject}
Level: ${level}
Topic / Focus: ${topic}
Resource Type: ${toolType}

Instructions:
${toolPrompt}

Format your output in professional, beautiful Markdown with clear headers, horizontal rules, and tables where applicable. Include standard Scottish education terminology (such as 'Learning Intentions', 'Success Criteria', 'CfE Benchmarks', 'Health and Safety').`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({ content: response.text });
  } catch (error: any) {
    console.error("Teacher generator error:", error);
    res.status(500).json({ 
      error: "Could not generate teacher resource. Please check your AI API key.",
      details: error.message 
    });
  }
});

// 4. Gemini Pro Woodwork 3D Blueprint & Advisor
app.post("/api/gemini/woodwork-advisor", async (req, res) => {
  try {
    const { jointName, jointId, userQuestion } = req.body;
    
    if (!jointName || !jointId) {
      return res.status(400).json({ error: "Missing jointName or jointId" });
    }

    const ai = getAiClient();
    
    const prompt = `You are "Gemini Pro", an advanced AI assistant integrated into "Blueprint" (Scottish CfE Design and Technology platform).
Your task is to provide expert 3D modeling advice, technical specifications, and hand-tool manufacturing steps for the woodworking joint: "${jointName}" (${jointId}).

User custom query: "${userQuestion || "Describe how to model this joint in 3D, and list the exact SQA marking, cutting and tolerance parameters."}"

Provide a detailed, professional response formatted in clean Markdown. Structure it with:
1. **3D Coordinate & CAD Blueprint Design**: Explain the optimal virtual 3D bounding box dimensions, the cutting/rebating planes (e.g. cutting half-depth at 50% width), and how Parts A and Part B fit together mathematically.
2. **Precision Marking & Scribing**: Detail how a pupil should mark out the joint in a physical workshop with tolerances of ±1.0mm (using Try Square, Marking Gauge, Marking Knife).
3. **SQA Workshop Manufacturing Sequence**: Step-by-step hand tool guide (Tenon saw, Bevel-edged Chisel, Mallet, and final dressing).
4. **Teacher Quality Checkpoint**: What specific details the SQA examiner looks for to award maximum marks (e.g., flush shoulders, no tear-out, tight joints).

Keep the tone encouraging, technical, and aligned to Curriculum for Excellence standards. Use friendly headings, bullet points, and highlight key terms.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({ advice: response.text });
  } catch (error: any) {
    console.error("Woodwork advisor error:", error);
    res.status(500).json({ 
      error: "Could not generate woodwork advice. Please check your AI API key.",
      details: error.message 
    });
  }
});

// Vite middleware setup for Development, static serving for Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Blueprint Server] Running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

if (process.env.NETLIFY !== "true") {
  startServer();
}

export { app };
