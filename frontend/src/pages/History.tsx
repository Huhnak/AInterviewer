import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { InterviewStatus, type Interview } from "../types/interview";
import { getInterviews, startInterview } from "../api/interviewApi";
import Card from "../components/Card";
import { useThemeStore } from "../store/themeStore";

// const interviews = [
//   {
//     id: 1,
//     title: "Frontend React Interview",
//     date: "12.06.2026",
//     score: 87,
//     status: "completed",
//   },
//   {
//     id: 2,
//     title: "ASP.NET Backend Interview",
//     date: "11.06.2026",
//     score: null,
//     status: "in-progress",
//   },
//   {
//     id: 3,
//     title: "PostgreSQL Interview",
//     date: "09.06.2026",
//     score: null,
//     status: "failed",
//   },
// ];

export default function History() {
    const navigate = useNavigate();

    const [interviews, setInterviews] = useState<Interview[] | null>(null);
    const [isLoading, setIsloading] = useState(true);
    const { isDarkMode } = useThemeStore();

    const handleStartClick = async (interviewId: string) => {
        await startInterview(interviewId);
        navigate(`/interview/${interviewId}`);
    };
    const getScoreColor = (score: number): string => {
        switch (true) {
            case score < 20:
                return "text-[#D14648]";
            case score < 50:
                return "text-[#D16A1E]";
            case score < 80:
                return "text-[#CFD119]";
            default:
                return "text-[#68D119]";
        }
    };

    useEffect(() => {
        (async () => {
            setIsloading(true);
            try {
                setInterviews(
                    (await getInterviews())
                        .sort((i) => new Date(i.createdAt).getDate())
                        .reverse(),
                );
            } catch (err) {
                console.log(err);
            } finally {
                setIsloading(false);
            }
        })();
    }, []);
    return (
        <div className="mx-auto max-w-7xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold">Interview History</h1>

                <p className="text-muted mt-2">История ваших интервью</p>
            </div>

            {isLoading ? (
                <Card>Загрузка...</Card>
            ) : (
                <div className="space-y-4">
                    {interviews?.map((interview) => (
                        <div
                            key={interview.id}
                            className="bg-card/60 hover:border-primary/40 rounded-3xl border border-white/10 p-6 backdrop-blur-xl transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold">
                                        {interview.name}
                                    </h3>

                                    <p className="text-muted mt-1">
                                        {new Date(
                                            interview.createdAt,
                                        ).toLocaleDateString()}{" "}
                                        {new Date(
                                            interview.createdAt,
                                        ).toLocaleTimeString()}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    {interview.status ===
                                        InterviewStatus.Completed && (
                                        <div className="bg-success/20 text-success flex items-center gap-2 rounded-xl px-4 py-2">
                                            <CheckCircle2 size={18} />
                                            Завершен
                                        </div>
                                    )}

                                    {interview.status ===
                                        InterviewStatus.InProgress && (
                                        <div className="bg-warning/20 text-warning flex items-center gap-2 rounded-xl px-4 py-2">
                                            <Clock3 size={18} />В процессе
                                        </div>
                                    )}

                                    {interview.status ===
                                        InterviewStatus.NotStarted && (
                                        <div className="bg-danger/20 text-danger flex items-center gap-2 rounded-xl px-4 py-2">
                                            <XCircle size={18} />
                                            Не начат
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <div>
                                    <span className="text-3xl font-bold">
                                        {interview.categoryName}
                                    </span>
                                    {interview.score !== null && (
                                        <span className="text-3xl font-bold">
                                            Оценка:{" "}
                                            <span
                                                className={`${getScoreColor(interview.score)} text-3xl font-bold`}
                                            >
                                                {interview.score} / 100
                                            </span>
                                        </span>
                                    )}
                                </div>

                                {interview.status ===
                                    InterviewStatus.Completed && (
                                    <Link
                                        to={`/result/${interview.id}`}
                                        className={`${isDarkMode ? "bg-primary" : "bg-background"} hover:bg-secondary cursor-pointer rounded-2xl px-5 py-3 transition`}
                                    >
                                        Детали
                                    </Link>
                                )}
                                {interview.status ===
                                    InterviewStatus.InProgress && (
                                    <Link
                                        to={`/interview/${interview.id}`}
                                        className={`${isDarkMode ? "bg-primary" : "bg-background"} hover:bg-secondary cursor-pointer rounded-2xl px-5 py-3 transition`}
                                    >
                                        Продолжить
                                    </Link>
                                )}
                                {interview.status ===
                                    InterviewStatus.NotStarted && (
                                    <div
                                        onClick={() => {
                                            handleStartClick(interview.id);
                                        }}
                                        className={`${isDarkMode ? "bg-primary" : "bg-background"} hover:bg-secondary cursor-pointer rounded-2xl px-5 py-3 transition`}
                                    >
                                        Начать
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
