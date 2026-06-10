export interface Interview {
  id: string;
  name: string;
  categoryName: string;
  difficultyLevel: number;
  status: string;
  score: number;
  currentQuestionIndex: number;
  maxQuestions: number;
}

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