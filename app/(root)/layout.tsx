import { Header } from "@/shared/components/shared";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Next Pizza | Главная",
  description: "Сайт-магазин самой вкусной пиццы!",
};

export default function HomeLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main className="min-h-screen">
        {children}
        {modal}
      </main>
    </>
  );
}
