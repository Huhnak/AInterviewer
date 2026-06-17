import { type ReactNode } from "react";

function BaseLayout({ children }: { children: ReactNode }) {
    return <main className="mx-auto max-w-7xl px-6 py-6">{children}</main>;
}

export default BaseLayout;
