import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInterviewResults } from "../api/interviewApi";
import type { InterviewResult } from "../types/interview";

function Result() {
    const { id } = useParams();

    const [result, setResult] = useState<InterviewResult>();

    useEffect(() => {
        getInterviewResults(id!).then(setResult);
    }, []);

    if (!result) return <div>Loading...</div>;

   return (
  <div className="max-w-5xl mx-auto py-8">
    <div
      className="
      bg-card/60
      backdrop-blur-xl
      border border-white/10
      rounded-3xl
      p-8
      shadow-2xl
      "
    >
      <div className="text-center mb-10">
        <h1
          className="
          text-7xl
          font-bold
          bg-gradient-to-r
          from-primary
          to-secondary
          bg-clip-text
          text-transparent
          "
        >
          {result.totalScore}
        </h1>

        <p className="text-muted text-lg mt-2">
          Итоговый балл из 100
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div
          className="
          bg-surface
          rounded-2xl
          p-6
          border border-white/10
          "
        >
          <p className="text-muted mb-2">
            Правильных ответов
          </p>

          <h2 className="text-3xl font-bold">
            {result.correctAnswers}/{result.totalAnswers}
          </h2>
        </div>

        <div
          className="
          bg-surface
          rounded-2xl
          p-6
          border border-white/10
          "
        >
          <p className="text-muted mb-2">
            Уровень знаний
          </p>

          <h2 className="text-3xl font-bold">
            {result.level}
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {result.strengths && (
          <div
            className="
            bg-success/10
            border border-success/20
            rounded-2xl
            p-6
            "
          >
            <h3 className="text-success text-xl font-semibold mb-3">
              Сильные стороны
            </h3>

            <p className="text-muted leading-relaxed">
              {result.strengths}
            </p>
          </div>
        )}

        {result.weaknesses && (
          <div
            className="
            bg-danger/10
            border border-danger/20
            rounded-2xl
            p-6
            "
          >
            <h3 className="text-danger text-xl font-semibold mb-3">
              Слабые стороны
            </h3>

            <p className="text-muted leading-relaxed">
              {result.weaknesses}
            </p>
          </div>
        )}
      </div>

      <div
        className="
        mt-6
        bg-primary/10
        border border-primary/20
        rounded-2xl
        p-6
        "
      >
        <h3 className="text-primary text-xl font-semibold mb-3">
          Рекомендации
        </h3>

        <p className="text-muted leading-relaxed">
          {result.recomendations}
        </p>
      </div>
    </div>
  </div>
);
}

export default Result;