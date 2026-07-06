export type CoreSubject = "woodwork" | "design" | "graphics" | "bge";

export type TargetGroup = "pupil" | "teacher";

export interface JointInfo {
  id: string;
  name: string;
  type: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  pros: string[];
  cons: string[];
  commonUses: string;
  toolsNeeded: string[];
  steps: string[];
}

export interface WoodInfo {
  id: string;
  name: string;
  category: "Hardwood" | "Softwood" | "Manufactured Board";
  properties: string;
  uses: string;
  sustainability: string;
}

export interface DesignFactor {
  id: string;
  name: string;
  question: string;
  description: string;
  examples: string[];
  tips: string;
}

export interface DtpTerm {
  id: string;
  name: string;
  definition: string;
  purpose: string;
  tip: string;
}

export interface LineStandard {
  id: string;
  name: string;
  appearance: string; // Describe style: Solid, Hidden, Chain, etc.
  use: string;
  industryName: string; // BSI reference
}

export interface QuizQuestion {
  id: string;
  subject: CoreSubject;
  level: "BGE" | "National 4" | "National 5" | "Higher";
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface SafetySign {
  id: string;
  title: string;
  category: "Prohibition" | "Mandatory" | "Warning" | "Safe Condition";
  description: string;
  color: string;
  symbol: string;
}
