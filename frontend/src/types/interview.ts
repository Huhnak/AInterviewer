export interface Interview {
  id: string;
  name: string;
  categoryName: string;
  difficultyLevel: number;
  createdAt: string;
  status: InterviewStatus;
  score: number;
  currentQuestionIndex: number;
  maxQuestions: number;
}
export const InterviewStatus = {
  InProgress: "InProgress",
  Completed: "Completed",
  NotStarted: "NotStarted"
} as const;
export type InterviewStatus = typeof InterviewStatus[keyof typeof InterviewStatus];
export interface QuestionResponse {
  id: string;
  type: string;
  topic: string;
  content: string;
  difficulty: number;
  orderIndex: number;
}

export interface SubmitAnswerRequest {
  answer: string;
}

export interface InterviewResult {
    id: string;
    interviewId: string;
    totalScore: number;
    correctAnswers: number;
    totalAnswers: number;
    level: string;
    strengths: string;
    weaknesses: string;
    recomendations: string;
}
export interface Category{
    id: string;
    name: string;
    description: string;
    interviewPrompt: string;
    evaluationPrompt: string;
    defaultDifficulty: number;
    maxQuestions: number;
    isActive: boolean;
    createdAt: Date
}