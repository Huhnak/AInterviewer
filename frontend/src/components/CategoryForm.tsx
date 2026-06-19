import { Plus, Save } from "lucide-react";

interface CategoryFormProps {
    name: string;
    description: string;
    isEditing: boolean;

    onNameChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onSubmit: () => void;
}

export default function CategoryForm({
    name,
    description,
    isEditing,
    onNameChange,
    onDescriptionChange,
    onSubmit,
}: CategoryFormProps) {
    return (
        <div className="bg-card/60 rounded-3xl border border-white/10 p-8 backdrop-blur-xl">
            <div className="space-y-4">
                <div>
                    <label className="text-muted mb-2 block text-sm">
                        Название категории
                    </label>

                    <input
                        value={name}
                        onChange={(e) => onNameChange(e.target.value)}
                        placeholder="Например: React"
                        className="bg-surface focus:border-primary w-full rounded-2xl border border-white/10 px-4 py-3 outline-none"
                    />
                </div>

                <div>
                    <label className="text-muted mb-2 block text-sm">
                        Описание
                    </label>

                    <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => onDescriptionChange(e.target.value)}
                        placeholder="Описание категории..."
                        className="bg-surface focus:border-primary w-full resize-none rounded-2xl border border-white/10 px-4 py-3 outline-none"
                    />
                </div>

                <button
                    onClick={onSubmit}
                    className="from-primary to-secondary flex items-center gap-2 rounded-2xl bg-gradient-to-r px-6 py-3 font-medium transition hover:scale-105"
                >
                    {isEditing ? (
                        <>
                            <Save size={18} />
                            Сохранить
                        </>
                    ) : (
                        <>
                            <Plus size={18} />
                            Создать категорию
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
