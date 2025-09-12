"use client";

import { useState, useEffect } from "react";
import { Dashboard } from "@/components/Dashboard";
import { LearningPath } from "@/components/LearningPath";
import { CodeGenerator } from "@/components/CodeGenerator";
import { HardwareProfile } from "@/components/HardwareProfile";
import { DocumentationHub } from "@/components/DocumentationHub";
import { TroubleshootingGuide } from "@/components/TroubleshootingGuide";
import { Navigation } from "@/components/Navigation";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userProgress, setUserProgress] = useState({
    currentStep: 0,
    completedSteps: [] as number[],
    totalSteps: 100
  });

  const [hardwareProfile, setHardwareProfile] = useState({
    laptopModel: "HP Pavilion Gaming 15-cx0049ne",
    cpu: "Intel i5-8300H",
    gpu: "NVIDIA GTX 1050 Ti",
    ram: "32GB (Upgraded from 8GB)",
    storage: "SSD/HDD Hybrid",
    virtualizationSupport: "Intel VT-x",
    optimizationLevel: "Gaming Performance"
  });

  useEffect(() => {
    // Load user progress from localStorage
    const savedProgress = localStorage.getItem("xenProgress");
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  const updateProgress = (step: number, completed: boolean) => {
    const newProgress = {
      ...userProgress,
      currentStep: completed ? Math.max(userProgress.currentStep, step + 1) : userProgress.currentStep,
      completedSteps: completed 
        ? [...new Set([...userProgress.completedSteps, step])]
        : userProgress.completedSteps.filter(s => s !== step)
    };
    setUserProgress(newProgress);
    localStorage.setItem("xenProgress", JSON.stringify(newProgress));
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard userProgress={userProgress} hardwareProfile={hardwareProfile} />;
      case "learning":
        return <LearningPath userProgress={userProgress} updateProgress={updateProgress} />;
      case "generator":
        return <CodeGenerator hardwareProfile={hardwareProfile} userProgress={userProgress} />;
      case "hardware":
        return <HardwareProfile profile={hardwareProfile} updateProfile={setHardwareProfile} />;
      case "docs":
        return <DocumentationHub />;
      case "troubleshooting":
        return <TroubleshootingGuide />;
      default:
        return <Dashboard userProgress={userProgress} hardwareProfile={hardwareProfile} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} userProgress={userProgress} />
      <main className="container mx-auto px-4 py-8">
        {renderActiveComponent()}
      </main>
    </div>
  );
}