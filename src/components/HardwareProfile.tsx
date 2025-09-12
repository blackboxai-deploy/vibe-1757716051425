"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface HardwareProfileProps {
  profile: {
    laptopModel: string;
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    virtualizationSupport: string;
    optimizationLevel: string;
  };
  updateProfile: (profile: any) => void;
}

export function HardwareProfile({ profile }: HardwareProfileProps) {
  const compatibilityScore = 95; // HP Pavilion Gaming is highly compatible

  const hardwareSpecs = [
    {
      component: "CPU",
      model: "Intel Core i5-8300H",
      specs: "4 cores, 8 threads, 2.3-4.0 GHz",
      xenCompatibility: "Excellent",
      optimizations: [
        "Intel VT-x support for HVM guests",
        "EPT (Extended Page Tables) for memory virtualization",
        "Turbo Boost for dynamic performance",
        "4 cores perfect for Domain 0 + multiple guests"
      ],
      recommendations: [
        "Enable VT-x in BIOS settings",
        "Set CPU governor to 'performance' for Xen workloads",
        "Pin Domain 0 to specific cores for predictable performance",
        "Allocate 2-4 vCPUs per guest VM depending on workload"
      ]
    },
    {
      component: "Memory",
      model: "32GB DDR4-2666 (Upgraded)",
      specs: "16GB x 2 modules, dual-channel",
      xenCompatibility: "Outstanding",
      optimizations: [
        "Massive capacity for multiple concurrent VMs",
        "Dual-channel provides excellent memory bandwidth",
        "DDR4-2666 speed optimal for virtualization workloads",
        "Allows proper Domain 0 isolation with dedicated memory"
      ],
      recommendations: [
        "Allocate 8GB fixed memory to Domain 0",
        "Reserve 8GB for host OS (Windows/Linux)",
        "Use remaining 16GB for guest VMs",
        "Enable huge pages (2MB) for better performance",
        "Configure memory ballooning for dynamic allocation"
      ]
    },
    {
      component: "Graphics",
      model: "Dual GPU: Intel UHD 630 + NVIDIA GTX 1050 Ti",
      specs: "Integrated + Discrete graphics setup",
      xenCompatibility: "Very Good",
      optimizations: [
        "Intel UHD 630: Perfect for host display and basic VMs",
        "NVIDIA GTX 1050 Ti: Excellent for GPU passthrough",
        "IOMMU support enables secure GPU delegation",
        "Near-native gaming performance in VMs possible"
      ],
      recommendations: [
        "Use Intel graphics for host and Domain 0",
        "Configure NVIDIA for passthrough to gaming VMs",
        "Enable IOMMU in BIOS for secure passthrough",
        "Install NVIDIA drivers in guest, not host",
        "Consider Optimus configuration for power management"
      ]
    },
    {
      component: "Storage", 
      model: "SSD + HDD Hybrid Configuration",
      specs: "128GB SSD + 1TB HDD (typical)",
      xenCompatibility: "Good",
      optimizations: [
        "SSD provides fast boot and Domain 0 performance",
        "HDD offers bulk storage for VM images",
        "Hybrid configuration balances speed and capacity",
        "LVM can span both drives for flexibility"
      ],
      recommendations: [
        "Install Xen hypervisor on SSD for best performance",
        "Store frequently used VM images on SSD",
        "Use HDD for backup VMs and ISO storage",
        "Configure LVM for dynamic storage management",
        "Enable TRIM support for SSD longevity"
      ]
    }
  ];

  const performanceTuning = {
    bios: [
      "Enable Intel Virtualization Technology (VT-x)",
      "Enable VT-d for IOMMU support",
      "Disable Intel SpeedStep for consistent performance",
      "Set memory frequency to rated speed (2666MHz)",
      "Enable XMP profile if available",
      "Disable unnecessary integrated peripherals"
    ],
    os: [
      "Disable Windows fast startup",
      "Set power plan to 'High Performance'",
      "Disable Windows Hyper-V (conflicts with VMware)",
      "Configure NVIDIA Optimus for discrete GPU preference",
      "Disable Windows auto-updates during Xen testing",
      "Configure VMware for maximum performance"
    ],
    xen: [
      "Use Credit scheduler with optimized weights",
      "Configure CPU pinning for critical domains",
      "Enable huge pages for memory-intensive VMs",
      "Optimize network bridge configuration",
      "Configure IOMMU groups for GPU passthrough",
      "Use paravirtualized drivers where possible"
    ]
  };

  const resourceAllocation = {
    scenario1: {
      name: "Development & Testing",
      description: "Balanced allocation for learning and development",
      allocation: {
        "Host OS (Windows)": "8GB RAM, 2 cores",
        "Domain 0 (Xen)": "8GB RAM, 2 cores", 
        "Development VM": "12GB RAM, 4 cores",
        "Test VMs": "4GB RAM, 2 cores each",
        "Reserve": "4GB RAM"
      }
    },
    scenario2: {
      name: "Gaming & Entertainment", 
      description: "Optimized for gaming VM with GPU passthrough",
      allocation: {
        "Host OS": "6GB RAM, 1 core",
        "Domain 0": "6GB RAM, 1 core",
        "Gaming VM": "18GB RAM, 6 cores + GPU",
        "Reserve": "2GB RAM"
      }
    },
    scenario3: {
      name: "Multi-VM Laboratory",
      description: "Maximum VM density for testing scenarios",
      allocation: {
        "Host OS": "8GB RAM, 2 cores",
        "Domain 0": "6GB RAM, 2 cores",
        "VM 1-4": "4GB RAM, 1 core each",
        "Reserve": "2GB RAM"
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          💻 Hardware Profile & Optimization
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Complete analysis and optimization guide for your HP Pavilion Gaming laptop
        </p>
      </div>

      {/* Compatibility Overview */}
      <Card className="border-2 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <span>🎯</span>
              <span>Xen Compatibility Score</span>
            </span>
            <Badge className="bg-green-600 text-white text-lg px-4 py-2">
              {compatibilityScore}%
            </Badge>
          </CardTitle>
          <CardDescription>
            Your HP Pavilion Gaming 15-cx0049ne is excellently suited for Xen virtualization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={compatibilityScore} className="h-4 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">✅ Excellent Features</h4>
              <ul className="text-sm space-y-1">
                <li>• Intel VT-x hardware virtualization support</li>
                <li>• 32GB RAM (4x the minimum requirement)</li>
                <li>• Dual GPU setup perfect for passthrough</li>
                <li>• Modern Intel chipset with IOMMU support</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-600">⚠️ Considerations</h4>
              <ul className="text-sm space-y-1">
                <li>• Laptop thermal management important</li>
                <li>• Power consumption increases with multiple VMs</li>
                <li>• GPU passthrough requires BIOS configuration</li>
                <li>• Storage may need external expansion for large labs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hardware Analysis */}
      <Tabs defaultValue="cpu" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cpu">🔋 CPU</TabsTrigger>
          <TabsTrigger value="memory">💾 Memory</TabsTrigger>
          <TabsTrigger value="graphics">🎮 Graphics</TabsTrigger>
          <TabsTrigger value="storage">💿 Storage</TabsTrigger>
        </TabsList>

        {hardwareSpecs.map((spec) => (
          <TabsContent key={spec.component.toLowerCase()} value={spec.component.toLowerCase()}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{spec.component} Analysis</span>
                    <Badge className="bg-blue-600 text-white">
                      {spec.xenCompatibility}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {spec.model} - {spec.specs}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">
                        🚀 Xen Optimizations
                      </h4>
                      <ul className="space-y-1 text-sm">
                        {spec.optimizations.map((opt, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span className="text-slate-700 dark:text-slate-300">{opt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>📋 Implementation Recommendations</CardTitle>
                  <CardDescription>
                    Step-by-step optimization guide
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {spec.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <Badge variant="outline" className="text-xs">
                          {index + 1}
                        </Badge>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{rec}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Resource Allocation Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>📊</span>
            <span>Resource Allocation Scenarios</span>
          </CardTitle>
          <CardDescription>
            Optimized allocation strategies for your 32GB RAM configuration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Object.entries(resourceAllocation).map(([key, scenario]) => (
              <Card key={key} className="border-2 border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg">{scenario.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {scenario.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(scenario.allocation).map(([component, allocation]) => (
                      <div key={component} className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {component}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {allocation}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Tuning Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>⚡</span>
            <span>Performance Tuning Guide</span>
          </CardTitle>
          <CardDescription>
            Layer-by-layer optimization for maximum Xen performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bios" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bios">🔧 BIOS</TabsTrigger>
              <TabsTrigger value="os">💻 OS Level</TabsTrigger>
              <TabsTrigger value="xen">🌐 Xen Level</TabsTrigger>
            </TabsList>

            <TabsContent value="bios">
              <div className="space-y-4">
                <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/20">
                  <AlertDescription className="text-amber-800 dark:text-amber-200">
                    <strong>Important:</strong> BIOS changes require careful attention. Make note of original settings.
                  </AlertDescription>
                </Alert>
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    HP Pavilion Gaming BIOS Optimization
                  </h4>
                  {performanceTuning.bios.map((setting, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <Badge variant="outline" className="text-xs">
                        {index + 1}
                      </Badge>
                      <p className="text-sm text-slate-700 dark:text-slate-300">{setting}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="os">
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 dark:text-white">
                  Operating System Optimization
                </h4>
                {performanceTuning.os.map((setting, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <Badge variant="outline" className="text-xs">
                      {index + 1}
                    </Badge>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{setting}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="xen">
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 dark:text-white">
                  Xen Hypervisor Optimization
                </h4>
                {performanceTuning.xen.map((setting, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <Badge variant="outline" className="text-xs">
                      {index + 1}
                    </Badge>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{setting}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Benchmarking Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>📈</span>
            <span>Performance Benchmarking</span>
          </CardTitle>
          <CardDescription>
            Tools and commands to measure your Xen performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 dark:text-white">System Monitoring Commands</h4>
              <div className="space-y-3">
                {[
                  "xl info  # Xen hypervisor information",
                  "xl list  # Domain status and resource usage", 
                  "xl vcpu-list  # Virtual CPU allocation",
                  "xl dmesg  # Xen hypervisor messages",
                  "xentop  # Real-time Xen performance monitor",
                  "free -h  # System memory usage",
                  "htop  # CPU and process monitoring",
                  "iotop  # I/O performance monitoring"
                ].map((command, index) => (
                  <div key={index} className="bg-slate-900 dark:bg-slate-800 rounded p-3">
                    <code className="text-green-400 text-sm">{command}</code>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 dark:text-white">Performance Benchmarks</h4>
              <div className="space-y-3">
                {[
                  { test: "CPU Performance", command: "sysbench cpu run", target: "> 95% native" },
                  { test: "Memory Bandwidth", command: "mbw 1024", target: "> 20 GB/s" },
                  { test: "Disk I/O", command: "fio --name=test --size=1G --rw=randread", target: "> 500 IOPS" },
                  { test: "Network Throughput", command: "iperf3 -c target", target: "> 900 Mbps" },
                  { test: "VM Boot Time", command: "time xl create vm.cfg", target: "< 30 seconds" },
                  { test: "GPU Performance", command: "glxgears (in guest)", target: "> 90% native" }
                ].map((benchmark, index) => (
                  <div key={index} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm text-slate-900 dark:text-white">
                        {benchmark.test}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {benchmark.target}
                      </Badge>
                    </div>
                    <code className="text-xs text-slate-600 dark:text-slate-400">
                      {benchmark.command}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex justify-center space-x-4">
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          📥 Download Optimization Scripts
        </Button>
        <Button variant="outline">
          🔄 Run Hardware Detection
        </Button>
        <Button variant="outline">
          📊 Generate Performance Report
        </Button>
      </div>
    </div>
  );
}