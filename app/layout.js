import { Uncial_Antiqua } from "next/font/google";
import "./globals.css";

const uncialAntiqua = Uncial_Antiqua({
  subsets: ["latin"],
  weight: "400",
});



export const metadata = {
  title: "Gamers Of Dungeons and Dragons",
  description: "Website for Nait Club",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={uncialAntiqua.className}>
        {children}
      </body>
    </html>
  );
}
