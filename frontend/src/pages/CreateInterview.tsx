import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    generateInterview,
    getCategories,
    startInterview,
} from "../api/interviewApi";
import type { Category } from "../types/interview";
import { useThemeStore } from "../store/themeStore";
import ValuePickerSlider from "../components/ValuePickerSlider";

function CreateInterview() {
    const navigate = useNavigate();
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [isStartingInterview, setIsStartingInterview] = useState(false);
    const [categoryName, setCategoryName] = useState<string>();
    const [categories, setCategories] = useState<Category[] | null>(null);
    const { isDarkMode } = useThemeStore();

    const [difficulty, setDifficulty] = useState(10);

    useEffect(() => {
        getCategories().then((res) => {
            res = res.filter((r) => r.isActive === true);
            setCategories(res);
            setCategoryName(res.at(0)?.name);
            setIsLoadingCategories(false);
        });
    }, []);

    const createInterview = async () => {
        const interviewId = await generateInterview(
            categoryName ?? "",
            difficulty * 10,
        );
        setIsStartingInterview(true);
        await startInterview(interviewId);
        navigate(`/interview/${interviewId}`);
    };

    return (
        <div className="mx-auto max-w-3xl py-12">
            <div className="bg-card/60 rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-xl">
                <div className="mb-8">
                    <h1 className="mb-2 text-4xl font-bold">
                        Создать интервью
                    </h1>

                    <p className="text-muted">
                        Выберите направление, по которому AI будет проводить
                        собеседование.
                    </p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="text-muted mb-2 block text-sm font-medium">
                            Направление
                        </label>
                        <select
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            disabled={
                                isLoadingCategories || isStartingInterview
                            }
                            className={`${(isLoadingCategories || isStartingInterview) && "opacity-50"} bg-surface focus:border-primary focus:ring-primary/30 w-full rounded-2xl border border-white/10 px-4 py-4 transition-all outline-none focus:ring-2`}
                        >
                            {categories?.map((c) => (
                                <option key={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    {categoryName != "" && (
                        <div className="rounded-2xl bg-black/20 p-4">
                            <label className="text-muted mb-2 block text-sm font-medium">
                                Описание собеседования
                            </label>

                            <div className="bg-surface focus:border-primary w-full rounded-2xl border border-white/10 px-4 py-3 outline-none">
                                {
                                    categories?.find(
                                        (c) => c.name === categoryName,
                                    )?.description
                                }
                            </div>
                        </div>
                    )}
                    <div>
                        <ValuePickerSlider
                            min={1}
                            max={10}
                            step={1}
                            label="Сложность собеседования"
                            value={difficulty}
                            onChange={setDifficulty}
                        />
                    </div>

                    <button
                        onClick={createInterview}
                        disabled={isLoadingCategories || isStartingInterview}
                        className={`${(isLoadingCategories || isStartingInterview) && "cursor-default opacity-50 hover:scale-[1]"} ${isDarkMode ? "bg-primary" : "bg-background"} hover:shadow-primary/30 w-full rounded-2xl bg-gradient-to-r py-4 font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
                    >
                        {isStartingInterview
                            ? "Интервью начинается..."
                            : "Начать интервью"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateInterview;
