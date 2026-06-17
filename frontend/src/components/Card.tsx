import { type ReactNode } from "react";

export default function Card({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="
      bg-card/60
      backdrop-blur-xl

      border border-white/10

      rounded-3xl
      p-6

      shadow-xl
      "
    >
      {children}
    </div>
  );
}