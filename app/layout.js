
import "./globals.css";


export const metadata = {
  title: "Spott",
  description: "Discover and Create amazing events.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        {children}
      </body>
    </html>
  );
}
