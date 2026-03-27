import { Facebook, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ThemeSwitcher } from "./ToggleDarkMode";
import { MessageCircleHeart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex flex-col gap-6 px-5 py-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Brand */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500 text-white">
              <MessageCircleHeart size={15} />
            </div>
            <span className="text-sm font-bold tracking-tight">
              Konpisko<span className="text-rose-500">.</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Anonymous confessions, shared with the world.</p>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} <span className="text-foreground/70">panfilo.dev</span> · All Rights Reserved</p>
        </div>

        {/* Theme switcher */}
        <ThemeSwitcher />

        {/* Social links */}
        <div className="flex items-center gap-3">
          {[
            { href: "https://github.com/Panfilomacantan2", icon: <Github size={17} /> },
            { href: "https://www.linkedin.com/in/panfilo-panong-macantan/", icon: <Linkedin size={17} /> },
            { href: "https://www.facebook.com/panfilo.macantan/", icon: <Facebook size={17} /> },
            { href: "mailto:panfilomacantan.pm@gmail.com", icon: <Mail size={17} /> },
          ].map(({ href, icon }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-rose-400/60 hover:text-rose-500"
            >
              {icon}
            </Link>
          ))}
        </div>

      </div>
    </footer>
  );
};

export default Footer;
