import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatMessage from "../components/ChatMessage";
import type { ChatMessage as Message } from "../types/chat";

import {
    finishInterview,
    getInterviewById,
    getQuestion,
    submitAnswer
} from "../api/interviewApi";

export default function Interview() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [messages, setMessages] =
        useState<Message[]>([]);

    const [answer, setAnswer] =
        useState("");
    const [maxQuestions, setMaxQuestions] =
        useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] =
        useState(0);
    const [questionId, setQuestionId] = useState<string>("");

    const loadQuestion = async () => {
        if (!id) return;

        const interview = await getInterviewById(id);
        setMaxQuestions(interview.maxQuestions);
        setCurrentQuestionIndex(interview.currentQuestionIndex);

        const question =
            await getQuestion(id);
        console.log(question);

        setQuestionId(question.id);

        setMessages(prev => [
            ...prev,
            {
                id: crypto.randomUUID(),
                role: "assistant",
                content: question.content,
                createdAt:
                    new Date().toISOString()
            }
        ]);
    };

    useEffect(() => {
        loadQuestion();
    }, []);

    const handleSend = async () => {
        if (!id || !answer.trim()) return;

        const currentAnswer = answer;
        setMessages(prev => [
            ...prev,
            {
                id: crypto.randomUUID(),
                role: "user",
                content: currentAnswer,
                createdAt:
                    new Date().toISOString()
            }
        ]);

        setAnswer("");

        await submitAnswer(
            id,
            questionId,
            currentAnswer
        ).catch(err => {
            console.log(err);
        });
        if (currentQuestionIndex >= maxQuestions) {
            await finishInterview(id);
            navigate(`/result/${id}`);
            return;
        }
        await loadQuestion();
    };

    return (
        <div className="h-screen flex flex-col">
            <div className="text-lg font-semibold p-4">
                {maxQuestions > 0 ? `Вопрос ${currentQuestionIndex} из ${maxQuestions}` : ""}
            </div>
            <div
                className="
        flex-1
        overflow-y-auto
        p-6
        bg-gray-50
      "
            >
                {messages.map(msg => (
                    <ChatMessage
                        key={msg.id}
                        message={msg}
                    />
                ))}
            </div>

            <div
                className="
        border-t
        p-4
        flex
        gap-2
      "
            >
                <textarea
                    value={answer}
                    onChange={(e) =>
                        setAnswer(e.target.value)
                    }
                    className="
            flex-1
            border
            rounded-lg
            p-3
          "
                    placeholder="Введите ответ..."
                />

                <button
                    onClick={handleSend}
                    className="
            bg-black
            text-white
            px-6
            rounded-lg
          "
                >
                    Отправить
                </button>
            </div>
        </div>
    );
}