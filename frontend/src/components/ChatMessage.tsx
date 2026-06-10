import type { ChatMessage as Message } from "../types/chat";

interface Props {
  message: Message;
}

export default function ChatMessage({
  message
}: Props) {
  const isUser =
    message.role === "user";

  return (
    <div
      className={`flex mb-4 ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-[70%]
          rounded-xl
          px-4
          py-3
          ${
            isUser
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }
        `}
      >
        {message.content}
      </div>
    </div>
  );
}