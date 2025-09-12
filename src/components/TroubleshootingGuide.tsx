"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function TroubleshootingGuide() {
  const [searchTerm, setSearchTerm] = useState("");

  const troubleshootingCategories = {
    installation: {
      title: "Installation Issues",
      emoji: "🔧",
      issues: [
        {
          problem: "Xen not appearing in GRUB menu",
          severity: "High",
          symptoms: ["No Xen option in boot menu", "System boots normally to Linux"],
          solutions: [
            "Update GRUB configuration: sudo update-grub",
            "Verify Xen packages installed: dpkg -l | grep xen",
            "Check GRUB_DEFAULT in /etc/default/grub",
            "Manually add Xen entry if needed"
          ],
          prevention: "Always update GRUB after Xen installation"
        },
        {
          problem: "VT-x not enabled error",
          severity: "Critical",
          symptoms: ["Error during domain creation", "HVM domains fail to start"],
          solutions: [
            "Restart and enter BIOS (F10 on HP Pavilion)",
            "Navigate to Advanced > CPU Configuration",
            "Enable 'Intel Virtualization Technology'",
            "Enable 'VT-d' if available",
            "Save and exit BIOS"
          ],
          prevention: "Verify BIOS settings before Xen installation"
        },
        {
          problem: "Domain 0 memory issues",
          severity: "Medium",
          symptoms: ["High memory usage in dom0", "Poor VM performance"],
          solutions: [
            "Add dom0_mem=8G,max:8G to Xen command line",
            "Edit /etc/default/grub",
            "Update GRUB: sudo update-grub",
            "Reboot to apply changes"
          ],
          prevention: "Always set fixed dom0 memory allocation"
        }
      ]
    },
    hardware: {
      title: "HP Pavilion Specific",
      emoji: "💻",
      issues: [
        {
          problem: "NVIDIA GPU not isolated for passthrough",
          severity: "High",
          symptoms: ["GPU visible in dom0", "Cannot assign to guest VM"],
          solutions: [
            "Enable VT-d in BIOS advanced settings",
            "Add intel_iommu=on to kernel parameters",
            "Blacklist nvidia driver: echo 'blacklist nvidia' >> /etc/modprobe.d/blacklist.conf",
            "Configure VFIO: echo 'vfio-pci' >> /etc/modules",
            "Update initramfs: sudo update-initramfs -u"
          ],
          prevention: "Configure GPU isolation before installing NVIDIA drivers"
        },
        {
          problem: "Overheating with multiple VMs",
          severity: "Medium", 
          symptoms: ["High CPU temperatures", "Thermal throttling", "Performance degradation"],
          solutions: [
            "Monitor temperatures: sensors command",
            "Reduce concurrent VM count",
            "Lower CPU frequency: cpufreq-set -f 2000000",
            "Improve laptop cooling (external fan)",
            "Adjust scheduler weights to reduce CPU load"
          ],
          prevention: "Monitor thermal performance and plan VM workloads accordingly"
        },
        {
          problem: "32GB RAM not fully recognized",
          severity: "Low",
          symptoms: ["System shows less than 32GB", "Memory allocation errors"],
          solutions: [
            "Check BIOS memory settings",
            "Run memory test: memtest86+",
            "Verify modules seated properly",
            "Update BIOS to latest version",
            "Check for 32-bit OS limitations"
          ],
          prevention: "Verify hardware compatibility before RAM upgrade"
        }
      ]
    },
    networking: {
      title: "Networking Problems",
      emoji: "🌐",
      issues: [
        {
          problem: "Bridge network not working",
          severity: "High",
          symptoms: ["VMs cannot access network", "No internet in guests"],
          solutions: [
            "Check bridge exists: brctl show",
            "Verify interface assignment: ip addr show",
            "Restart networking: sudo systemctl restart networking",
            "Check bridge configuration in /etc/netplan/",
            "Apply netplan: sudo netplan apply"
          ],
          prevention: "Test bridge configuration before creating VMs"
        },
        {
          problem: "Poor network performance in VMs",
          severity: "Medium",
          symptoms: ["Slow network speeds", "High latency", "Network timeouts"],
          solutions: [
            "Use paravirtualized network drivers",
            "Increase network buffer sizes",
            "Check for network bridge loops",
            "Monitor with: xl network-list",
            "Configure SR-IOV if supported"
          ],
          prevention: "Use PV drivers instead of emulated devices"
        }
      ]
    },
    performance: {
      title: "Performance Issues",
      emoji: "⚡",
      issues: [
        {
          problem: "Slow VM performance",
          severity: "Medium",
          symptoms: ["Sluggish guest OS", "Poor application performance"],
          solutions: [
            "Check CPU allocation: xl vcpu-list",
            "Verify memory allocation: xl list",
            "Use paravirtualized drivers",
            "Pin VCPUs: xl vcpu-pin domain vcpu pcpu",
            "Adjust scheduler weights: xl sched-credit"
          ],
          prevention: "Properly size VMs and use PV drivers"
        },
        {
          problem: "High dom0 CPU usage",
          severity: "High",
          symptoms: ["dom0 consuming excessive CPU", "Poor overall system performance"],
          solutions: [
            "Check I/O intensive domains",
            "Use dedicated driver domains",
            "Implement CPU pinning for dom0",
            "Monitor with xentop",
            "Consider stub domains for HVM"
          ],
          prevention: "Limit dom0 responsibilities and use driver domains"
        }
      ]
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          🔧 Troubleshooting Guide
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Comprehensive solutions for HP Pavilion Gaming + Xen Project issues
        </p>
      </div>

      {/* Emergency Quick Fixes */}
      <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
        <AlertDescription className="text-red-800 dark:text-red-200">
          <strong>🚨 Emergency Recovery:</strong> If your system is unbootable, select previous GRUB entry or boot from recovery media.
          Always keep a backup of working configurations!
        </AlertDescription>
      </Alert>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🔍</span>
            <span>Search Issues</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Describe your problem or search for solutions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Issue Categories */}
      <Tabs defaultValue="installation" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="installation">🔧 Installation</TabsTrigger>
          <TabsTrigger value="hardware">💻 Hardware</TabsTrigger>
          <TabsTrigger value="networking">🌐 Network</TabsTrigger>
          <TabsTrigger value="performance">⚡ Performance</TabsTrigger>
        </TabsList>

        {Object.entries(troubleshootingCategories).map(([key, category]) => (
          <TabsContent key={key} value={key}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>{category.emoji}</span>
                  <span>{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.issues
                    .filter(issue => 
                      searchTerm === "" ||
                      issue.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      issue.symptoms.some(symptom => 
                        symptom.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                    )
                    .map((issue, index) => (
                    <AccordionItem key={index} value={`${key}-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center space-x-3">
                          <Badge className={
                            issue.severity === "Critical" ? "bg-red-600" :
                            issue.severity === "High" ? "bg-orange-600" :
                            "bg-yellow-600"
                          }>
                            {issue.severity}
                          </Badge>
                          <span className="font-medium">{issue.problem}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-4">
                          {/* Symptoms */}
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                              🔍 Symptoms
                            </h4>
                            <ul className="space-y-1">
                              {issue.symptoms.map((symptom, i) => (
                                <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-center space-x-2">
                                  <span className="text-red-500">•</span>
                                  <span>{symptom}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Solutions */}
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                              ✅ Solutions
                            </h4>
                            <div className="space-y-2">
                              {issue.solutions.map((solution, i) => (
                                <div key={i} className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                  <Badge variant="outline" className="text-xs">
                                    {i + 1}
                                  </Badge>
                                  <p className="text-sm text-green-800 dark:text-green-200">
                                    {solution}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Prevention */}
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                              🛡️ Prevention
                            </h4>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                              {issue.prevention}
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* HP Pavilion Specific Help */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🏥</span>
            <span>HP Pavilion Gaming Emergency Procedures</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 dark:text-white">
                🚨 System Recovery Steps
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <h5 className="font-medium text-red-800 dark:text-red-200">
                    1. Cannot Boot into Xen
                  </h5>
                  <ul className="text-sm text-red-700 dark:text-red-300 mt-1 space-y-1">
                    <li>• Select "Advanced options" in GRUB</li>
                    <li>• Choose previous kernel version</li>
                    <li>• Boot into recovery mode if needed</li>
                  </ul>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <h5 className="font-medium text-orange-800 dark:text-orange-200">
                    2. VM Creation Failures
                  </h5>
                  <ul className="text-sm text-orange-700 dark:text-orange-300 mt-1 space-y-1">
                    <li>• Check available memory: xl info</li>
                    <li>• Verify storage paths exist</li>
                    <li>• Test with minimal configuration</li>
                  </ul>
                </div>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h5 className="font-medium text-yellow-800 dark:text-yellow-200">
                    3. Performance Degradation
                  </h5>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 mt-1 space-y-1">
                    <li>• Check thermal throttling: sensors</li>
                    <li>• Reduce VM resource allocation</li>
                    <li>• Clean laptop vents and fans</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 dark:text-white">
                📞 Support Resources
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h5 className="font-medium text-blue-800 dark:text-blue-200">
                    Community Support
                  </h5>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 mt-1 space-y-1">
                    <li>• Xen Project mailing lists</li>
                    <li>• #xen IRC channel on libera.chat</li>
                    <li>• Stack Overflow [xen] tag</li>
                    <li>• Reddit r/virtualization</li>
                  </ul>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h5 className="font-medium text-green-800 dark:text-green-200">
                    Documentation
                  </h5>
                  <ul className="text-sm text-green-700 dark:text-green-300 mt-1 space-y-1">
                    <li>• Official Xen Project wiki</li>
                    <li>• Intel VT-x documentation</li>
                    <li>• HP support for BIOS updates</li>
                    <li>• VMware Workstation guides</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diagnostic Commands */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🩺</span>
            <span>Diagnostic Commands</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 dark:text-white">
                System Health Check
              </h4>
              <div className="space-y-2">
                {[
                  "xl info  # Xen hypervisor status",
                  "xl list  # Domain status and resources",
                  "xl dmesg  # Xen kernel messages", 
                  "dmesg | grep -i xen  # System Xen messages",
                  "free -h  # Memory usage",
                  "lscpu  # CPU information",
                  "lspci | grep VGA  # Graphics card status",
                  "brctl show  # Network bridge status"
                ].map((command, index) => (
                  <div key={index} className="bg-slate-900 dark:bg-slate-800 rounded p-3">
                    <code className="text-green-400 text-sm">{command}</code>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 dark:text-white">
                Performance Monitoring
              </h4>
              <div className="space-y-2">
                {[
                  "xentop  # Real-time Xen performance",
                  "htop  # CPU and memory monitoring",
                  "iotop  # I/O performance",
                  "nethogs  # Network usage by process",
                  "sensors  # Temperature monitoring",
                  "xl vcpu-list  # vCPU allocation",
                  "xl sched-credit  # Scheduler information",
                  "cat /proc/meminfo  # Detailed memory info"
                ].map((command, index) => (
                  <div key={index} className="bg-slate-900 dark:bg-slate-800 rounded p-3">
                    <code className="text-blue-400 text-sm">{command}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Still Need Help?
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Our troubleshooting guide covers most common issues. For additional support:
        </p>
        <div className="flex justify-center space-x-4">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
            💬 Join Community Forum
          </Button>
          <Button variant="outline">
            📧 Contact Expert Support
          </Button>
          <Button variant="outline">
            📋 Submit Bug Report
          </Button>
        </div>
      </div>
    </div>
  );
}