"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Command, FileText, Mail } from "lucide-react";
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
      setIsScrolled(window.scrollY > 20);

      const sections = ["home", "expertise", "projects", "about", "resume", "skills", "contact"];
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
    { name: "Specialization", href: "#expertise" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Resume", href: "#resume" },
    { name: "Skills", href: "#skills" },
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
          ? "py-3 bg-[#07080B]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Main Navigation">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus-visible:outline-none rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/15 flex items-center justify-center transition-all duration-300 group-hover:border-indigo-400 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] shrink-0 bg-white/[0.05]">
              <img
                src="/ahmad-hassan.png"
                alt="Ahmad Hassan"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors flex items-center gap-1.5">
                AHMAD HASSAN
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block" />
              </span>
              <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                Web Dev &amp; AI Automations
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
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 relative focus-visible:outline-none ${
                    isActive
                      ? "text-white bg-white/[0.1] shadow-sm font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-0.5 bg-indigo-400 rounded-full shadow-[0_0_8px_#6366F1]"
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Command Palette Trigger */}
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                title="Quick Search (⌘K)"
              >
                <Command className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden xl:inline">Search</span>
                <kbd className="px-1 py-0.5 rounded text-[10px] bg-white/[0.06] border border-white/10">⌘K</kbd>
              </button>
            )}

            {/* Resume Action */}
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
            )}

            <Button
              variant="primary"
              size="sm"
              onClick={onOpenConnect}
              icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            >
              Get In Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-white hover:bg-white/10 focus-visible:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-[#0D1017]/95 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConnect?.();
                }}
              >
                Get In Touch
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
