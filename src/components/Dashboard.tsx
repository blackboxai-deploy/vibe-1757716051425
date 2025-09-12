"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  userProgress: {
    currentStep: number;
    completedSteps: number[];
    totalSteps: number;
  };
  hardwareProfile: {
    laptopModel: string;
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    virtualizationSupport: string;
    optimizationLevel: string;
  };
}

export function Dashboard({ userProgress, hardwareProfile }: DashboardProps) {
  const progressPercentage = (userProgress.completedSteps.length / userProgress.totalSteps) * 100;
  
  const getCurrentPhase = () => {
    const step = userProgress.currentStep;
    if (step <= 5) return { name: "Getting Started", color: "bg-green-500", description: "Hardware assessment and preparation" };
    if (step <= 20) return { name: "Foundation", color: "bg-blue-500", description: "Core virtualization concepts" };
    if (step <= 35) return { name: "Installation", color: "bg-purple-500", description: "Xen setup in VMware" };
    if (step <= 60) return { name: "Configuration", color: "bg-orange-500", description: "Advanced configuration mastery" };
    if (step <= 80) return { name: "Performance", color: "bg-red-500", description: "Hardware optimization" };
    if (step <= 95) return { name: "Advanced", color: "bg-indigo-500", description: "Migration, debugging, security" };
    return { name: "Production", color: "bg-emerald-500", description: "Real-world deployment" };
  };

  const currentPhase = getCurrentPhase();

  const recentAchievements = [
    { step: 1, title: "Hardware Compatibility Verified", date: "Today" },
    { step: 2, title: "VMware Workstation Setup", date: "Today" },
    { step: 3, title: "Xen Project Overview Completed", date: "Today" }
  ].filter(achievement => userProgress.completedSteps.includes(achievement.step));

  const nextMilestones = [
    { step: 5, title: "Complete Hardware Assessment", phase: "Getting Started" },
    { step: 10, title: "Understand Type-1 Hypervisors", phase: "Foundation" },
    { step: 20, title: "Master Paravirtualization Concepts", phase: "Foundation" },
    { step: 35, title: "Complete Xen Installation", phase: "Installation" },
    { step: 50, title: "Configure Domain 0", phase: "Configuration" },
    { step: 75, title: "Optimize for Gaming Hardware", phase: "Performance" }
  ];

  const upcomingMilestone = nextMilestones.find(milestone => milestone.step > userProgress.currentStep);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Welcome to Xen Project Mastery
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Master the most powerful open-source Type-1 hypervisor with our comprehensive 
          step-by-step learning platform, optimized for your HP Pavilion Gaming laptop.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-blue-200 dark:border-blue-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Overall Progress</CardTitle>
            <CardDescription>Your journey through Xen mastery</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">
                {Math.round(progressPercentage)}%
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {userProgress.completedSteps.length} of {userProgress.totalSteps} steps
              </p>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-indigo-200 dark:border-indigo-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Current Phase</CardTitle>
            <CardDescription>Your learning focus area</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Badge className={`${currentPhase.color} text-white px-4 py-2 text-lg`}>
                {currentPhase.name}
              </Badge>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                {currentPhase.description}
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">Step {userProgress.currentStep}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {upcomingMilestone ? `Next: ${upcomingMilestone.title}` : "All milestones completed!"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-emerald-200 dark:border-emerald-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Hardware Status</CardTitle>
            <CardDescription>Your system optimization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>CPU</span>
                <Badge variant="secondary">{hardwareProfile.cpu}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>GPU</span>
                <Badge variant="secondary">{hardwareProfile.gpu}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>RAM</span>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {hardwareProfile.ram}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Virtualization</span>
                <Badge variant="outline" className="text-blue-600 border-blue-600">
                  {hardwareProfile.virtualizationSupport}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🚀</span>
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>
            Jump right into your Xen learning journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              className="h-24 flex-col space-y-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              onClick={() => window.location.hash = "learning"}
            >
              <span className="text-2xl">📈</span>
              <span>Continue Learning</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex-col space-y-2"
              onClick={() => window.location.hash = "generator"}
            >
              <span className="text-2xl">⚡</span>
              <span>Generate Code</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex-col space-y-2"
              onClick={() => window.location.hash = "hardware"}
            >
              <span className="text-2xl">🔧</span>
              <span>Optimize Hardware</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex-col space-y-2"
              onClick={() => window.location.hash = "docs"}
            >
              <span className="text-2xl">📚</span>
              <span>Reference Docs</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Learning Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🏆</span>
              <span>Recent Achievements</span>
            </CardTitle>
            <CardDescription>
              Your latest completed milestones
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentAchievements.length > 0 ? (
              <div className="space-y-3">
                {recentAchievements.slice(0, 5).map((achievement, index) => (
                  <div key={achievement.step} className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <Badge className="bg-green-600 text-white">
                      Step {achievement.step}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-white">
                        {achievement.title}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {achievement.date}
                      </p>
                    </div>
                    <span className="text-green-600 text-xl">✓</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <span className="text-4xl block mb-2">🎯</span>
                <p>Start your learning journey to unlock achievements!</p>
                <Button 
                  className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600"
                  onClick={() => window.location.hash = "learning"}
                >
                  Begin Step 0.1
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Learning Path Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🗺️</span>
              <span>Learning Path Preview</span>
            </CardTitle>
            <CardDescription>
              Upcoming milestones in your journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {nextMilestones.slice(0, 5).map((milestone, index) => {
                const isCompleted = userProgress.completedSteps.includes(milestone.step);
                const isCurrent = milestone.step === userProgress.currentStep;
                const isUpcoming = milestone.step > userProgress.currentStep;

                return (
                  <div 
                    key={milestone.step} 
                    className={`flex items-center space-x-3 p-3 rounded-lg border ${
                      isCompleted 
                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" 
                        : isCurrent
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                        : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <Badge 
                      variant={isCompleted ? "default" : isCurrent ? "secondary" : "outline"}
                      className={isCompleted ? "bg-green-600 text-white" : isCurrent ? "bg-blue-600 text-white" : ""}
                    >
                      Step {milestone.step}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-white">
                        {milestone.title}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {milestone.phase}
                      </p>
                    </div>
                    <span className="text-xl">
                      {isCompleted ? "✅" : isCurrent ? "⏳" : "🔒"}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Requirements Check */}
      <Card className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>💻</span>
            <span>Hardware Compatibility Status</span>
          </CardTitle>
          <CardDescription>
            Your HP Pavilion Gaming laptop optimization status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-lg text-slate-900 dark:text-white">✅ Verified Compatible</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Intel VT-x Support</span>
                  <Badge className="bg-green-600 text-white">Enabled</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>RAM Capacity</span>
                  <Badge className="bg-green-600 text-white">32GB Optimal</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>CPU Performance</span>
                  <Badge className="bg-green-600 text-white">i5-8300H Ready</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>GPU Passthrough</span>
                  <Badge className="bg-green-600 text-white">GTX 1050 Ti Supported</Badge>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-lg text-slate-900 dark:text-white">🔧 Optimization Recommendations</h4>
              <div className="space-y-2">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Recommended VM Allocation
                  </p>
                  <ul className="text-xs text-blue-700 dark:text-blue-300 mt-1 space-y-1">
                    <li>• Host OS: 8GB RAM minimum</li>
                    <li>• Primary VM: 16GB RAM</li>
                    <li>• Test VMs: 4-8GB each</li>
                    <li>• CPU cores: 2-4 per VM</li>
                  </ul>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                    Performance Tips
                  </p>
                  <ul className="text-xs text-orange-700 dark:text-orange-300 mt-1 space-y-1">
                    <li>• Enable Intel VT-x in BIOS</li>
                    <li>• Disable Windows fast startup</li>
                    <li>• Allocate SSD for VM storage</li>
                    <li>• Configure GPU passthrough</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🗺️</span>
            <span>Complete Learning Roadmap</span>
          </CardTitle>
          <CardDescription>
            Your 100-step journey from zero to Xen expert
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { phase: "Getting Started", steps: "0.1 - 5.0", description: "Hardware assessment, VMware setup, basic concepts", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
              { phase: "Foundation", steps: "5.1 - 20.0", description: "Core virtualization, hypervisor fundamentals, Type-1 vs Type-2", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
              { phase: "Installation", steps: "20.1 - 35.0", description: "Complete Xen installation, Domain 0 setup, initial configuration", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
              { phase: "Configuration", steps: "35.1 - 60.0", description: "Advanced configuration, guest domains, networking, storage", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
              { phase: "Performance", steps: "60.1 - 80.0", description: "Hardware optimization, memory management, CPU scheduling", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
              { phase: "Advanced", steps: "80.1 - 95.0", description: "Live migration, debugging, security frameworks, troubleshooting", color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200" },
              { phase: "Production", steps: "95.1 - 100.0", description: "Real-world deployment, monitoring, maintenance, certification", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200" }
            ].map((phase, index) => {
              const phaseSteps = phase.steps.split(" - ");
              const startStep = parseFloat(phaseSteps[0]);
              const endStep = parseFloat(phaseSteps[1]);
              const isCurrentPhase = userProgress.currentStep >= startStep && userProgress.currentStep <= endStep;
              
              return (
                <div key={phase.phase} className={`p-4 rounded-lg border-2 ${
                  isCurrentPhase 
                    ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-600" 
                    : "border-slate-200 dark:border-slate-700"
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        {phase.phase}
                        {isCurrentPhase && <span className="ml-2 text-blue-600">← Current</span>}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {phase.description}
                      </p>
                    </div>
                    <Badge className={phase.color}>
                      {phase.steps}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Ready to Master Xen?
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Join thousands of developers who have mastered hypervisor technology with our comprehensive platform.
        </p>
        <div className="flex justify-center space-x-4">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            onClick={() => window.location.hash = "learning"}
          >
            {userProgress.currentStep === 0 ? "🚀 Start Learning Journey" : "📈 Continue Learning"}
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.location.hash = "docs"}
          >
            📖 Browse Documentation
          </Button>
        </div>
      </div>
    </div>
  );
}