"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userProgress: {
    currentStep: number;
    completedSteps: number[];
    totalSteps: number;
  };
}

export function Navigation({ activeTab, setActiveTab, userProgress }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const progressPercentage = (userProgress.completedSteps.length / userProgress.totalSteps) * 100;

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      emoji: "📊",
      description: "Overview & Progress"
    },
    {
      id: "learning",
      label: "Learning Path",
      emoji: "📚",
      description: "Step-by-Step Guide"
    },
    {
      id: "generator",
      label: "Code Generator",
      emoji: "⚡",
      description: "AI-Powered Scripts"
    },
    {
      id: "hardware",
      label: "Hardware Profile",
      emoji: "🖥️",
      description: "HP Pavilion Optimization"
    },
    {
      id: "docs",
      label: "Documentation",
      emoji: "📖",
      description: "Complete Reference"
    },
    {
      id: "troubleshooting",
      label: "Troubleshooting",
      emoji: "🔧",
      description: "Issues & Solutions"
    }
  ];

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-slate-900/95 dark:supports-[backdrop-filter]:bg-slate-900/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">X</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  Xen Project Mastery
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  From Zero to Expert Hypervisor
                </p>
              </div>
            </div>

            {/* Progress Indicator - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Step {userProgress.currentStep} of {userProgress.totalSteps}
                </span>
                <div className="flex items-center space-x-2">
                  <Progress value={progressPercentage} className="w-32" />
                  <Badge variant="secondary">
                    {Math.round(progressPercentage)}%
                  </Badge>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </Button>
          </div>

          {/* Mobile Progress */}
          <div className="md:hidden pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Step {userProgress.currentStep} of {userProgress.totalSteps}
              </span>
              <Badge variant="secondary">
                {Math.round(progressPercentage)}%
              </Badge>
            </div>
            <Progress value={progressPercentage} className="w-full" />
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className={`${
        mobileMenuOpen ? "block" : "hidden"
      } md:block bg-white dark:bg-slate-900 border-b shadow-sm`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-1 py-2">
            {navigationItems.map((item) => {
              const isActive = activeTab === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={`justify-start w-full md:w-auto mb-1 md:mb-0 ${
                    isActive 
                      ? "bg-blue-600 text-white hover:bg-blue-700" 
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                  }`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span className="text-lg mr-2">{item.emoji}</span>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-xs opacity-70">{item.description}</span>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}