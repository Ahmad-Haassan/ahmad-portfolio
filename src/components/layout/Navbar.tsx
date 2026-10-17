"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Cpu, ArrowUpRight, Command, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface NavbarProps {
  onOpenConnect?: () => void;
  onOpenResume?: () => void;
  onOpenCommandPalette?: () => void;
}

export function Navbar({
  onOpenConnect,
  onOpenResume,
  onOpenCommandPalette,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      const sections = ["home", "workspace", "projects", "about", "skills", "journey", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Workspace", href: "#workspace" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Journey", href: "#journey" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === "#contact" && onOpenConnect) {
      onOpenConnect();
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-[#07090D]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Main Navigation">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3FF12] rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/15 flex items-center justify-center transition-all duration-300 group-hover:border-[#A3FF12]/60 group-hover:shadow-[0_0_15px_rgba(163,255,18,0.25)]">
              <Cpu className="w-5 h-5 text-[#A3FF12] transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white group-hover:text-white transition-colors flex items-center gap-1.5">
                AHMAD HASSAN
                <span className="w-1.5 h-1.5 rounded-full bg-[#A3FF12] inline-block animate-pulse" />
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#00D9FF] uppercase">
                AI &amp; Automation
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.035] border border-white/[0.08] backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A3FF12] ${
                    isActive
                      ? "text-white bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                      : "text-[#9BA7B7] hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-[#A3FF12] rounded-full shadow-[0_0_8px_#A3FF12]"
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Command Palette Trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-[#9BA7B7] hover:text-white transition-colors"
              title="Open Command Palette (⌘K)"
            >
              <Command className="w-3.5 h-3.5 text-[#00D9FF]" />
              <span className="hidden xl:inline">Search</span>
              <kbd className="px-1 py-0.2 rounded text-[10px] bg-white/[0.06] border border-white/10">⌘K</kbd>
            </button>

            {/* Resume Action */}
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-[#A3FF12] transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            <Button
              variant="primary"
              size="sm"
              onClick={onOpenConnect}
              icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            >
              Initiate
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenCommandPalette}
              className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-[#00D9FF]"
              aria-label="Open Command Menu"
            >
              <Command className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3FF12]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#07090D]/95 backdrop-blur-2xl px-6 py-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "text-white bg-white/[0.08] border border-white/10"
                      : "text-[#9BA7B7] hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#A3FF12]" />
                  )}
                </a>
              );
            })}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <Button
                variant="secondary"
                size="md"
                className="w-full justify-center"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenResume) onOpenResume();
                }}
                icon={<FileText className="w-4 h-4 text-[#A3FF12]" />}
              >
                View Curriculum Vitae
              </Button>
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenConnect) onOpenConnect();
                }}
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                Connect With Ahmad
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
