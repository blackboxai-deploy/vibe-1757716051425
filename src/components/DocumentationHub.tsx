"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export function DocumentationHub() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const documentationSections = {
    concepts: {
      title: "Core Concepts",
      emoji: "🎯",
      items: [
        {
          title: "Virtualization Fundamentals",
          description: "Basic concepts and terminology",
          content: `**What is Virtualization?**
Virtualization creates a virtual version of computing resources like operating systems, servers, or networks. Originally developed by IBM in the 1960s, it has become essential for modern computing.

**Key Concepts:**
- **Hypervisor/VMM**: Software that creates and manages virtual machines
- **Host**: Physical computer running the hypervisor
- **Guest**: Virtual machine running on the hypervisor
- **Domain**: Xen terminology for virtual machines

**Types of Virtualization:**
1. **Full Virtualization**: Complete hardware simulation, unmodified guest OS
2. **Paravirtualization**: Modified guest OS for optimal performance
3. **Hardware-Assisted**: CPU extensions (VT-x/AMD-V) enable efficient virtualization
4. **OS-Level**: Containers sharing a single kernel`
        },
        {
          title: "Hypervisor Types",
          description: "Type-1 vs Type-2 hypervisors",
          content: `**Type-1 Hypervisors (Bare Metal):**
- Run directly on physical hardware
- Examples: Xen, VMware ESXi, Microsoft Hyper-V
- Better performance and security
- Xen Project is the only open-source Type-1 hypervisor

**Type-2 Hypervisors (Hosted):**
- Run on top of existing operating system
- Examples: VMware Workstation, VirtualBox, Parallels
- Easier to install and manage
- Good for development and testing

**Xen Architecture:**
- Microkernel design (~1MB codebase)
- Domain 0: Privileged management domain
- Domain U: Unprivileged guest domains
- Split driver model for device access`
        }
      ]
    },
    architecture: {
      title: "Xen Architecture",
      emoji: "🏗️",
      items: [
        {
          title: "Domain 0 (dom0)",
          description: "The privileged management domain",
          content: `**Domain 0 Overview:**
Domain 0 is the first and most privileged domain started by Xen. It serves as the control plane for the entire system.

**Responsibilities:**
1. **Hardware Management**: Contains all hardware drivers
2. **Administrative Interface**: Manages other domains (create, destroy, migrate)
3. **Device Backends**: Provides backend drivers for guest domains
4. **Network Services**: Bridges, routing, firewalling

**Security Considerations:**
- Root exploit in dom0 can compromise entire system
- Best practice: minimize services running in dom0
- Future direction: split responsibilities into dedicated domains

**Commands:**
- \`xl info\` - Display Xen and dom0 information
- \`xl list\` - List all domains
- \`xl create vm.cfg\` - Create new domain`
        },
        {
          title: "Domain U (domU)",
          description: "Unprivileged guest domains",
          content: `**Domain U Overview:**
Unprivileged domains that run user workloads. They cannot directly access hardware and must communicate through dom0.

**Types of domU:**
1. **Paravirtualized (PV)**: Modified guest OS for optimal performance
2. **Hardware-Assisted (HVM)**: Unmodified guest OS using CPU extensions
3. **Hybrid (PV-on-HVM)**: HVM with PV drivers for best performance

**Communication Mechanisms:**
- **Shared Memory**: Primary data transfer method
- **Event Channels**: Asynchronous notifications
- **Grant Tables**: Secure memory sharing
- **XenStore**: Device discovery and configuration

**Resource Management:**
- CPU scheduling via Xen hypervisor scheduler
- Memory allocation with ballooning support
- I/O through split device drivers`
        }
      ]
    },
    commands: {
      title: "Command Reference", 
      emoji: "💻",
      items: [
        {
          title: "xl Commands (Primary Tool)",
          description: "Essential xl commands for domain management",
          content: `**Domain Management:**
\`xl list\` - Show all domains and their status
\`xl create vm.cfg\` - Create and start a new domain
\`xl shutdown domain\` - Gracefully shutdown a domain
\`xl destroy domain\` - Forcefully terminate a domain
\`xl reboot domain\` - Restart a domain
\`xl pause domain\` - Pause domain execution
\`xl unpause domain\` - Resume paused domain

**System Information:**
\`xl info\` - Display Xen hypervisor and host information
\`xl dmesg\` - Show Xen hypervisor messages
\`xl uptime\` - Show domain uptime information
\`xl top\` - Real-time domain performance monitor

**Virtual CPU Management:**
\`xl vcpu-list\` - List vCPUs for all domains
\`xl vcpu-set domain vcpus\` - Change number of vCPUs
\`xl vcpu-pin domain vcpu pcpu\` - Pin vCPU to physical CPU

**Memory Management:**
\`xl mem-set domain memory\` - Set domain memory
\`xl mem-max domain memory\` - Set maximum memory

**Scheduler Control:**
\`xl sched-credit -d domain -w weight\` - Set CPU weight
\`xl sched-credit -d domain -c cap\` - Set CPU cap

**Network Management:**
\`xl network-list domain\` - List domain network interfaces
\`xl network-attach domain vif\` - Attach network interface
\`xl network-detach domain devid\` - Detach network interface

**Migration and Snapshots:**
\`xl save domain filename\` - Save domain state to file
\`xl restore filename\` - Restore domain from file
\`xl migrate domain host\` - Live migrate domain to another host

**Console Access:**
\`xl console domain\` - Attach to domain console
\`xl console -t pv domain\` - PV console for HVM domain`
        },
        {
          title: "Configuration File Syntax",
          description: "Xen domain configuration file reference",
          content: `**Basic Configuration Structure:**

\`\`\`
# Domain name and type
name = "vm-name"
type = "hvm"  # or "pv" for paravirtualized

# Resource allocation  
memory = 4096  # Memory in MB
vcpus = 2      # Number of virtual CPUs
maxvcpus = 4   # Maximum vCPUs (for hotplug)

# Boot configuration
builder = "hvm"  # or specify kernel for PV
boot = "cd"      # Boot order: c=HDD, d=CD, n=Network
kernel = "/path/to/kernel"    # For PV domains
ramdisk = "/path/to/initrd"   # For PV domains
root = "/dev/xvda1"          # Root device for PV

# Storage configuration
disk = [
    'phy:/dev/vg0/vm-disk,hda,w',     # Physical device
    'file:/path/to/disk.img,hdb,w',   # File-backed disk
    'file:/path/to/cd.iso,hdc:cdrom,r' # CD-ROM
]

# Network configuration
vif = [
    'bridge=xenbr0,mac=00:16:3e:xx:xx:xx',  # Bridged network
    'type=ioemu,bridge=xenbr0'              # For HVM domains
]

# Display and input
vnc = 1                    # Enable VNC
vnclisten = "0.0.0.0"      # VNC listen address  
vncpasswd = "password"     # VNC password
keymap = "en-us"          # Keyboard layout

# Advanced options
acpi = 1                  # Enable ACPI
apic = 1                  # Enable APIC
pae = 1                   # Enable PAE
hap = 1                   # Hardware-assisted paging
nestedhvm = 1            # Enable nested virtualization
viridian = 1             # Windows optimizations

# Behavior on events
on_poweroff = "destroy"   # Action on guest poweroff
on_reboot = "restart"     # Action on guest reboot  
on_crash = "restart"      # Action on guest crash

# PCI passthrough
pci = ['00:02.0', '00:03.0']  # PCI devices to pass through

# CPU features and optimization
timer_mode = 2            # Timer mode (0=PIT, 1=LAPIC, 2=HPET)
hpet = 1                 # Enable HPET timer
shadow_memory = 16       # Shadow page table memory (MB)
\`\`\``
        }
      ]
    },
    troubleshooting: {
      title: "Troubleshooting",
      emoji: "🔧", 
      items: [
        {
          title: "Common Installation Issues",
          description: "Solutions for frequent installation problems",
          content: `**GRUB Boot Issues:**
Problem: Xen option not appearing in GRUB menu
Solutions:
- Update GRUB: \`sudo update-grub\`
- Check Xen installation: \`dpkg -l | grep xen\`
- Verify GRUB configuration: \`cat /boot/grub/grub.cfg | grep xen\`

**Domain 0 Boot Failures:**
Problem: System fails to boot into Xen
Solutions:
- Check BIOS virtualization settings
- Verify hardware compatibility: \`grep -E '(vmx|svm)' /proc/cpuinfo\`
- Review Xen command line parameters
- Check for conflicting modules

**Memory Allocation Errors:**
Problem: "Not enough memory" when creating domains
Solutions:
- Check available memory: \`xl info | grep free_memory\`
- Adjust dom0 memory: Add \`dom0_mem=8G,max:8G\` to Xen command line
- Enable memory ballooning: \`xl mem-set domain new_memory\`

**Network Bridge Problems:**
Problem: Domain network connectivity issues
Solutions:
- Verify bridge exists: \`brctl show\`
- Check bridge configuration: \`ip addr show xenbr0\`
- Restart network: \`sudo systemctl restart networking\`
- Test connectivity: \`ping 8.8.8.8\`

**GPU Passthrough Issues:**
Problem: GPU not accessible in guest domain
Solutions:
- Verify IOMMU enabled: \`dmesg | grep -i iommu\`
- Check VFIO binding: \`lspci -k\`
- Confirm GPU isolation: \`lspci | grep VGA\`
- Update guest drivers after passthrough`
        },
        {
          title: "HP Pavilion Specific Issues",
          description: "Hardware-specific troubleshooting for your laptop",
          content: `**Intel i5-8300H Issues:**
Problem: CPU not fully utilized by Xen guests
Solutions:
- Enable all CPU features in BIOS
- Set CPU governor to performance: \`cpufreq-set -g performance\`
- Check CPU pinning: \`xl vcpu-list\`
- Verify Turbo Boost is working

**32GB RAM Issues:**
Problem: Not all RAM recognized or available
Solutions:
- Check memory detection: \`free -h\`
- Verify BIOS memory settings
- Test memory: \`memtest86+\`
- Check for 32-bit limitations in guest OS

**NVIDIA GTX 1050 Ti Issues:**
Problem: GPU passthrough not working
Solutions:
- Update BIOS to latest version
- Enable VT-d in BIOS advanced settings
- Blacklist NVIDIA driver on host: \`modprobe.blacklist=nvidia\`
- Verify IOMMU groups: \`find /sys/kernel/iommu_groups/ -type l\`
- Check PCI device isolation

**Thermal Issues:**
Problem: Laptop overheating with multiple VMs
Solutions:
- Monitor temperatures: \`sensors\`
- Adjust CPU governors for power efficiency
- Limit concurrent high-performance VMs
- Ensure proper laptop ventilation
- Consider undervolting CPU (advanced users)

**Power Management:**
Problem: Poor battery life with Xen
Solutions:
- Configure CPU frequency scaling
- Use laptop mode tools
- Suspend inactive domains: \`xl pause domain\`
- Optimize scheduler weights for power efficiency`
        }
      ]
    },
    advanced: {
      title: "Advanced Topics",
      emoji: "🚀",
      items: [
        {
          title: "Live Migration",
          description: "Moving running VMs between hosts",
          content: `**Live Migration Overview:**
Live migration allows moving a running domain from one Xen host to another with minimal downtime.

**Requirements:**
- Shared storage (NFS, iSCSI, or Ceph)
- Compatible CPU types on both hosts
- Same Xen version and configuration
- Network connectivity between hosts

**Migration Process:**
1. **Preparation:**
   \`\`\`
   # On source host
   xl migrate-receive --ready domain
   
   # On destination host  
   xl migrate domain destination-host
   \`\`\`

2. **Verification:**
   \`\`\`
   # Check domain status
   xl list
   
   # Verify network connectivity
   ping guest-ip
   
   # Check performance
   xl top
   \`\`\`

**Best Practices:**
- Test migration with non-critical VMs first
- Monitor network bandwidth during migration
- Use dedicated migration network for large VMs
- Implement proper storage replication
- Have rollback plan ready`
        },
        {
          title: "Performance Optimization",
          description: "Advanced performance tuning techniques",
          content: `**CPU Optimization:**
\`\`\`
# Set CPU scheduler weights
xl sched-credit -d domain -w 512

# Pin VCPUs to specific physical CPUs  
xl vcpu-pin domain 0 0    # Pin vCPU 0 to pCPU 0
xl vcpu-pin domain 1 1    # Pin vCPU 1 to pCPU 1

# Enable CPU performance governor
echo performance > /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
\`\`\`

**Memory Optimization:**
\`\`\`
# Configure huge pages (2MB pages)
echo 1024 > /sys/kernel/mm/hugepages/hugepages-2048kB/nr_hugepages

# Prevent memory ballooning in dom0
echo 'GRUB_CMDLINE_XEN_DEFAULT="dom0_mem=8G,max:8G"' >> /etc/default/grub

# Monitor memory usage
xl list
free -h
\`\`\`

**I/O Optimization:**
\`\`\`
# Set I/O scheduler for SSDs
echo mq-deadline > /sys/block/sda/queue/scheduler

# Optimize network buffers
echo 'net.core.rmem_max = 134217728' >> /etc/sysctl.conf
echo 'net.core.wmem_max = 134217728' >> /etc/sysctl.conf

# Use paravirtualized drivers when possible
# Much faster than emulated devices
\`\`\`

**GPU Passthrough:**
\`\`\`
# Configure VFIO for GPU passthrough
echo 'vfio-pci' >> /etc/modules
echo 'options vfio-pci ids=nvidia-gpu-id' >> /etc/modprobe.d/vfio.conf

# Blacklist host GPU driver
echo 'blacklist nvidia' >> /etc/modprobe.d/blacklist-nvidia.conf
update-initramfs -u
\`\`\``
        }
      ]
    },
    reference: {
      title: "Quick Reference",
      emoji: "📚",
      items: [
        {
          title: "Configuration Templates",
          description: "Ready-to-use VM configurations",
          content: `**Basic HVM Domain (Windows/Linux):**
\`\`\`
name = "windows-vm"
type = "hvm"
memory = 8192
vcpus = 4
builder = "hvm"
boot = "cd"
disk = ['phy:/dev/vg0/windows-disk,hda,w']
vif = ['bridge=xenbr0']
vnc = 1
\`\`\`

**Paravirtualized Linux Domain:**
\`\`\`
name = "linux-pv" 
type = "pv"
memory = 4096
vcpus = 2
kernel = "/boot/vmlinuz-xen"
ramdisk = "/boot/initrd.img-xen"
root = "/dev/xvda1"
disk = ['phy:/dev/vg0/linux-disk,xvda,w']
vif = ['bridge=xenbr0']
\`\`\`

**GPU Passthrough Gaming VM:**
\`\`\`
name = "gaming-vm"
type = "hvm"
memory = 16384
vcpus = 6
builder = "hvm"
boot = "cd"
disk = ['phy:/dev/vg0/gaming-disk,hda,w']
vif = ['bridge=xenbr0']
pci = ['01:00.0', '01:00.1']  # GPU + Audio
gfx_passthru = 1
vnc = 0
\`\`\``
        },
        {
          title: "Network Configuration Examples", 
          description: "Common network setups",
          content: `**Bridge Configuration (/etc/netplan/):**
\`\`\`
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
\`\`\`

**NAT Configuration:**
\`\`\`
# Enable IP forwarding
echo 'net.ipv4.ip_forward=1' >> /etc/sysctl.conf

# Configure iptables for NAT
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
iptables -A FORWARD -i xenbr0 -j ACCEPT
\`\`\`

**VLAN Configuration:**
\`\`\`
# Create VLAN interface
ip link add link eth0 name eth0.100 type vlan id 100
ip addr add 192.168.100.1/24 dev eth0.100
ip link set eth0.100 up

# Bridge VLAN
brctl addbr vlan100br
brctl addif vlan100br eth0.100
\`\`\`

**Network Monitoring:**
\`\`\`
# Monitor bridge status
brctl show

# Check interface statistics  
ip -s link show

# Monitor network traffic
tcpdump -i xenbr0

# Network performance testing
iperf3 -s  # Server mode
iperf3 -c server-ip  # Client mode
\`\`\``
        }
      ]
    }
  };

  const filteredSections = Object.entries(documentationSections).map(([key, section]) => ({
    key,
    ...section,
    items: section.items.filter(item => 
      searchTerm === "" || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          📖 Xen Project Documentation Hub
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Comprehensive reference documentation with HP Pavilion Gaming optimizations
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🔍</span>
            <span>Search Documentation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search for concepts, commands, configurations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Documentation Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Documentation Sections</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-2">
                {Object.entries(documentationSections).map(([key, section]) => (
                  <Button
                    key={key}
                    variant="ghost" 
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      document.getElementById(key)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="mr-2">{section.emoji}</span>
                    <span>{section.title}</span>
                    <Badge variant="outline" className="ml-auto text-xs">
                      {section.items.length}
                    </Badge>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {filteredSections.map((section) => (
            <Card key={section.key} id={section.key}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>{section.emoji}</span>
                  <span>{section.title}</span>
                  <Badge variant="outline">
                    {section.items.length} items
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {section.items.map((item, index) => (
                    <Collapsible 
                      key={index}
                      open={expandedSections.includes(`${section.key}-${index}`)}
                      onOpenChange={() => toggleSection(`${section.key}-${index}`)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between p-4 h-auto"
                        >
                          <div className="text-left">
                            <h4 className="font-semibold">{item.title}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {item.description}
                            </p>
                          </div>
                          <span className="text-lg">
                            {expandedSections.includes(`${section.key}-${index}`) ? "−" : "+"}
                          </span>
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <Card className="mt-2 border-slate-200 dark:border-slate-700">
                          <CardContent className="pt-4">
                            <div className="prose dark:prose-invert max-w-none">
                              <div className="whitespace-pre-line text-slate-700 dark:text-slate-300 text-sm">
                                {item.content}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>⚡</span>
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <span>📥</span>
              <span>Download Complete Reference PDF</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <span>🔖</span>
              <span>Bookmark Current Section</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <span>📧</span>
              <span>Email Documentation</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <span>🌐</span>
              <span>Visit Official Xen Wiki</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}