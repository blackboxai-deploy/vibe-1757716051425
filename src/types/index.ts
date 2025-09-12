export interface UserProgress {
  currentStep: number;
  completedSteps: number[];
  totalSteps: number;
}

export interface HardwareProfile {
  laptopModel: string;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  virtualizationSupport: string;
  optimizationLevel: string;
}

export interface LearningStep {
  id: number;
  title: string;
  phase: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  estimatedTime: string;
  description: string;
  objectives: string[];
  content: {
    theory: string;
    practical: string;
    commands: string[];
    validation: string[];
  };
}

export interface NavigationItem {
  id: string;
  label: string;
  emoji: string;
  description: string;
}

export interface TroubleshootingIssue {
  problem: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  symptoms: string[];
  solutions: string[];
  prevention: string;
}

export interface CodeTemplate {
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  code: string;
}

export interface VMCustomizations {
  vmName: string;
  memory: string;
  vcpus: string;
  diskSize: string;
  networkType: string;
}