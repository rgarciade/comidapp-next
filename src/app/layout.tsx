import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {NavigationBar} from "./components/navigationBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ComidApp",
  description: "Find your favorite recipes and share them with your friends",
    keywords:[
        "recipes",
        "food",
        "cooking",
        "kitchen",
        "meals",
        "ingredients",
        "gastronomy",
        "culinary",
        "dishes",
        "plates",
        "foodies",
        "chefs",
        "cooking lovers",
        "food lovers",
        "foodies",
        "food bloggers",
        "food influencers",
        "food content creators",
        "food content",
        "food content creators",
        "recetas",
        "comida",
        "cocina",
        "platos",
        "ingredientes",
        "gastronomía",
        "culinaria",
        "comida casera",
        "cocinar",
        "foodies",
    ]
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="es">
      <body className={inter.className}>
          {children}
          <NavigationBar/>
      </body>

      </html>
  );
}
