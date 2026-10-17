"use client";

import React, { useState, useEffect } from "react";
import { NeuralNetworkBackground } from "@/components/effects/NeuralNetworkBackground";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { DeveloperDashboard } from "@/components/sections/DeveloperDashboard";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { Footer } from "@/components/layout/Footer";
import { ConnectModal } from "@/components/ui/ConnectModal";
import { ResumeModal } from "@/components/ui/ResumeModal";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { PortfolioAssistant } from "@/components/assistant/PortfolioAssistant";

export default function HomePage() {
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global keyboard shortcut: ⌘K or Ctrl+K opens the Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOpenConnect = () => setIsConnectOpen(true);
  const handleCloseConnect = () => setIsConnectOpen(false);

  const handleOpenResume = () => setIsResumeOpen(true);
  const handleCloseResume = () => setIsResumeOpen(false);

  const handleOpenCommandPalette = () => setIsCommandPaletteOpen(true);
  const handleCloseCommandPalette = () => setIsCommandPaletteOpen(false);

  return (
    <div className="relative min-h-screen bg-[#07090D] text-[#F5F7FA] overflow-x-hidden selection:bg-[#A3FF12] selection:text-[#07090D]">
      {/* 1. Subtle Animated Neural-Network & Particle Canvas Background */}
      <NeuralNetworkBackground />

      {/* 2. Glassmorphism Navigation Bar */}
      <Navbar
        onOpenConnect={handleOpenConnect}
        onOpenResume={handleOpenResume}
        onOpenCommandPalette={handleOpenCommandPalette}
      />

      {/* 4. Main Content Flow: Days 2 - 7 Integrated */}
      <main className="relative z-10 flex flex-col">
        {/* Day 2: Hero Section */}
        <HeroSection
          onOpenConnect={handleOpenConnect}
          onOpenResume={handleOpenResume}
          onOpenCommandPalette={handleOpenCommandPalette}
        />

        {/* Day 3: Personal OS / Developer Dashboard Section */}
        <DeveloperDashboard onOpenConnect={handleOpenConnect} />

        {/* Day 4 & 5: Main Projects Showcase & Detailed Case Studies */}
        <ProjectsSection onOpenConnect={handleOpenConnect} />

        {/* Day 6: About Me — The Person Behind The Code */}
        <AboutSection
          onOpenConnect={handleOpenConnect}
          onOpenResume={handleOpenResume}
        />

        {/* Day 6: Interactive Skills — Tools I'm Exploring */}
        <SkillsSection />

        {/* Day 6: Learning Journey — My Building Journey */}
        <JourneySection />
      </main>

      {/* 5. Minimal Footer Foundation */}
      <Footer
        onOpenConnect={handleOpenConnect}
        onOpenResume={handleOpenResume}
      />

      {/* 6. Day 7: Ahmad's AI Guide Floating Assistant */}
      <PortfolioAssistant />

      {/* 7. Modals & Overlays */}
      <ConnectModal
        isOpen={isConnectOpen}
        onClose={handleCloseConnect}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={handleCloseResume}
        onOpenConnect={handleOpenConnect}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={handleCloseCommandPalette}
        onOpenResume={handleOpenResume}
        onOpenConnect={handleOpenConnect}
      />
    </div>
  );
}
