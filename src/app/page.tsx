"use client";

import React, { useState, useEffect } from "react";
import { CinematicAmbientBackground } from "@/components/effects/CinematicAmbientBackground";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { SpecializationSection } from "@/components/sections/SpecializationSection";
import { ProjectDeepDiveStudio } from "@/components/projects/ProjectDeepDiveStudio";
import { AboutSection } from "@/components/sections/AboutSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { Footer } from "@/components/layout/Footer";
import { ConnectModal } from "@/components/ui/ConnectModal";
import { ResumeModal } from "@/components/ui/ResumeModal";
import { CommandPalette } from "@/components/ui/CommandPalette";

export default function HomePage() {
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("shoplens");

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

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  return (
    <div className="relative min-h-screen bg-[#07080B] text-[#F8FAFC] overflow-x-hidden selection:bg-[#6366F1] selection:text-white">
      {/* 1. Cinematic Ambient Dynamic Background (Video-style fluid mesh) */}
      <CinematicAmbientBackground />

      {/* 2. Refined Glassmorphism Navigation Bar */}
      <Navbar
        onOpenConnect={handleOpenConnect}
        onOpenResume={handleOpenResume}
        onOpenCommandPalette={handleOpenCommandPalette}
      />

      {/* 3. Streamlined, Fabulous Main Content Flow */}
      <main className="relative z-10 flex flex-col">
        {/* Flagship Hero with Interactive 360° 3D Cube */}
        <HeroSection
          onOpenConnect={handleOpenConnect}
          onOpenResume={handleOpenResume}
          onSelectProject={handleSelectProject}
        />

        {/* Specialization: Web Developer & AI Automations Specialist */}
        <SpecializationSection onOpenConnect={handleOpenConnect} />

        {/* Flagship Projects Studio with In-Depth Technical Details & Simulators */}
        <ProjectDeepDiveStudio
          onOpenConnect={handleOpenConnect}
          selectedProjectId={selectedProjectId}
        />

        {/* About: The Developer Behind The Code & 360° Profile Cube */}
        <AboutSection
          onOpenConnect={handleOpenConnect}
          onOpenResume={handleOpenResume}
        />

        {/* Dedicated Curriculum Vitae & Credentials */}
        <ResumeSection onOpenConnect={handleOpenConnect} />

        {/* Skills: Practical Technologies & Tools */}
        <SkillsSection />
      </main>

      {/* 4. Minimalist Luxury Footer */}
      <Footer
        onOpenConnect={handleOpenConnect}
        onOpenResume={handleOpenResume}
      />

      {/* 5. Modals & Overlays */}
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
