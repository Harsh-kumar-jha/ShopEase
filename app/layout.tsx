import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Footer, NavBar } from "./components";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "ShopEase",
  description:
    "ShopEase is an innovative e-commerce web application that aims to provide a seamless and enjoyable online shopping experience for users. With a user-friendly interface, robust features, and a wide range of products, ShopEase makes shopping a breeze. Users can browse through an extensive catalog of products, view detailed product descriptions, and make secure and convenient online purchases. The app also includes a personalized user profile, order tracking, and recommendations to enhance the overall shopping experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        <Toaster
          toastOptions={{
            style: {
              background: "rgb(51 65 85)",
              color: "#fff",
            },
          }}
        />
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
