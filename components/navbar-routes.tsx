"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { Logo } from "@/app/(dashboard)/_components/logo";
import { Layout, Compass, List, BarChart } from "lucide-react";
import { SidebarItem } from "@/app/(dashboard)/_components/sidebar-item";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");
  const isSearchPage = pathname === "/search";

  const guestRoutes = [
    {
      icon: Layout,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: Compass,
      label: "Browse",
      href: "/search",
    },
  ];

  const teacherRoutes = [
    {
      icon: List,
      label: "Services",
      href: "/teacher/services",
    },
    {
      icon: BarChart,
      label: "Analytics",
      href: "/teacher/analytics",
    },
  ];

  // This code is adapted from SidebarRoutes
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <>
      <div className="p-6 hidden md:block">
        <Logo />
      </div>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">

      {routes.map((route) => (
  <div className="hidden md:block" key={route.href}> {/* Przeniesione klucze tutaj */}
    <SidebarItem
      icon={route.icon}
      label={route.label}
      href={route.href}
    />
  </div>
))}
        {isTeacherPage || isPlayerPage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : (
          <Link href="/teacher/services">
            <Button size="sm" variant="ghost">
              Freelancer mode
            </Button>
          </Link>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};