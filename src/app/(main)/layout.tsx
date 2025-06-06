"use client";
import { ReactNode } from "react";
import Menu from "@/components/Menu";
import { usePathname } from "next/navigation";
import { HeaderProvider } from "@/utils/HeaderContext";
import { useHeader } from "@/utils/HeaderContext";
import { SessionProvider } from "next-auth/react";

interface LayoutProps {
  children: ReactNode;
}

export function Header() {
  const { headerTitle } = useHeader();
  return (
    <h1
      style={{
        fontFamily: "Jost",
        fontWeight: "bold",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
      }}
      className="text-3xl sm:text-4xl md:text-5xl font-bold"
    >
      {headerTitle}
    </h1>
  );
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const userType = pathname.includes("admin") ? "admin" : "borrower";

  return (
    <HeaderProvider>
      <SessionProvider>
        <div
          className="grid gap-2 h-screen text-gray-800"
          style={{
            fontFamily: "Jost",
            gridTemplateColumns: "0.2fr 3.5fr",
            gridTemplateRows: "0.2fr 3.5fr",
            gridTemplateAreas: `
            'sidebar header'
            'sidebar main'`,
          }}
        >
          <Menu userType={userType} style={{ gridArea: "sidebar" }} />

          {/* Header */}
          <section
            className="bg-[#83191c] text-white font-medium text-xl flex items-center px-5 shadow-lg rounded-lg m-3 tracking-wider"
            style={{
              borderRadius: "20px",
              gridArea: "header",
              height: "80px",
              boxShadow: `
              inset 0px 4px 4px rgba(0, 0, 0, 0.25), 
              inset 0px 4px 4px rgba(0, 0, 0, 0.25)
            `,
            }}
          >
            <Header />
          </section>

          {/* Main Content */}
          <main
            className="p-4 md:p-6 mx-2 md:mx-4 bg-white rounded-[20px] shadow-3xl text-base leading-relaxed overflow-y-auto"
            style={{
              gridArea: "main",
              display: "flex",
              flexDirection: "column",
              height: "calc(100vh - 10rem)", // Adjust to leave room for bottom nav
              paddingBottom: "5rem", // Ensures scroll content doesn't get hidden
              boxShadow: "0px 0px 20px rgba(0, 0, 0, 1)",
            }}
          >
            {children}
          </main>
        </div>
      </SessionProvider>
    </HeaderProvider>
  );
};

export default Layout;
