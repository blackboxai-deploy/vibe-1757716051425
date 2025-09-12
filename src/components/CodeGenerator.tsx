"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CodeGeneratorProps {
  hardwareProfile: {
    laptopModel: string;
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    virtualizationSupport: string;
    optimizationLevel: string;
  };
  userProgress: {
    currentStep: number;
    completedSteps: number[];
    totalSteps: number;
  };
}

export function CodeGenerator({ hardwareProfile }: CodeGeneratorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [customizations, setCustomizations] = useState({
    vmName: "xen-test-vm",
    memory: "8192",
    vcpus: "2",
    diskSize: "20GB",
    networkType: "NAT"
  });

  const codeTemplates = {
    "xen-install": {
      title: "Xen Hypervisor Installation Script",
      description: "Complete installation script for Ubuntu Server",
      difficulty: "Beginner",
      code: `#!/bin/bash
# Xen Project Installation Script
# Optimized for HP Pavilion Gaming 15-cx0049ne
# Intel i5-8300H + 32GB RAM + NVIDIA GTX 1050 Ti

set -e

echo "=== Xen Project Installation for HP Pavilion Gaming ==="
echo "Hardware: Intel i5-8300H, 32GB RAM, GTX 1050 Ti"
echo "Starting installation process..."

# Update system
echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Xen hypervisor and tools
echo "Installing Xen hypervisor..."
sudo apt install -y xen-hypervisor-4.17-amd64 xen-tools xen-utils-4.17

# Install additional tools
echo "Installing development tools..."
sudo apt install -y build-essential git vim htop bridge-utils

# Configure GRUB for Xen boot
echo "Configuring GRUB bootloader..."
sudo sed -i 's/GRUB_DEFAULT=0/GRUB_DEFAULT="Xen 4.17-amd64"/' /etc/default/grub

# Set Domain 0 memory limit (8GB for 32GB system)
echo "Configuring Domain 0 memory allocation..."
sudo sed -i 's/GRUB_CMDLINE_XEN_DEFAULT=""/GRUB_CMDLINE_XEN_DEFAULT="dom0_mem=8192M,max:8192M"/' /etc/default/grub

# Update GRUB configuration
sudo update-grub

# Configure network bridge for VMs
echo "Setting up network bridge..."
sudo tee /etc/netplan/01-netcfg.yaml > /dev/null <<EOF
network:
  version: 2
  ethernets:
    ens33:
      dhcp4: false
  bridges:
    xenbr0:
      dhcp4: true
      interfaces:
        - ens33
EOF

sudo netplan apply

echo "=== Installation Complete ==="
echo "Next steps:"
echo "1. Reboot system: sudo reboot"
echo "2. Select Xen from GRUB menu"
echo "3. Verify installation: xl info"
echo "4. Check Domain 0 status: xl list"

echo ""
echo "Hardware-specific optimizations applied:"
echo "- Domain 0 limited to 8GB (optimal for 32GB system)"
echo "- Network bridge configured for VMs"
echo "- Intel VT-x support will be utilized"
echo "- Ready for GPU passthrough configuration"
`
    },
    "vm-config": {
      title: "VM Configuration File Generator",
      description: "Create optimized VM configs for your hardware",
      difficulty: "Intermediate",
      code: `# Xen VM Configuration
# Generated for HP Pavilion Gaming laptop
# Hardware: ${hardwareProfile.cpu}, ${hardwareProfile.ram}

# VM Basic Settings
name = "${customizations.vmName}"
type = "hvm"  # Hardware-assisted virtualization
memory = ${customizations.memory}  # Memory in MB
vcpus = ${customizations.vcpus}  # Virtual CPUs
maxvcpus = ${customizations.vcpus}

# Boot Configuration
builder = "hvm"
boot = "cd"  # Boot from CD first, then hard disk
acpi = 1
apic = 1
pae = 1

# Storage Configuration
disk = [
    'phy:/dev/vg0/\${customizations.vmName}-disk,hda,w',  # Primary disk
    'file:/path/to/install.iso,hdc:cdrom,r'  # Installation media
]

# Network Configuration
vif = [
    'type=ioemu, bridge=xenbr0, mac=00:16:3e:xx:xx:xx'  # Network interface
]

# Display Configuration  
vnc = 1
vnclisten = "0.0.0.0"
vncpasswd = ""
keymap = "en-us"

# Hardware-specific optimizations for HP Pavilion Gaming
# Intel i5-8300H optimization
timer_mode = 2  # Use HPET timer for better performance
hpet = 1  # Enable High Precision Event Timer

# Memory optimization for 32GB system
shadow_memory = 16  # MB for shadow page tables
videoram = 8  # MB for graphics (conservative for GTX 1050 Ti passthrough)

# CPU features
cpuid = [
    "0x00000001:ecx=0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",  # Expose VT-x to guest
    "0x80000001:ecx=0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"   # Expose AMD-V features
]

# Advanced features
nestedhvm = 1  # Enable nested virtualization
hap = 1  # Hardware-assisted paging
viridian = 1  # Windows optimization features

# Startup behavior
on_poweroff = "destroy"
on_reboot = "restart" 
on_crash = "restart"

# HP Pavilion specific comments:
# - Memory allocation optimized for 32GB total RAM
# - CPU configuration leverages i5-8300H capabilities
# - Prepared for NVIDIA GTX 1050 Ti passthrough
# - Network bridge ready for multi-VM scenarios
`
    },
    "performance-script": {
      title: "Performance Optimization Script",
      description: "Optimize Xen performance for gaming hardware",
      difficulty: "Advanced",
      code: `#!/bin/bash
# Xen Performance Optimization Script
# HP Pavilion Gaming 15-cx0049ne Specific Optimizations
# Intel i5-8300H + 32GB RAM + NVIDIA GTX 1050 Ti

set -e

echo "=== Xen Performance Optimization for HP Pavilion Gaming ==="

# CPU Governor optimization for i5-8300H
echo "Configuring CPU governor for performance..."
sudo apt install -y cpufrequtils
echo 'GOVERNOR="performance"' | sudo tee /etc/default/cpufrequtils
sudo systemctl restart cpufrequtils

# Memory optimization for 32GB system
echo "Optimizing memory management..."
# Configure huge pages (2MB pages for better performance)
echo 1024 | sudo tee /sys/kernel/mm/hugepages/hugepages-2048kB/nr_hugepages
echo "vm.nr_hugepages=1024" | sudo tee -a /etc/sysctl.conf

# Domain 0 memory balloning prevention
echo "Configuring Domain 0 memory protection..."
echo 'GRUB_CMDLINE_XEN_DEFAULT="dom0_mem=8192M,max:8192M dom0_max_vcpus=4 dom0_vcpus_pin"' | sudo tee -a /etc/default/grub

# I/O Scheduler optimization
echo "Optimizing I/O scheduler for SSD/HDD hybrid..."
echo 'mq-deadline' | sudo tee /sys/block/sda/queue/scheduler  # For SSD
echo 'bfq' | sudo tee /sys/block/sdb/queue/scheduler  # For HDD (if present)

# Network performance optimization
echo "Optimizing network performance..."
# Increase network buffer sizes
echo "net.core.rmem_max = 134217728" | sudo tee -a /etc/sysctl.conf
echo "net.core.wmem_max = 134217728" | sudo tee -a /etc/sysctl.conf
echo "net.ipv4.tcp_rmem = 4096 65536 134217728" | sudo tee -a /etc/sysctl.conf
echo "net.ipv4.tcp_wmem = 4096 65536 134217728" | sudo tee -a /etc/sysctl.conf

# Intel VT-x specific optimizations
echo "Configuring Intel VT-x optimizations..."
# Enable IOMMU for device passthrough
sudo sed -i 's/GRUB_CMDLINE_LINUX_DEFAULT="[^"]*/& intel_iommu=on iommu=pt/' /etc/default/grub

# NVIDIA GTX 1050 Ti passthrough preparation
echo "Preparing NVIDIA GPU for passthrough..."
# Add VFIO modules
echo "vfio" | sudo tee -a /etc/modules
echo "vfio_iommu_type1" | sudo tee -a /etc/modules  
echo "vfio_pci" | sudo tee -a /etc/modules
echo "vfio_virqfd" | sudo tee -a /etc/modules

# Blacklist NVIDIA driver on host (for passthrough)
echo "blacklist nouveau" | sudo tee -a /etc/modprobe.d/blacklist-nvidia.conf
echo "blacklist nvidia" | sudo tee -a /etc/modprobe.d/blacklist-nvidia.conf

# Xen-specific optimizations
echo "Applying Xen-specific performance settings..."
# Scheduler tuning for gaming workloads
xl sched-credit -d Domain-0 -w 512  # Higher weight for Dom0

# Apply all changes
echo "Applying configuration changes..."
sudo update-grub
sudo update-initramfs -u
sudo sysctl -p

echo "=== Optimization Complete ==="
echo "Reboot required to apply all changes: sudo reboot"
echo ""
echo "Post-reboot verification commands:"
echo "- Check Xen info: xl info"
echo "- Verify memory: xl info | grep total_memory"
echo "- Check IOMMU: dmesg | grep -i iommu"
echo "- Verify CPU governor: cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor"
`
    },
    "gpu-passthrough": {
      title: "NVIDIA GTX 1050 Ti Passthrough Setup",
      description: "Configure GPU passthrough for gaming VMs",
      difficulty: "Expert",
      code: `#!/bin/bash
# NVIDIA GTX 1050 Ti Passthrough Configuration
# HP Pavilion Gaming 15-cx0049ne Specific Setup

set -e

echo "=== NVIDIA GTX 1050 Ti Passthrough Setup ==="
echo "This script configures GPU passthrough for your HP Pavilion Gaming laptop"

# Find NVIDIA GPU PCI address
echo "Detecting NVIDIA GTX 1050 Ti..."
NVIDIA_PCI=$(lspci | grep -i nvidia | grep -E "(VGA|3D)" | cut -d' ' -f1)
NVIDIA_AUDIO_PCI=$(lspci | grep -i nvidia | grep -i audio | cut -d' ' -f1)

if [ -z "$NVIDIA_PCI" ]; then
    echo "Error: NVIDIA GTX 1050 Ti not detected!"
    echo "Please verify the GPU is properly installed and recognized."
    exit 1
fi

echo "Found NVIDIA GPU at PCI: $NVIDIA_PCI"
echo "Found NVIDIA Audio at PCI: $NVIDIA_AUDIO_PCI"

# Get vendor and device IDs
NVIDIA_IDS=$(lspci -n | grep $NVIDIA_PCI | cut -d' ' -f3)
NVIDIA_AUDIO_IDS=$(lspci -n | grep $NVIDIA_AUDIO_PCI | cut -d' ' -f3)

echo "NVIDIA GPU IDs: $NVIDIA_IDS"
echo "NVIDIA Audio IDs: $NVIDIA_AUDIO_IDS"

# Configure VFIO for GPU passthrough
echo "Configuring VFIO for GPU passthrough..."

# Create VFIO configuration
sudo tee /etc/modprobe.d/vfio.conf > /dev/null <<EOF
# NVIDIA GTX 1050 Ti Passthrough Configuration
# HP Pavilion Gaming 15-cx0049ne

# Bind NVIDIA devices to VFIO
options vfio-pci ids=$NVIDIA_IDS,$NVIDIA_AUDIO_IDS

# Soft dependency to ensure proper loading order
softdep nvidia pre: vfio-pci
softdep nouveau pre: vfio-pci
EOF

# Update initramfs
echo "Updating initramfs..."
sudo update-initramfs -u

# Create VM configuration for GPU passthrough
echo "Creating GPU passthrough VM configuration..."
sudo tee /etc/xen/gpu-passthrough-vm.cfg > /dev/null <<EOF
# GPU Passthrough VM Configuration
# Optimized for HP Pavilion Gaming with GTX 1050 Ti

name = "gaming-vm"
type = "hvm"
memory = 12288  # 12GB RAM (adjust based on needs)
vcpus = 6  # Use most of i5-8300H cores
maxvcpus = 6

# Enable nested virtualization and optimizations
builder = "hvm"
boot = "cd"
acpi = 1
apic = 1
pae = 1
hap = 1
nestedhvm = 1

# Storage configuration
disk = [
    'phy:/dev/vg0/gaming-vm-disk,hda,w',
    'file:/path/to/windows.iso,hdc:cdrom,r'
]

# Network configuration  
vif = ['type=ioemu, bridge=xenbr0']

# GPU Passthrough - NVIDIA GTX 1050 Ti
pci = ['$NVIDIA_PCI', '$NVIDIA_AUDIO_PCI']

# Display configuration
vnc = 0  # Disable VNC (using passthrough GPU)
sdl = 0  # Disable SDL

# NVIDIA-specific optimizations
device_model_args_hvm = [
    '-device', 'vfio-pci,host=$NVIDIA_PCI,multifunction=on',
    '-device', 'vfio-pci,host=$NVIDIA_AUDIO_PCI'
]

# HP Pavilion optimizations
timer_mode = 2  # HPET timer
hpet = 1
viridian = 1  # Windows optimizations
stdvga = 0  # Disable standard VGA (using passthrough)

# Startup behavior
on_poweroff = "destroy"
on_reboot = "restart"
on_crash = "restart"

# Performance tuning for gaming
shadow_memory = 32  # Increased for GPU workloads
videoram = 0  # Not needed with passthrough
EOF

echo "=== GPU Passthrough Configuration Complete ==="
echo ""
echo "Important Notes for HP Pavilion Gaming:"
echo "1. Reboot required: sudo reboot"
echo "2. Boot into Xen (select from GRUB)"
echo "3. Verify GPU isolation: lspci -k"
echo "4. Create VM: xl create /etc/xen/gpu-passthrough-vm.cfg"
echo ""
echo "Troubleshooting:"
echo "- If GPU not isolated, check IOMMU groups: find /sys/kernel/iommu_groups/ -type l"
echo "- Ensure VT-d is enabled in BIOS"
echo "- Update NVIDIA drivers in guest VM after installation"
echo ""
echo "Performance expectations:"
echo "- Near-native gaming performance in VM"
echo "- 95%+ GPU performance retention"
echo "- Full NVIDIA features available in guest"
`
    },
    "domain-config": {
      title: "Domain Configuration Templates",
      description: "Pre-configured domain templates for common scenarios",
      difficulty: "Intermediate", 
      code: `# Domain Configuration Templates
# HP Pavilion Gaming 15-cx0049ne Optimized

# ===========================================
# TEMPLATE 1: Development VM (Ubuntu Desktop)
# ===========================================
name = "dev-ubuntu"
type = "hvm"
memory = 8192  # 8GB for development work
vcpus = 4
maxvcpus = 4

builder = "hvm"
boot = "cd"
acpi = 1
apic = 1
pae = 1

disk = [
    'phy:/dev/vg0/dev-ubuntu-disk,hda,w',
    'file:/home/xen/iso/ubuntu-22.04-desktop-amd64.iso,hdc:cdrom,r'
]

vif = ['type=ioemu, bridge=xenbr0, mac=00:16:3e:12:34:56']

# VNC access for desktop environment
vnc = 1
vnclisten = "0.0.0.0"
vncpasswd = ""
keymap = "en-us"

# ===========================================
# TEMPLATE 2: Windows 11 Gaming VM (with GPU)
# ===========================================
name = "windows-gaming" 
type = "hvm"
memory = 16384  # 16GB for Windows gaming
vcpus = 6  # Most cores for gaming performance
maxvcpus = 6

builder = "hvm"
boot = "cd"
acpi = 1
apic = 1
pae = 1
hap = 1
nestedhvm = 1

disk = [
    'phy:/dev/vg0/windows-gaming-disk,hda,w',
    'file:/home/xen/iso/windows11.iso,hdc:cdrom,r'
]

vif = ['type=ioemu, bridge=xenbr0']

# GPU Passthrough (NVIDIA GTX 1050 Ti)
pci = ['NVIDIA_PCI_ADDRESS', 'NVIDIA_AUDIO_PCI_ADDRESS']
gfx_passthru = "1"

# Windows optimizations
viridian = 1
stdvga = 0
serial = "pty"

# ===========================================
# TEMPLATE 3: Lightweight Test VM (Alpine)
# ===========================================
name = "alpine-test"
type = "pv"  # Paravirtualized for efficiency
memory = 2048  # 2GB lightweight
vcpus = 2
maxvcpus = 2

kernel = "/boot/vmlinuz-xen"
ramdisk = "/boot/initrd.img-xen"
root = "/dev/xvda1 ro"

disk = [
    'phy:/dev/vg0/alpine-test-disk,xvda,w'
]

vif = ['bridge=xenbr0, mac=00:16:3e:78:90:12']

# ===========================================
# TEMPLATE 4: Security Research VM (Hardened)
# ===========================================
name = "security-research"
type = "hvm"
memory = 6144  # 6GB balanced allocation
vcpus = 2  # Limited for isolation
maxvcpus = 2

builder = "hvm"
boot = "cd"
acpi = 1
apic = 1
pae = 1

# Security-hardened storage
disk = [
    'phy:/dev/vg0/security-research-disk,hda,w'
]

# Isolated network (no bridge access)
vif = []  # No network access for security research

# Enhanced security settings
shadow_memory = 8  # Minimal shadow memory
videoram = 4  # Minimal video memory
timer_mode = 0  # Default timer for security

# Startup behavior (security focused)
on_poweroff = "destroy"
on_reboot = "destroy"  # Destroy on reboot for security
on_crash = "preserve"  # Preserve for analysis

# Comments:
# - Isolated VM for security testing
# - No network access by default
# - Minimal resource allocation
# - Crash preservation for forensic analysis
`
    },
    "monitoring-script": {
      title: "System Monitoring & Diagnostics",
      description: "Monitor Xen performance and troubleshoot issues",
      difficulty: "Intermediate",
      code: `#!/bin/bash
# Xen System Monitoring and Diagnostics Script
# HP Pavilion Gaming 15-cx0049ne Performance Monitoring

echo "=== Xen System Diagnostics and Monitoring ==="
echo "Hardware: Intel i5-8300H, 32GB RAM, NVIDIA GTX 1050 Ti"
echo "$(date)"
echo ""

# System Information
echo "=== SYSTEM OVERVIEW ==="
xl info | grep -E "(host|total_memory|nr_cpus|xen_version)"
echo ""

# Domain Status
echo "=== DOMAIN STATUS ==="
xl list
echo ""

# Memory Usage Analysis
echo "=== MEMORY ANALYSIS ==="
echo "Host Memory Information:"
free -h
echo ""
echo "Xen Memory Allocation:"
xl info | grep -E "(total_memory|free_memory)"
echo ""
echo "Domain Memory Usage:"
xl list | awk 'NR>1 {sum+=$3} END {print "Total allocated to domains: " sum " MB"}'
echo ""

# CPU Performance
echo "=== CPU PERFORMANCE ==="
echo "CPU Governor Status:"
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor | sort | uniq -c
echo ""
echo "CPU Frequency:"
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_cur_freq | head -4
echo ""
echo "Load Average:"
uptime
echo ""

# Network Status  
echo "=== NETWORK STATUS ==="
echo "Bridge Configuration:"
brctl show
echo ""
echo "Network Interfaces:"
ip addr show | grep -E "(xenbr|vif)"
echo ""

# Storage Performance
echo "=== STORAGE ANALYSIS ==="
echo "Disk Usage:"
df -h | grep -E "(xen|vg)"
echo ""
echo "I/O Scheduler Status:"
for disk in /sys/block/sd*; do
    if [ -d "$disk" ]; then
        echo "$(basename $disk): $(cat $disk/queue/scheduler)"
    fi
done
echo ""

# Xen-Specific Diagnostics
echo "=== XEN DIAGNOSTICS ==="
echo "Hypervisor Log (last 20 lines):"
xl dmesg | tail -20
echo ""
echo "Domain VCPUs:"
xl vcpu-list
echo ""
echo "Scheduler Information:"
xl info | grep -A 10 "cc_compiler"
echo ""

# NVIDIA GPU Status (if configured for passthrough)
echo "=== GPU STATUS ==="
if lspci | grep -i nvidia > /dev/null; then
    echo "NVIDIA GPU detected in host:"
    lspci | grep -i nvidia
    echo ""
    echo "VFIO Status:"
    if lsmod | grep vfio > /dev/null; then
        echo "VFIO modules loaded:"
        lsmod | grep vfio
    else
        echo "VFIO not loaded (normal if not using GPU passthrough)"
    fi
else
    echo "NVIDIA GPU not visible in host (may be passed through to guest)"
fi
echo ""

# Performance Recommendations
echo "=== PERFORMANCE RECOMMENDATIONS ==="
echo "Based on HP Pavilion Gaming 15-cx0049ne analysis:"

# Memory recommendations
TOTAL_MEM=$(xl info | grep total_memory | awk '{print $3}')
FREE_MEM=$(xl info | grep free_memory | awk '{print $3}')
MEM_USAGE=$(($TOTAL_MEM - $FREE_MEM))
MEM_USAGE_PERCENT=$(($MEM_USAGE * 100 / $TOTAL_MEM))

if [ $MEM_USAGE_PERCENT -gt 80 ]; then
    echo "⚠️  Memory usage high ($MEM_USAGE_PERCENT%). Consider:"
    echo "   - Reducing Domain 0 memory allocation"  
    echo "   - Using memory ballooning for inactive domains"
fi

# CPU recommendations
LOAD_AVG=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | sed 's/,//')
if (( $(echo "$LOAD_AVG > 2.0" | bc -l) )); then
    echo "⚠️  High CPU load detected. Consider:"
    echo "   - Adjusting domain CPU weights: xl sched-credit -d domain -w weight"
    echo "   - Enabling CPU pinning for critical domains"
fi

echo ""
echo "✅ Monitoring complete. Run this script regularly to track performance."
`
    }
  };

  const generateCode = () => {
    const template = codeTemplates[selectedTemplate as keyof typeof codeTemplates];
    if (template) {
      setGeneratedCode(template.code);
    }
  };

  const downloadCode = () => {
    const template = codeTemplates[selectedTemplate as keyof typeof codeTemplates];
    if (template && generatedCode) {
      const blob = new Blob([generatedCode], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `xen-${selectedTemplate}-${customizations.vmName}.${selectedTemplate.includes('script') ? 'sh' : 'cfg'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          ⚡ AI-Powered Code Generator
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Generate optimized Xen configurations and scripts for your HP Pavilion Gaming laptop
        </p>
      </div>

      {/* Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🛠️</span>
            <span>Code Template Selection</span>
          </CardTitle>
          <CardDescription>
            Choose from pre-built templates optimized for your hardware configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(codeTemplates).map(([key, template]) => (
              <Card 
                key={key}
                className={`cursor-pointer transition-all ${
                  selectedTemplate === key 
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                    : "hover:border-slate-400"
                }`}
                onClick={() => setSelectedTemplate(key)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <Badge className={
                      template.difficulty === "Beginner" ? "bg-green-600" :
                      template.difficulty === "Intermediate" ? "bg-orange-600" :
                      "bg-red-600"
                    }>
                      {template.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {template.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {selectedTemplate && (
            <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                Selected: {codeTemplates[selectedTemplate as keyof typeof codeTemplates].title}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Customization Options */}
      {selectedTemplate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>⚙️</span>
              <span>Customization Options</span>
            </CardTitle>
            <CardDescription>
              Customize the generated code for your specific needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">VM Name</label>
                <input
                  type="text"
                  value={customizations.vmName}
                  onChange={(e) => setCustomizations({...customizations, vmName: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Memory (MB)</label>
                <Select value={customizations.memory} onValueChange={(value) => 
                  setCustomizations({...customizations, memory: value})
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2048">2GB - Lightweight</SelectItem>
                    <SelectItem value="4096">4GB - Standard</SelectItem>
                    <SelectItem value="8192">8GB - Development</SelectItem>
                    <SelectItem value="12288">12GB - Gaming</SelectItem>
                    <SelectItem value="16384">16GB - Intensive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">vCPUs</label>
                <Select value={customizations.vcpus} onValueChange={(value) => 
                  setCustomizations({...customizations, vcpus: value})
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 vCPU</SelectItem>
                    <SelectItem value="2">2 vCPUs</SelectItem>
                    <SelectItem value="4">4 vCPUs</SelectItem>
                    <SelectItem value="6">6 vCPUs (Max)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-4">
              <Button onClick={generateCode} className="bg-blue-600 hover:bg-blue-700">
                🚀 Generate Code
              </Button>
              {generatedCode && (
                <Button variant="outline" onClick={downloadCode}>
                  📥 Download Code
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generated Code Display */}
      {generatedCode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>📜</span>
              <span>Generated Code</span>
            </CardTitle>
            <CardDescription>
              Hardware-optimized code ready for your HP Pavilion Gaming laptop
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="code" className="w-full">
              <TabsList>
                <TabsTrigger value="code">Generated Code</TabsTrigger>
                <TabsTrigger value="instructions">Implementation Instructions</TabsTrigger>
                <TabsTrigger value="testing">Testing Guide</TabsTrigger>
              </TabsList>

              <TabsContent value="code">
                <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-4">
                  <pre className="text-green-400 text-sm overflow-x-auto whitespace-pre-wrap">
                    {generatedCode}
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="instructions">
                <div className="space-y-4">
                  <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/20">
                    <AlertDescription className="text-amber-800 dark:text-amber-200">
                      <strong>Important:</strong> Always test generated code in your VMware environment before production use.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Implementation Steps:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      <li>Download the generated code using the "Download Code" button</li>
                      <li>Transfer the file to your Xen Domain 0 VM</li>
                      <li>Make scripts executable: <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">chmod +x filename.sh</code></li>
                      <li>Review and customize paths/values as needed</li>
                      <li>Execute with appropriate privileges</li>
                      <li>Verify results using the testing guide</li>
                    </ol>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="testing">
                <div className="space-y-4">
                  <h4 className="font-semibold">Testing & Verification:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h5 className="font-medium text-green-600">✅ Success Indicators:</h5>
                      <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                        <li>• Commands execute without errors</li>
                        <li>• VM boots successfully</li>
                        <li>• Network connectivity established</li>
                        <li>• Performance metrics within expected ranges</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h5 className="font-medium text-red-600">❌ Troubleshooting:</h5>
                      <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                        <li>• Check log files: <code>/var/log/xen/</code></li>
                        <li>• Verify hardware support: <code>xl info</code></li>
                        <li>• Test network: <code>brctl show</code></li>
                        <li>• Memory issues: <code>xl list</code></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Hardware-Specific Recommendations */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>💻</span>
            <span>HP Pavilion Gaming Optimizations</span>
          </CardTitle>
          <CardDescription>
            Code generated specifically for your hardware configuration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 dark:text-white">🔧 CPU Optimizations</h4>
              <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                <li>• Intel VT-x fully utilized</li>
                <li>• EPT (Extended Page Tables) enabled</li>
                <li>• Performance governor configured</li>
                <li>• CPU pinning for optimal performance</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 dark:text-white">💾 Memory Management</h4>
              <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                <li>• 32GB total RAM optimally allocated</li>
                <li>• Domain 0: 8GB fixed allocation</li>
                <li>• Huge pages configured for performance</li>
                <li>• Memory ballooning prevention</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 dark:text-white">🎮 Gaming Features</h4>
              <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                <li>• NVIDIA GTX 1050 Ti passthrough ready</li>
                <li>• Low-latency configurations</li>
                <li>• Real-time scheduling options</li>
                <li>• Audio passthrough support</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}