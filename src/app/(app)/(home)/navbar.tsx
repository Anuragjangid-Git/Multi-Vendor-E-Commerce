"use client";
import Link from "next/link";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { NavbarSidebar } from "./navbar-sidebar";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

interface navbarItemsProp {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

const NavbarItems = ({ href, children, isActive }: navbarItemsProp) => {
  return (
    <Button
      asChild
      variant={"outline"}
      className={cn(
        "bg-transparent border-transparent hover:bg-transparent rounded-full hover:border-primary px-3.5 text-lg ",
        isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());
  return (
    <nav className="h-20 bg-white flex justify-between border-b font-medium">
      <Link className="pl-6 flex items-center" href="/">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          My Shop
        </span>
      </Link>
      <NavbarSidebar
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        items={navbarItems}
      />
      <div className="items-center gap-4 lg:flex hidden">
        {navbarItems.map((item) => (
          <NavbarItems
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItems>
        ))}
      </div>
      {session.data?.user ? (
        <div className="lg:flex hidden">
          <Button
            asChild
            className="bg-black text-white border-l border-r-0 border-t-0 border-b-0 hover:bg-pink-400 hover:text-black px-12 h-full rounded-none transition-colors text-lg"
          >
            <Link href={"/admin"}>Dashboard</Link>
          </Button>
        </div>
      ) : (
        <div className="lg:flex hidden">
          <Button
            asChild
            variant={"secondary"}
            className="bg-white border-l border-r-0 border-t-0 border-b-0 hover:bg-pink-400 px-12 h-full rounded-none transition-colors text-lg"
          >
            <Link prefetch href={"/sign-in"}>
              Login
            </Link>
          </Button>
          <Button
            asChild
            className="bg-black text-white border-l border-r-0 border-t-0 border-b-0 hover:bg-pink-400 hover:text-black px-12 h-full rounded-none transition-colors text-lg"
          >
            <Link prefetch href={"/sign-up"}>
              Start Selling
            </Link>
          </Button>
        </div>
      )}
      <div className="flex lg:hidden justify-center items-center">
        <Button
          variant={"ghost"}
          className="size-12 border-transparent bg-white"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};
