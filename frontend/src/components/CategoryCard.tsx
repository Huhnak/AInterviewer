import { Pencil, Trash2 } from "lucide-react";
import type { CategoryDto } from "../types/category";

export default function CategoryCard({
    category,
    onEdit,
    onDelete,
}: {
    category: CategoryDto;
    onEdit: (category: CategoryDto) => void;
    onDelete: (id: string) => void;
}) {
    return (
        <div className="bg-card/60 hover:border-primary/40 rounded-3xl border border-white/10 p-6 backdrop-blur-xl transition-all">
            <div className="flex justify-between">
                <div>
                    <h3 className="text-xl font-semibold">{category.name}</h3>

                    <p className="text-muted mt-2">{category.description}</p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(category)}
                        className="text-text rounded-xl bg-black/20 p-3 transition hover:scale-105"
                    >
                        <Pencil size={18} />
                    </button>

                    <button
                        onClick={() => onDelete(category.id)}
                        className="bg-danger/20 text-danger rounded-xl p-3 transition hover:scale-105"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
