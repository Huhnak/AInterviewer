import { useEffect, useState } from "react";

import { Plus, Save, RotateCcw } from "lucide-react";

import {
    createCategory,
    updateCategory,
    deleteCategory,
} from "../api/adminApi";
import { getCategories } from "../api/interviewApi";
import CategoryCard from "../components/CategoryCard";
import type { CategoryDto } from "../types/category";
import DeleteModal from "../components/DeleteModal";

export default function AdminPanel() {
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [interviewPrompt, setInterviewPrompt] = useState("");
    const [evaluationPrompt, setEvaluationPrompt] = useState("");
    const [defaultDifficulty, setDefaultDifficulty] = useState(5);
    const [maxQuestions, setMaxQuestions] = useState(10);
    const [isActive, setIsActive] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const resetForm = () => {
        setEditingId(null);

        setName("");
        setDescription("");

        setInterviewPrompt("");
        setEvaluationPrompt("");

        setDefaultDifficulty(5);
        setMaxQuestions(10);

        setIsActive(true);
    };

    const handleSave = async () => {
        try {
            if (editingId) {
                const updated = await updateCategory({
                    id: editingId,
                    name,
                    description,
                    interviewPrompt,
                    evaluationPrompt,
                    defaultDifficulty,
                    maxQuestions,
                    isActive,
                });

                setCategories((prev) =>
                    prev.map((c) => (c.id === updated.id ? updated : c)),
                );
            } else {
                const created = await createCategory({
                    name,
                    description,
                    interviewPrompt,
                    evaluationPrompt,
                    defaultDifficulty,
                    maxQuestions,
                    isActive,
                });

                setCategories((prev) => [created, ...prev]);
            }
            resetForm();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (category: CategoryDto) => {
        setEditingId(category.id);
        setName(category.name);
        setDescription(category.description);
        setInterviewPrompt(category.interviewPrompt);
        setEvaluationPrompt(category.evaluationPrompt);
        setDefaultDifficulty(category.defaultDifficulty);
        setMaxQuestions(category.maxQuestions);
        setIsActive(category.isActive);
    };

    const handleDelete = async (id: string) => {
        await deleteCategory(id);

        setCategories((prev) => prev.filter((x) => x.id !== id));
    };
    useEffect(() => {
        (async () => {
            setCategories(await getCategories());
        })();
    }, []);
    return (
        <div className="mx-auto max-w-6xl py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold">Управление категориями</h1>

                <p className="text-muted mt-2">
                    Создание и редактирование категорий интервью
                </p>
            </div>

            <div className="bg-card/60 mb-8 rounded-3xl border border-white/10 p-8 backdrop-blur-xl">
                <div className="space-y-4">
                    <div className="rounded-2xl bg-black/20 p-4">
                        <label className="text-muted mb-2 block text-sm font-medium">
                            Название категории
                        </label>

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Название категории"
                            className="bg-surface focus:border-primary w-full rounded-2xl border border-white/10 px-4 py-3 outline-none"
                        />
                    </div>

                    <div className="rounded-2xl bg-black/20 p-4">
                        <label className="text-muted mb-2 block text-sm font-medium">
                            Описание
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Описание"
                            rows={4}
                            className="bg-surface focus:border-primary w-full rounded-2xl border border-white/10 px-4 py-3 outline-none"
                        />
                    </div>

                    <div className="rounded-2xl bg-black/20 p-4">
                        <label className="text-muted mb-2 block text-sm font-medium">
                            Промпт для старта собеседования
                        </label>

                        <textarea
                            value={interviewPrompt}
                            onChange={(e) => setInterviewPrompt(e.target.value)}
                            placeholder="Промпт для старта собеседования"
                            rows={12}
                            className="bg-surface focus:border-primary w-full rounded-2xl border border-white/10 px-4 py-3 outline-none"
                        />
                    </div>
                    <div className="rounded-2xl bg-black/20 p-4">
                        <label className="text-muted mb-2 block text-sm font-medium">
                            Промпт для оценки собеседования
                        </label>

                        <textarea
                            value={evaluationPrompt}
                            onChange={(e) =>
                                setEvaluationPrompt(e.target.value)
                            }
                            rows={12}
                            className="bg-surface focus:border-primary w-full rounded-2xl border border-white/10 px-4 py-3 outline-none"
                        />
                    </div>

                    <div className="w-100 rounded-2xl bg-black/20 p-4">
                        <label className="text-muted mb-2 block text-sm font-medium">
                            Сложность по умолчанию
                        </label>

                        <input
                            type="number"
                            value={defaultDifficulty}
                            onChange={(e) =>
                                setDefaultDifficulty(e.target.valueAsNumber)
                            }
                            className="bg-surface focus:border-primary w-full rounded-2xl border border-white/10 px-4 py-3 transition outline-none"
                        />
                    </div>
                    <div className="w-100 rounded-2xl bg-black/20 p-4">
                        <label className="text-muted mb-2 block text-sm font-medium">
                            Количество вопросов
                        </label>

                        <input
                            type="number"
                            value={maxQuestions}
                            onChange={(e) =>
                                setMaxQuestions(e.target.valueAsNumber)
                            }
                            className="bg-surface focus:border-primary w-full rounded-2xl border border-white/10 px-4 py-3 transition outline-none"
                        />
                    </div>
                    <div className="flex w-100 items-center justify-between rounded-2xl bg-black/20 px-4 py-4">
                        <span className="text-muted font-medium">
                            Отображать у пользователей
                        </span>

                        <label className="relative inline-flex cursor-pointer items-center">
                            <input
                                type="checkbox"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                                className="peer sr-only"
                            />

                            <div className="peer-checked:bg-primary h-7 w-12 rounded-full bg-white/10 transition-all after:absolute after:top-1 after:left-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5" />
                        </label>
                    </div>
                    <button
                        onClick={handleSave}
                        className="text-text flex items-center gap-2 rounded-2xl bg-gradient-to-r from-black/10 to-black/20 px-6 py-3 transition hover:scale-105"
                    >
                        {editingId ? (
                            <>
                                <Save size={18} />
                                Сохранить
                            </>
                        ) : (
                            <>
                                <Plus size={18} />
                                Создать
                            </>
                        )}
                    </button>
                    <button
                        onClick={resetForm}
                        className="text-text flex items-center gap-2 rounded-2xl bg-gradient-to-r from-black/10 to-black/20 px-6 py-3 transition hover:scale-105"
                    >
                        <RotateCcw size={18} />
                        Сбросить
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                        onEdit={handleEdit}
                        onDelete={(categoryId) => {
                            setDeleteId(categoryId);
                        }}
                    />
                ))}
            </div>
            <DeleteModal
                isOpen={deleteId !== null}
                title="Удалить эту категорию?"
                onCancel={() => setDeleteId(null)}
                onConfirm={async () => {
                    if (!deleteId) return;

                    await handleDelete(deleteId);

                    setDeleteId(null);
                }}
            />
        </div>
    );
}
