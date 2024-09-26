import "@/assets/styles/globals.css";
import FixedLinks from "@/components/FixedLinks";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
export const metadata = {
  title: "BOOM-AUTO",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>BOOM-AVTO</title>
        <link rel="icon" href="/Logo.svg" />
      </head>
      <body className="bg-background flex flex-col h-screen">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <FixedLinks />
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
