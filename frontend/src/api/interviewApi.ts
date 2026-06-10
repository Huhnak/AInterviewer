import api from "./axios";
import type {
    QuestionResponse,
    InterviewResult,
    Interview
} from "../types/interview";

export const getQuestion = async (
    interviewId: string
): Promise<QuestionResponse> => {
    const response = await api.get(
        `/api/interview/${interviewId}/current-question`
    );
    return response.data;
};

export const submitAnswer = async (
    interviewId: string,
    questionId: string,
    answer: string
) => {
    await api.post(
        `/api/interview/${interviewId}/submit-answer`,
        {
            questionId,
            answer
        }
    );
};

export const getResult = async (
    interviewId: string
): Promise<InterviewResult> => {
    const response = await api.get(
        `/api/interview/${interviewId}/result`
    );

    return response.data;
};

export const startInterview = async (
    interviewId: string
) => {
    await api.post(`/api/interview/${interviewId}/start`);
};
export const generateInterview = async (
    categoryName: string,
    difficultyLevel: number): Promise<string> => {
    const createResponse = await api.post(
        "/api/interview/create",
        {
            categoryName,
            difficultyLevel,
        }
    );
    return createResponse.data;
};

export const getInterviewById = async (
    interviewId: string): Promise<Interview> => {
    const response = await api.get(
        `/api/interview/${interviewId}`
    );
    return response.data;
};
export const finishInterview = async (
    interviewId: string) => {
    await api.post(`/api/interview/${interviewId}/finish`);
};
export const getInterviewResults = async (
    interviewId: string): Promise<InterviewResult> => {
    const response = await api.get(`/api/interview/${interviewId}/result`);
    return response.data;
};