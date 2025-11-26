
import "./globals.css";


export const metadata = {
  title: "Spott",
  description: "Discover and Create amazing events.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-linear-to-br from-gray-950 via-zinc-900 to-stone-900 text-white`}
      >
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
