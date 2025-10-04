import "./../styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Aadi Verse",
  description: "Chat with your nutrition knowledge base"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
