import { Providers } from "./providers";

import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={orbitron.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
