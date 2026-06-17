import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { InterviewStatus, type Interview } from "../types/interview";
import { getInterviews } from "../api/interviewApi";

function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [interviews, setInterviews] = useState<Interview[] | null>(null);
    const averageScore = interviews?.length
        ? Math.trunc(
              interviews.reduce((sum, val) => sum + val.score, 0) /
                  interviews.length,
          )
        : 0;
    const completedCount = interviews?.length
        ? interviews.filter((i) => i.status === InterviewStatus.Completed)
              .length
        : 0;
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                setInterviews(await getInterviews());
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
            console.log(interviews);
        })();
    }, []);
    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold">Главная</h1>

                    <p className="text-muted mt-2">
                        Добро пожаловать в AInterviewer
                    </p>
                </div>

                {/* <Link
                    to="/create"
                    className="from-primary to-secondary rounded-2xl bg-linear-to-r px-5 py-3 font-medium"
                >
                    New Interview
                </Link> */}
            </div>

            {isLoading ? (
                <div>Загрузка...</div>
            ) : (
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="bg-card rounded-3xl border border-white/10 p-6">
                        <h3 className="text-muted mb-2">Всего интервью:</h3>

                        <p className="text-4xl font-bold">
                            {interviews?.length}
                        </p>
                    </div>
                    <div className="bg-card rounded-3xl border border-white/10 p-6">
                        <h3 className="text-muted mb-2">Завершено интервью:</h3>

                        <p className="text-4xl font-bold">{completedCount}</p>
                    </div>
                    <div className="bg-card rounded-3xl border border-white/10 p-6">
                        <h3 className="text-muted mb-2">Средний балл</h3>

                        <p className="text-4xl font-bold">{averageScore}/100</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
