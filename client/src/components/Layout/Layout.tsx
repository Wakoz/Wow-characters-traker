import Header from "./Header/Header";
import Footer from "./Footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="wow-layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
