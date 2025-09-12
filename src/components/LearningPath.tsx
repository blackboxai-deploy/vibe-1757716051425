"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface LearningPathProps {
  userProgress: {
    currentStep: number;
    completedSteps: number[];
    totalSteps: number;
  };
  updateProgress: (step: number, completed: boolean) => void;
}

const learningSteps = [
  // Getting Started (0.1 - 5.0)
  {
    id: 1,
    title: "Understanding Virtualization Fundamentals",
    phase: "Getting Started",
    difficulty: "Beginner",
    estimatedTime: "30 minutes",
    description: "Learn what virtualization is, why it matters, and how it revolutionized computing.",
    objectives: [
      "Define virtualization and its core concepts",
      "Understand the difference between physical and virtual machines",
      "Learn about hypervisors and their role",
      "Explore benefits: resource optimization, isolation, migration"
    ],
    content: {
      theory: `Virtualization creates a virtual version of computing resources like operating systems, servers, or networks. Originally developed by IBM in the 1960s with Jim Rymarczyk's CP-67 software, virtualization has become essential for modern computing infrastructure.

**Key Benefits:**
1. **Resource Utilization**: Most servers use only 10-15% of their capacity. Virtualization allows full hardware utilization.
2. **Server Consolidation**: Multiple virtual servers on one physical machine reduce space, power, and cooling costs.
3. **Isolation**: VMs provide greater isolation than processes, enhancing security and stability.
4. **Migration**: VMs can be moved between physical hosts with minimal downtime.
5. **Testing & Development**: Safe environments for testing without affecting production systems.`,
      practical: `**Real-World Applications:**
- Web hosting companies use VMs to provide isolated environments for customers
- Data centers consolidate thousands of physical servers into fewer, more efficient hosts
- Development teams create isolated testing environments
- Cloud providers like AWS, Azure use virtualization as their foundation

**Your HP Pavilion Gaming Laptop Context:**
With 32GB RAM and Intel i5-8300H, your laptop can efficiently run multiple VMs:
- Host OS: 8GB RAM
- Primary Xen VM: 16GB RAM  
- Additional test VMs: 4-8GB each
- Intel VT-x support enables hardware-assisted virtualization`,
      commands: [],
      validation: [
        "Explain virtualization in your own words",
        "List 3 benefits of virtualization for your development setup",
        "Identify how your HP laptop specifications support virtualization"
      ]
    }
  },
  {
    id: 2,
    title: "HP Pavilion Gaming Hardware Assessment",
    phase: "Getting Started", 
    difficulty: "Beginner",
    estimatedTime: "45 minutes",
    description: "Assess your specific hardware capabilities and prepare optimization strategy.",
    objectives: [
      "Verify Intel VT-x virtualization support in BIOS",
      "Confirm 32GB RAM upgrade installation and recognition",
      "Test NVIDIA GTX 1050 Ti compatibility for passthrough",
      "Prepare system for VMware Workstation installation"
    ],
    content: {
      theory: `Your HP Pavilion Gaming 15-cx0049ne laptop specifications:

**Original Specifications:**
- CPU: Intel Core i5-8300H (4 cores, 8 threads, 2.3-4.0 GHz)
- Original RAM: 8GB DDR4-2666 (4GB x 2)
- GPU: NVIDIA GeForce GTX 1050 Ti (4GB GDDR5)
- Storage: Typically 1TB HDD + 128GB SSD
- Chipset: Intel HM370

**Your Upgraded Specifications:**
- RAM: 32GB DDR4 (16GB x 2) - Excellent for virtualization
- All other specs remain the same

**Virtualization Capabilities:**
- Intel VT-x: Hardware-assisted virtualization support
- Intel VT-d: IOMMU support for device passthrough
- EPT (Extended Page Tables): Memory virtualization acceleration
- NVIDIA GPU: Passthrough capable with proper configuration`,
      practical: `**Hardware Verification Steps:**

1. **BIOS Configuration Check:**
   - Restart laptop and enter BIOS (usually F10 or F2 during boot)
   - Navigate to Advanced/Security settings
   - Verify "Intel Virtualization Technology" is ENABLED
   - Verify "VT-d" is ENABLED (if available)
   - Disable "Fast Boot" for better VM compatibility

2. **RAM Verification:**
   - Windows: Task Manager → Performance → Memory
   - Should show ~32GB total
   - Note: Some may be reserved by integrated graphics

3. **CPU Features Check:**
   - Download CPU-Z or HWiNFO64
   - Verify VT-x support in CPU features
   - Check for EPT (Extended Page Tables) support

4. **GPU Status:**
   - Device Manager → Display adapters
   - Should show both Intel UHD Graphics 630 and NVIDIA GTX 1050 Ti
   - Update NVIDIA drivers to latest version

5. **Storage Optimization:**
   - Ensure SSD has at least 50GB free for VM storage
   - Consider external SSD for additional VM storage if needed`,
      commands: [
        "systeminfo | findstr /C:\"Hyper-V\"",
        "wmic cpu get VirtualizationFirmwareEnabled",
        "bcdedit /enum | findstr /C:\"hypervisorlaunchtype\""
      ],
      validation: [
        "BIOS virtualization features are enabled",
        "32GB RAM is properly recognized by system",
        "Both Intel and NVIDIA graphics are functioning",
        "CPU supports VT-x and EPT features",
        "System is ready for VMware Workstation installation"
      ]
    }
  },
  {
    id: 3,
    title: "VMware Workstation Installation & Configuration",
    phase: "Getting Started",
    difficulty: "Beginner", 
    estimatedTime: "60 minutes",
    description: "Install and configure VMware Workstation for optimal Xen development and testing.",
    objectives: [
      "Download and install VMware Workstation Pro",
      "Configure VM settings for Xen development",
      "Create base Linux VM for Xen installation",
      "Optimize VMware settings for your hardware"
    ],
    content: {
      theory: `VMware Workstation Pro is the recommended platform for learning and testing Xen because:

**Why VMware for Xen Learning:**
1. **Nested Virtualization**: VMware supports running hypervisors inside VMs
2. **Hardware Acceleration**: Exposes VT-x to guest VMs
3. **Snapshot Management**: Easy rollback during learning
4. **Network Flexibility**: Multiple network configurations for testing
5. **Resource Control**: Precise allocation of CPU, RAM, storage

**Xen as Type-1 vs VMware as Type-2:**
- Xen is a "bare-metal" Type-1 hypervisor (runs directly on hardware)
- VMware Workstation is a Type-2 hypervisor (runs on Windows/Linux)
- For learning, we'll run Xen inside VMware (nested virtualization)
- In production, Xen would replace your host OS entirely`,
      practical: `**VMware Workstation Installation:**

1. **Download VMware Workstation Pro:**
   - Visit VMware website and download latest version
   - 30-day trial available for learning purposes
   - Consider educational license if eligible

2. **Installation Requirements:**
   - Windows 10/11 x64 host OS
   - Minimum 4GB RAM (you have 32GB - perfect)
   - 1.5GB disk space for application
   - Additional space for VMs (recommend 100GB+)

3. **Post-Installation Configuration:**
   - Enable virtualization engine features
   - Configure default VM location (preferably on SSD)
   - Set memory allocation limits (leave 8-12GB for host)
   - Enable hardware acceleration features

4. **HP Pavilion Specific Settings:**
   - Memory: Allocate up to 20GB to VMs (keep 12GB for host)
   - CPU: Enable all virtualization features
   - Graphics: Configure for NVIDIA GPU if needed
   - Power: Set to "High Performance" mode for testing`,
      commands: [
        "# Check Windows version compatibility",
        "systeminfo | findstr /C:\"OS Name\" /C:\"OS Version\"",
        "# Verify Windows Hyper-V is disabled (conflicts with VMware)",
        "dism.exe /Online /Disable-Feature:Microsoft-Hyper-V-All"
      ],
      validation: [
        "VMware Workstation Pro is installed and activated",
        "Virtualization features are enabled in VMware preferences",
        "Windows Hyper-V is disabled to avoid conflicts",
        "VM storage location is configured on fastest drive",
        "Memory allocation is optimized for 32GB system"
      ]
    }
  },
  {
    id: 4,
    title: "Linux Host VM Creation for Xen",
    phase: "Getting Started",
    difficulty: "Beginner",
    estimatedTime: "75 minutes", 
    description: "Create and configure a Linux virtual machine optimized for Xen hypervisor installation.",
    objectives: [
      "Create Ubuntu Server VM with optimal specifications",
      "Configure VM hardware for Xen requirements",
      "Install and update Ubuntu Server",
      "Prepare system for Xen hypervisor installation"
    ],
    content: {
      theory: `For Xen learning and development, we need a Linux host VM that will serve as our Xen Domain 0. This VM must be configured with specific requirements:

**Recommended Linux Distribution:**
Ubuntu Server 22.04 LTS or 24.04 LTS
- Excellent Xen package support
- Long-term support and stability
- Comprehensive documentation
- Active community support

**VM Hardware Requirements for Xen:**
- CPU: 4 cores (from your i5-8300H)
- RAM: 16GB (leaving 8GB for host, 8GB reserve)
- Storage: 80GB+ (50GB system + 30GB for guest VMs)
- Network: NAT or Bridged for internet access
- Virtualization: Enable VT-x passthrough`,
      practical: `**VMware VM Creation Steps:**

1. **Create New Virtual Machine:**
   - Choose "Typical" configuration
   - Select "I will install the operating system later"
   - Guest OS: Linux → Ubuntu 64-bit
   - VM Name: "Xen-Development-Host"
   - Location: On your fastest drive (SSD preferred)

2. **Hardware Configuration:**
   - Memory: 16384 MB (16GB)
   - Processors: 4 cores
   - Hard Disk: 80GB, split into multiple files
   - Network Adapter: NAT (default)
   - Remove unused hardware (sound, printer, etc.)

3. **Advanced Settings:**
   - VM Settings → Processors → Virtualization engine
   - ✅ "Virtualize Intel VT-x/EPT or AMD-V/RVI"
   - ✅ "Virtualize CPU performance counters"
   - ✅ "Virtualize IOMMU (IO memory management unit)"

4. **Ubuntu Server Installation:**
   - Download Ubuntu Server 22.04 LTS ISO
   - Attach ISO to VM CD/DVD drive
   - Boot VM and follow installation wizard
   - Choose minimal installation
   - Enable SSH server for remote access
   - Create user account (avoid 'root' for security)

5. **Post-Installation Setup:**
   - Update system: sudo apt update && sudo apt upgrade
   - Install essential tools: build-essential, git, wget, curl
   - Install VMware Tools: sudo apt install open-vm-tools
   - Configure SSH for development access`,
      commands: [
        "# System update and essential packages",
        "sudo apt update && sudo apt upgrade -y",
        "sudo apt install -y build-essential git wget curl vim htop",
        "sudo apt install -y open-vm-tools",
        "# Verify virtualization support in VM",
        "grep -E '(vmx|svm)' /proc/cpuinfo",
        "sudo dmesg | grep -i virtualization"
      ],
      validation: [
        "Ubuntu Server VM boots successfully",
        "32GB host RAM allows 16GB VM allocation without performance issues",
        "VM can access internet for package downloads",
        "Virtualization features are available inside VM",
        "SSH access is configured for development",
        "VMware Tools are installed and functioning"
      ]
    }
  },
  {
    id: 5,
    title: "Xen Project Overview & Architecture Deep Dive",
    phase: "Getting Started",
    difficulty: "Beginner",
    estimatedTime: "90 minutes",
    description: "Master the fundamental architecture and concepts of the Xen Project hypervisor.",
    objectives: [
      "Understand Xen's Type-1 hypervisor architecture",
      "Learn about Domain 0 and Domain U concepts",
      "Explore paravirtualization vs hardware-assisted virtualization",
      "Understand the split driver model and inter-domain communication"
    ],
    content: {
      theory: `**The Xen Project Hypervisor Architecture:**

Xen is an open-source Type-1 (bare-metal) hypervisor that runs directly on hardware, managing multiple guest operating systems called "domains."

**Core Components:**

1. **Xen Hypervisor**: 
   - Minimal codebase (~1MB) running in ring 0
   - Manages CPU scheduling, memory allocation, interrupt handling
   - Provides hypercall interface for guests
   - Implements security and isolation mechanisms

2. **Domain 0 (dom0)**:
   - First and most privileged domain loaded at boot
   - Contains hardware drivers and administrative tools
   - Provides device backends for guest domains
   - Manages other domains (create, destroy, migrate)
   - Typically runs Linux, can run NetBSD or Solaris

3. **Domain U (domU)**:
   - Unprivileged guest domains running user workloads
   - Cannot directly access hardware
   - Use frontend drivers communicating with dom0 backends
   - Can be paravirtualized (PV) or hardware-assisted (HVM)

**Virtualization Types in Xen:**
- **Paravirtualization (PV)**: Requires guest OS modification, offers near-native performance
- **Hardware-Assisted (HVM)**: Runs unmodified OSes using Intel VT-x/AMD-V
- **Hybrid (PV-on-HVM)**: Best of both worlds - unmodified OS with PV drivers`,
      practical: `**Understanding Your Hardware in Xen Context:**

**Intel i5-8300H Benefits for Xen:**
- VT-x: Enables HVM guests (Windows, unmodified Linux)
- EPT: Hardware-assisted memory virtualization
- 4 cores/8 threads: Excellent for multiple domains
- Turbo boost: Dynamic performance scaling

**32GB RAM Allocation Strategy:**
- Host OS (Windows): 8GB
- Domain 0 (Xen management): 4-6GB  
- Primary domU: 8-12GB
- Additional domUs: 4GB each
- Reserve: 4-8GB for system stability

**NVIDIA GTX 1050 Ti Considerations:**
- Primary display: Intel UHD Graphics 630
- GPU passthrough: GTX 1050 Ti to specific domU
- IOMMU required for secure passthrough
- VGA passthrough enables native gaming performance in VM

**Storage Layout for Xen:**
- Host OS: 40GB (Windows + applications)
- Xen Domain 0: 20GB (Linux + Xen tools)
- Domain U images: 15-20GB each
- Shared storage: 10GB for ISOs, configs
- Swap/page files: 4-8GB`,
      commands: [
        "# Check CPU virtualization features",
        "cat /proc/cpuinfo | grep -E '(vmx|svm|ept|vpid)'",
        "# Check IOMMU support",  
        "dmesg | grep -E '(DMAR|IOMMU)'",
        "# Memory information",
        "free -h && cat /proc/meminfo | grep MemTotal"
      ],
      validation: [
        "Can explain the difference between Type-1 and Type-2 hypervisors",
        "Understands the roles of Domain 0 and Domain U",
        "Knows the benefits of paravirtualization vs HVM",
        "Can describe how your hardware specifications support Xen",
        "Understands memory and CPU allocation strategies"
      ]
    }
  }
  // Additional steps will be added dynamically
];

