import { Facebook, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="container flex flex-col items-start justify-between py-5 text-sm lg:flex-row lg:items-center">
      <div className="flex flex-col lg:flex-row lg:space-x-10">
        <p>© {new Date().getFullYear()} panfilo.dev</p>
        <p>All Rights Reserved</p>
        <p>Panfilo Panong Macantan</p>
      </div>

      <div className="my-4 flex space-x-4">
        <Link
          href="https://github.com/Panfilomacantan2"
          className="cursor-pointer text-foreground/80"
          target="_blank"
        >
          <Github size={20} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/panfilo-panong-macantan/"
          className="cursor-pointer text-foreground/80"
          target="_blank"
        >
          <Linkedin size={20} />
        </Link>
        <Link
          href="https://www.facebook.com/panfilo.macantan/"
          className="cursor-pointer text-foreground/80"
          target="_blank"
        >
          <Facebook size={20} />
        </Link>
        <Link
          href="mailto:panfilomacantan.pm@gmail.com"
          className="cursor-pointer text-foreground/80"
          target="_blank"
        >
          <Mail size={20} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
