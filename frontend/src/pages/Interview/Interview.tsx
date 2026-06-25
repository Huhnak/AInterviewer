import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatMessage from "../../components/ChatMessage";
import type { ChatMessage as Message } from "../../types/chat";
import { Maximize2, Minimize2, SendHorizonal } from "lucide-react";
import "./Interview.css";

import {
    finishInterview,
    getInterviewById,
    getQuestion,
    submitAnswer,
} from "../../api/interviewApi";
import { InterviewStatus } from "../../types/interview";

export default function Interview() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [messages, setMessages] = useState<Message[]>([]);
    const finishLock = useRef(false);
    const [isFinishing, setIsFinishing] = useState(false);
    const [isChatMaximized, setIsChatMaximized] = useState(false);

    const [answer, setAnswer] = useState("");
    const [maxQuestions, setMaxQuestions] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [finishTime, setFinishTime] = useState<Date | null>(null);
    const [questionId, setQuestionId] = useState<string>("");

    const handleFinishInterview = async () => {
        if (finishLock.current) return;
        finishLock.current = true;
        setIsFinishing(true);
        try {
            await finishInterview(id!);
            navigate(`/result/${id}`);
        } catch (err) {
            finishLock.current = false;
            setIsFinishing(false);
            console.log(err);
        }
    };
    const toggleMaximized = () => {
        setIsChatMaximized((prev) => !prev);
    };
    const isInterviewTimeOut = (): boolean =>
        finishTime !== null && finishTime < new Date();
    const loadQuestion = async () => {
        if (!id) return;
        const interview = await getInterviewById(id);
        if (interview.status === InterviewStatus.Completed)
            navigate(`/result/${id}`);
        setMaxQuestions(interview.maxQuestions);
        setCurrentQuestionIndex(interview.currentQuestionIndex);

        // TODO: specify time
        setFinishTime(
            new Date(
                new Date(interview.createdAt.replace(" ", "T")).getTime() +
                    30 * 60000,
            ),
        );

        const question = await getQuestion(id);

        setQuestionId(question.id);

        setMessages((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                role: "assistant",
                content: question.content,
                createdAt: new Date().toISOString(),
            },
        ]);
    };
    const handleSend = async () => {
        if (!id || !answer.trim()) return;

        const currentAnswer = answer;
        setMessages((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                role: "user",
                content: currentAnswer,
                createdAt: new Date().toISOString(),
            },
        ]);

        setAnswer("");
        if (currentQuestionIndex === maxQuestions) {
            await handleFinishInterview();
            return;
        }
        if (isInterviewTimeOut()) {
            await handleFinishInterview();
            return;
        }
        await submitAnswer(id, questionId, currentAnswer).catch((err) => {
            console.log(err);
        });

        await loadQuestion();
    };

    useEffect(() => {
        (async () => {
            await loadQuestion();
            if (maxQuestions !== 0) {
                if (currentQuestionIndex === maxQuestions) {
                    await handleFinishInterview();
                }
            }
            if (isInterviewTimeOut()) {
                await handleFinishInterview();
            }
        })();
    }, []);

    useEffect(() => {
        if (!finishTime) return;
        const ms = finishTime.getTime() - Date.now();
        if (ms <= 0) {
            handleFinishInterview();
            return;
        }
        const timeoutId = setTimeout(() => {
            handleFinishInterview();
        }, ms);
        return () => clearTimeout(timeoutId);
    }, [finishTime]);

    return (
        <div className="flex h-[calc(100vh-65px-48px)] flex-col py-0">
            <div className="flex h-16 shrink-0 items-center justify-between rounded-2xl bg-black/20 px-6 backdrop-blur-xl">
                <h1 className="text-lg font-semibold">Собеседование</h1>

                {maxQuestions > 0 && (
                    <div className="text-muted">
                        Вопрос {currentQuestionIndex} из {maxQuestions}
                    </div>
                )}
            </div>

            <div className="scrollbar-track-primary/30 scrollbar-thumb-secondary flex-1 scrollbar-thin overflow-y-auto px-6 py-8">
                <div className="mx-auto max-w-4xl space-y-6">
                    {messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}
                </div>
            </div>

            <div className="scrollbar-track-0 scrollbar-thumb-secondary shrink-0 scrollbar-thin overflow-y-auto rounded-2xl bg-black/20 p-4 backdrop-blur-xl">
                <div className="mx-auto flex max-w-4xl gap-3">
                    {isChatMaximized ? (
                        <Minimize2
                            onClick={toggleMaximized}
                            className="cursor-pointer duration-300 ease-in-out hover:scale-115 hover:opacity-60"
                        />
                    ) : (
                        <Maximize2
                            onClick={toggleMaximized}
                            className="cursor-pointer duration-300 ease-in-out hover:scale-115 hover:opacity-60"
                        />
                    )}
                    <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        rows={3}
                        placeholder="Введите ответ..."
                        id="chatTextArea"
                        className={`bg-card focus:border-primary flex-1 resize-none rounded-2xl border border-white/10 px-4 py-3 transition-all duration-300 ease-in-out outline-none ${isChatMaximized ? "h-130" : "h-28"} `}
                    />

                    <div className="flex flex-wrap items-end">
                        <button
                            onClick={handleSend}
                            disabled={isFinishing}
                            className="from-primary to-secondary h-12 rounded-4xl bg-linear-to-r px-3 font-medium transition-all hover:scale-105 disabled:opacity-50"
                        >
                            <SendHorizonal />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
