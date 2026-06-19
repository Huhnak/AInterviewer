import { AlertTriangle } from "lucide-react";

interface DeleteModalProps {
    isOpen: boolean;
    title?: string;

    onConfirm: () => void;
    onCancel: () => void;
}

export default function DeleteModal({
    isOpen,
    title = "Вы уверены?",
    onConfirm,
    onCancel,
}: DeleteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-card w-full max-w-md rounded-3xl border border-white/10 p-6 shadow-2xl">
                <div className="mb-4 flex items-center gap-3">
                    <div className="bg-danger/20 text-danger flex h-12 w-12 items-center justify-center rounded-full">
                        <AlertTriangle />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">Удаление</h2>

                        <p className="text-muted text-sm">
                            Это действие нельзя отменить
                        </p>
                    </div>
                </div>

                <p className="mb-6">{title}</p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="rounded-xl border border-white/10 px-5 py-2 transition hover:bg-white/5"
                    >
                        Отмена
                    </button>

                    <button
                        onClick={onConfirm}
                        className="bg-danger rounded-xl px-5 py-2 transition hover:opacity-90"
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
}
