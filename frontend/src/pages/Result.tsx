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
        <div className="max-w-4xl mx-auto p-8">

            <h1 className="text-4xl mb-4">
                {result.totalScore}/100
            </h1>
            <div className="text-2xl mb-4">{result.correctAnswers}/{result.totalAnswers} правильных ответов</div>
            <div className="text-2xl mb-4">Общий уровень: {result.level}</div>
            <div className="text-2xl mb-4">{result.strengths !==""
                ? `Сильные стороны: ${result.strengths}`
                : ""}</div>
            <div className="text-2xl mb-4">{result.weaknesses !==""
                ? `Слабые стороны: ${result.weaknesses}`
                : ""}</div>
            <div className="text-2xl mb-4">Рекомендации: {result.recomendations}</div>

        </div>
    );
}

export default Result;