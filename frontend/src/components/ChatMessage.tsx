import type { ChatMessage as Message } from "../types/chat";
import { motion } from "framer-motion";

interface Props {
    message: Message;
}

export default function ChatMessage({ message }: Props) {
    const isUser = message.role === "user";

    // return (
    //     <div
    //         className={`mb-6 flex gap-3 ${
    //             isUser ? "justify-end" : "justify-start"
    //         }`}
    //     >
    //         {!isUser && (
    //             <div className="from-primary to-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r font-bold">
    //                 AI
    //             </div>
    //         )}

    //         <div
    //             className={`max-w-[75%] rounded-3xl px-5 py-4 leading-relaxed ${
    //                 isUser
    //                     ? `bg-primary rounded-br-md text-white`
    //                     : `bg-card rounded-bl-md border border-white/10`
    //             } `}
    //         >
    //             {message.content}
    //         </div>

    //         {isUser && (
    //             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-700 font-bold">
    //                 U
    //             </div>
    //         )}
    //     </div>
    // );

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`mb-6 flex ${isUser ? "justify-end" : "justify-start"}`}
        >
            <div
                className={`max-w-[75%] rounded-tl-4xl rounded-tr-4xl px-5 py-4 shadow-lg ${
                    isUser
                        ? "bg-card rounded-bl-4xl border border-white/10"
                        : "bg-card rounded-br-4xl border border-white/10"
                }`}
                style={{ whiteSpace: "pre-line" }}
            >
                {message.content}
            </div>
        </motion.div>
    );
}
