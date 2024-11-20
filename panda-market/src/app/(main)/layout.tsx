import GNB from "@/app/_components/layout/GNB";
import Footer from "@/app/_components/layout/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <GNB />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