export function LearningPath({ userProgress, updateProgress }: LearningPathProps) {
  const [selectedStep, setSelectedStep] = useState(userProgress.currentStep || 1);
  const [userNotes, setUserNotes] = useState("");
  const [completedObjectives, setCompletedObjectives] = useState<number[]>([]);

  const currentStepData = learningSteps.find(step => step.id === selectedStep) || learningSteps[0];
  const isStepCompleted = userProgress.completedSteps.includes(selectedStep);
  const canAccessStep = selectedStep <= userProgress.currentStep + 1;

  const handleCompleteStep = () => {
    updateProgress(selectedStep, true);
    if (selectedStep < learningSteps.length) {
      setSelectedStep(selectedStep + 1);
    }
  };

  const handleObjectiveComplete = (objectiveIndex: number, completed: boolean) => {
    if (completed) {
      setCompletedObjectives([...completedObjectives, objectiveIndex]);
    } else {
      setCompletedObjectives(completedObjectives.filter(i => i !== objectiveIndex));
    }
  };

  const allObjectivesCompleted = completedObjectives.length === currentStepData.objectives.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          🎯 Xen Mastery Learning Path
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          100 carefully crafted steps from absolute beginner to Xen expert
        </p>
        <div className="flex justify-center">
          <Progress 
            value={(userProgress.completedSteps.length / userProgress.totalSteps) * 100} 
            className="w-96 h-3"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Steps Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Learning Steps</CardTitle>
            <CardDescription>Click to navigate between steps</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-2">
                {learningSteps.map((step) => {
                  const isCompleted = userProgress.completedSteps.includes(step.id);
                  const isCurrent = step.id === selectedStep;
                  const isAccessible = step.id <= userProgress.currentStep + 1;

                  return (
                    <Button
                      key={step.id}
                      variant={isCurrent ? "default" : "ghost"}
                      size="sm"
                      className={`w-full justify-start text-left p-3 h-auto ${
                        !isAccessible ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() => isAccessible && setSelectedStep(step.id)}
                      disabled={!isAccessible}
                    >
                      <div className="flex items-center space-x-2 w-full">
                        <span className="text-lg">
                          {isCompleted ? "✅" : isCurrent ? "⏳" : isAccessible ? "🔵" : "🔒"}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">Step {step.id}</p>
                          <p className="text-xs opacity-70 truncate">{step.title}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {step.phase}
                          </Badge>
                        </div>
                      </div>
                    </Button>
                  );
                })}
                
                {/* Preview of more steps */}
                <div className="text-center py-4 text-slate-500 dark:text-slate-400">
                  <p className="text-sm">📈 +95 more steps</p>
                  <p className="text-xs">Unlock by completing current steps</p>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Step Header */}
          <Card className={`border-2 ${canAccessStep ? "border-blue-300 dark:border-blue-700" : "border-slate-300 dark:border-slate-700"}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">
                    Step {currentStepData.id}: {currentStepData.title}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    {currentStepData.description}
                  </CardDescription>
                </div>
                <div className="text-right space-y-2">
                  <Badge className={
                    currentStepData.difficulty === "Beginner" ? "bg-green-600" :
                    currentStepData.difficulty === "Intermediate" ? "bg-orange-600" :
                    "bg-red-600"
                  }>
                    {currentStepData.difficulty}
                  </Badge>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    ⏱️ {currentStepData.estimatedTime}
                  </p>
                  {isStepCompleted && (
                    <Badge className="bg-green-600 text-white">
                      ✅ Completed
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Learning Objectives */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>🎯</span>
                <span>Learning Objectives</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentStepData.objectives.map((objective, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Checkbox
                      checked={completedObjectives.includes(index)}
                      onCheckedChange={(checked) => 
                        handleObjectiveComplete(index, checked as boolean)
                      }
                    />
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {objective}
                    </label>
                  </div>
                ))}
              </div>
              {allObjectivesCompleted && (
                <Alert className="mt-4 border-green-200 bg-green-50 dark:bg-green-900/20">
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    🎉 All objectives completed! You're ready to mark this step as complete.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Content Tabs */}
          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="theory" className="w-full">
                <div className="px-6 pt-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="theory">📚 Theory</TabsTrigger>
                    <TabsTrigger value="practical">🔧 Practical</TabsTrigger>
                    <TabsTrigger value="commands">💻 Commands</TabsTrigger>
                    <TabsTrigger value="validation">✅ Validation</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="theory" className="px-6 pb-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="whitespace-pre-line text-slate-700 dark:text-slate-300">
                      {currentStepData.content.theory}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="practical" className="px-6 pb-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="whitespace-pre-line text-slate-700 dark:text-slate-300">
                      {currentStepData.content.practical}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="commands" className="px-6 pb-6">
                  <div className="space-y-4">
                    {currentStepData.content.commands.length > 0 ? (
                      currentStepData.content.commands.map((command, index) => (
                        <div key={index} className="bg-slate-900 dark:bg-slate-800 rounded-lg p-4">
                          <pre className="text-green-400 text-sm overflow-x-auto">
                            {command}
                          </pre>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                        <span className="text-4xl block mb-2">💡</span>
                        <p>No commands required for this step.</p>
                        <p className="text-sm">Focus on understanding the concepts and theory.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="validation" className="px-6 pb-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      ✅ Step Completion Criteria
                    </h3>
                    <div className="space-y-3">
                      {currentStepData.content.validation.map((criteria, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                          <span className="text-blue-600 font-bold">•</span>
                          <p className="text-slate-700 dark:text-slate-300">{criteria}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Notes and Completion */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>📝</span>
                <span>Your Notes & Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Step Notes (Optional)
                </label>
                <Textarea
                  placeholder="Add your notes, questions, or insights about this step..."
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  className="mt-2"
                  rows={4}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="space-x-2">
                  {selectedStep > 1 && (
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedStep(selectedStep - 1)}
                    >
                      ← Previous Step
                    </Button>
                  )}
                </div>
                
                <div className="space-x-2">
                  {!isStepCompleted && allObjectivesCompleted && (
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={handleCompleteStep}
                    >
                      ✅ Complete Step {selectedStep}
                    </Button>
                  )}
                  
                  {selectedStep < learningSteps.length && (
                    <Button 
                      variant={isStepCompleted ? "default" : "outline"}
                      onClick={() => setSelectedStep(selectedStep + 1)}
                      disabled={!canAccessStep && selectedStep + 1 > userProgress.currentStep + 1}
                    >
                      Next Step →
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}