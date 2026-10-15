// Hand-edited easy-English counterparts of the 128 original unlock-bank items.
// Same topic, item index, four choice positions and correct-answer index as BM.
const lines = {
IKR3013: {
cpu: [
'What is the main function of a CPU?|Store files permanently|Process instructions and control system operations|Print documents|Connect network cables',
'Why is the CPU called the brain of a computer?|It supplies electricity|It stores all user files|It controls data and instruction processing|It changes data into sound',
'Which component works closely with the CPU when processing data?|RAM|Computer case|Mouse pad|Cable trunking',
'What is a benefit of P-cores and E-cores in some modern CPUs?|Replace the monitor|Scan viruses automatically|Balance performance and power efficiency|Increase HDD capacity',
'What does NPU mean in modern processors?|Network Power Unit|Neural Processing Unit|New Peripheral Utility|Normal Processing Utility',
'What should you check before installing a CPU on a motherboard?|The CPU socket is compatible|The SSD is formatted|The speakers are on|The RJ45 cable is tested',
'Which CPU unit performs arithmetic and logic operations?|ALU|PSU|NIC|SSD',
'What does the Control Unit do?|Controls how CPU instructions are carried out|Increases HDD storage|Tests LAN cables|Supplies electrical power'
],
motherboard: [
'What is the main function of the motherboard?|Replace RAM|Connect the main computer components|Store the operating system permanently|Stabilise Wi-Fi',
'Which of these is a motherboard expansion slot?|RJ45|PCIe|VGA|Power button',
'What do ATX and Micro-ATX describe?|Power-cable types|Motherboard size formats|Operating systems|File formats',
'Which type of RAM fits a DDR5-only motherboard?|DDR3|DDR4|DDR5|Older SDRAM',
'Which is motherboard firmware?|Photoshop|BIOS/UEFI|Printer driver|VLAN',
'What is built-in Wi-Fi 7 on a motherboard for?|Antivirus software|Wireless network access|A type of heatsink|An audio port',
'What is the job of a CPU socket?|Hold a compatible CPU|Replace the SSD|Connect a printer|Cool the case',
'What is an M.2 slot commonly used for?|Install certain SSDs|Connect a cable tester|Install a room fan|Send AC power to a monitor'
],
ram: [
'What is the main function of RAM?|Permanently store pictures|Hold data temporarily while it is being used|Power the CPU|Control case temperature',
'What may happen if a computer has too little RAM?|The display becomes 8K|Multitasking becomes slower|The CPU changes brand|USB ports stop working',
'Which unit is commonly used for DDR5 data transfer rates?|MT/s|dBm|RPM|Lumen',
'What does DDR5 on-die ECC do?|Give the same protection as full server ECC RAM|Correct errors inside DRAM chips|Increase internet speed|Convert an HDD into an SSD',
'What is important when choosing RAM?|Matching RGB colours|Compatibility with the motherboard and CPU|A large computer case|Built-in Bluetooth',
'CAMM2 is most often associated with which devices?|Server racks|Laptops and compact devices|Laser printers|OLED monitors',
'What happens to normal RAM data when power is switched off?|It stays forever|It is lost because RAM is volatile|It moves to the modem|It becomes faster',
'What does SO-DIMM stand for?|Small Outline Dual In-line Memory Module|Solid Output Data Internal Memory|Serial Online Device Interface Module|Standard Optical Disk Interface'
],
storage: [
'Which is usually faster: HDD or SSD?|HDD|SSD|Both are always equal|It depends only on the case',
'What does non-volatile storage mean?|Data remains after the computer is off|Data exists only when the computer is on|Data is only for the CPU|Data is only for RAM',
'Which interface is used by many NVMe Gen 5 SSDs?|PS/2|PCIe|IDE only|Audio jack',
'What is 3D NAND technology about?|Stacked layers of memory cells|Water cooling|Battery charging|3D monitor display',
'DirectStorage mainly helps with what?|Typing documents|Efficient game-data transfers|Replacing the motherboard|Network-cable tests',
'What is an advantage of SSDs over HDDs?|They use spinning magnetic disks|No moving parts and better shock resistance|They need bigger cables|They do not need an OS',
'Which storage device has moving mechanical parts?|HDD|NVMe SSD|DDR5 RAM|CPU cache',
'Which storage protocol is used by many SSDs connected via PCIe?|NVMe|T568B|DHCP|HDMI'
],
psu: [
'What does a PSU do?|Store system instructions|Convert and supply power to components|Control the mouse|Test cables',
'Why is an efficiency rating such as 80 PLUS useful?|It shows case colour|It shows energy-use efficiency|It shows motherboard size|It shows internet speed',
'What does PSU headroom mean?|Allow extra power capacity as a safety margin|Buy only a fanless PSU|Reduce the amount of RAM|Install two operating systems',
'Why are ATX 3.0 and 3.1 important?|They support modern GPU power needs|They replace the CPU|They connect fibre cables|They are new file systems',
'What often uses a 12VHPWR or 12V-2x6 connector?|Certain modern graphics cards|3D printers|Old monitors|Crossover cables',
'What can happen if PSU wattage is too low?|The system may become unstable or fail to start|The monitor becomes black and white|RAM changes generation|Network topology breaks',
'Which unit measures PSU output capacity?|Watts (W)|Bits per second|Audio hertz|Lumen',
'Before opening a PC case for service, what should you do?|Turn off the PC and unplug power|Increase PSU voltage|Touch the board with wet hands|Leave the fans spinning'
],
cooling: [
'Why does a computer need a cooling system?|Make speakers louder|Keep component temperatures safe and stable|Increase internet capacity|Organise user files',
'Which is an example of active cooling?|Heatsink only|Fan and AIO liquid cooler|Heat sticker|Cable tie',
'Why do we apply thermal paste?|To decorate the CPU|To help heat move from CPU to heatsink|To drill the case|To lock RAM',
'Why is liquid metal not advised for beginners?|It does not cool at all|It can conduct electricity and cause damage|It cannot work near monitors|It is not sold in Malaysia',
'What can thick dust on fans and heatsinks cause?|Poorer cooling performance|Faster internet|More USB ports|A change to Linux',
'Where are vapour chambers commonly found?|High-performance laptops|Dot-matrix printers|Network switches|Patch panels',
'What can happen if the CPU fan stops working?|CPU overheats and the system becomes unstable|LAN becomes faster|Storage doubles|RAM becomes DDR5',
'What does thermal throttling mean?|Reducing performance to control temperature|Turning off fans to save power|Making a printer faster|Automatically upgrading the CPU'
],
os: [
'What is the role of an operating system?|Print pictures|Manage computer hardware and software|Generate electricity|Test RJ45 cables',
'Which of these is an operating system?|Windows|DDR5|PCIe|NVMe',
'What does GUI mean?|Graphical User Interface|General Utility Input|Gigabit Unified Internet|Graphic USB Integration',
'Which system is NTFS commonly used with?|Windows|Patch panel|AMD only|Mesh topology',
'What does virtualisation allow?|Run several operating systems on one computer|Remove RAM|Turn the CPU into a GPU|Double RJ45 ports',
'What is a kernel?|The core of an operating system|A CPU fan name|A keyboard type|An internet cable',
'What does CLI mean?|Command-Line Interface|Computer Local Internet|Cable Link Identifier|Core Logic Input',
'What does a device driver do?|Help the OS communicate with hardware|Replace the power supply|Add CPU sockets|Cut Ethernet cables'
],
io: [
'Keyboard and mouse are examples of which devices?|Output|Input|Storage|Network',
'Monitor and printer are examples of which devices?|Input|Output|Processing|Cooling',
'How is a touchscreen classified?|Input only|Output only|Input and output|Not an I/O device',
'What does mouse polling rate measure?|How often movement is reported to the PC|Mouse storage size|Mouse battery type|Monitor brightness',
'What are OLED displays known for?|Deep blacks and high contrast|Magnetic disks|Inability to show video|Use only in printers',
'What kind of device is a scanner?|Output|Input|Cooling|Power supply',
'Which device produces audio output?|Speaker|Keyboard|Mouse|Barcode scanner',
'Why is a printer an output device?|It produces physical documents from data|It sends data to the CPU|It adds RAM|It detects EMI'
]
},
IKR3023: {
topologi: [
'What does network topology describe?|The operating system type|Physical and logical arrangement of network devices|Switch voltage|Server file format',
'In a star topology, devices usually connect to what?|A central switch or hub|One backbone cable without a switch|One network printer|One central monitor',
'Which topology can best withstand the failure of one path?|Bus|Mesh|Old ring|Point-to-point only',
'What does physical topology describe?|Only logical data flow|Actual cable and device layout|User security level|Server-room size',
'Where is a tree topology useful?|Large hierarchical networks|Only one PC-to-printer link|Networks with no switches|Networks with no structure',
'What is affected by your choice of network topology?|Speed, reliability and cost|Cable colour|Label font|Monitor size',
'What does bus topology rely on?|One shared backbone cable|One switch per PC|Fibre to every device|Wireless only',
'What happens if the central device in a star network fails?|Many users lose connection|All cables change category|Computer RAM breaks|All operating systems are erased'
],
struktur: [
'What is the common maximum channel length for structured copper Ethernet?|30 metres|50 metres|100 metres|150 metres',
'What does horizontal cabling usually connect?|Buildings to other buildings only|Workstations to a telecommunications room|CPU to monitor|Patch panel to PSU',
'What does backbone cabling do?|Connect a mouse|Connect telecommunications rooms or floors|Connect speakers|Connect home telephones',
'What is commonly used for campus-wide cabling?|Optical fibre between buildings|VGA cable|USB Type-C|AC power cable',
'Why are trunking and conduit used?|Magically increase internet speed|Protect and organise cables|Replace a switch|Add more ports',
'Why is a network layout plan important?|Plan cable routes and device positions|Change RAM type|Change a user OS|Make desktop wallpaper nicer',
'What is a permanent link in structured cabling?|Fixed link from patch panel to outlet|Main power cable|Monitor-to-CPU cable|Temporary mouse cable',
'Why are port labels important?|Make maintenance and cable tracing easier|Increase bandwidth without equipment|Replace a cable tester|Automatically change IP addresses'
],
kabel: [
'What does UTP stand for?|Unshielded Twisted Pair|Universal Terminal Port|Ultra Transfer Protocol|Unified Twisted Plug',
'How is STP different from UTP?|It has extra protection against EMI|It uses laser light|It has no copper wires|It carries audio only',
'Where is coaxial cable commonly used?|CCTV and cable TV|Computer RAM|Case fans|Laptop charging',
'What is single-mode fibre suitable for?|High-speed links over long distances|Keyboard connections|Inside a motherboard|Audio speakers',
'What is multimode fibre commonly suitable for?|Short to medium indoor links|All power connections|Water cooling systems|USB ports',
'Which are examples of fibre connectors?|LC and SC|RJ45 and RJ11 only|ATX and PCIe|HDMI and DisplayPort',
'Which medium is more resistant to EMI?|Optical fibre|Unshielded UTP|Analogue TV coaxial cable|Power cable',
'What is one benefit of single-mode optical fibre?|Supports long distances|Has eight copper pins|Needs an RJ45 crimping tool|Works only at 10 Mbps'
],
kelajuan: [
'What speed does 1000BASE-T provide?|100 Mbps|1 Gbps|10 Gbps|40 Gbps',
'For 10GBASE-T over a full 100 m, which cable is usually required?|Cat3|Cat5|Cat6A|Telephone cable',
'40GBASE-T over copper is associated with what?|Cat8 up to about 30 m|Cat3 up to 100 m|Unlimited coaxial cable|Only 2 m patch cords',
'What speed is 10BASE-T Ethernet?|10 Mbps|100 Mbps|1 Gbps|10 Gbps',
'What is a common maximum length for many structured twisted-pair channels?|10 m|25 m|100 m|500 m',
'Why is choosing the right cable category and Ethernet standard important?|It affects performance and distance|It automatically changes topology|It adds PSU power|It makes a keyboard wireless',
'What is the speed of 100BASE-TX?|10 Mbps|100 Mbps|1 Gbps|10 Gbps',
'Which cable category is commonly recommended for 10GBASE-T up to 100 m?|Cat6A|Cat3|RJ11 telephone cable|HDMI'
],
alatan: [
'What is a crimping tool used for?|Secure an RJ45 plug to a cable|Measure room size|Test PSU voltage|Wash cables',
'What does a cable stripper do?|Remove the cable outer jacket|Cut large metal trunking|Arrange a patch panel|Turn on a switch',
'Where is a punch-down tool used?|Patch panels or modular jacks|LED monitors|Power supply units|Inkjet printers',
'What do pliers help a technician do?|Hold or bend wires|Generate IP addresses|Print labels automatically|Increase Ethernet speed',
'Why is a tape measure important?|Measure cable runs and installation distances|Test internet bandwidth|Cool a switch|Change T568B wiring',
'When is a drill needed?|Make holes for trunking or face-plate installation|Test a cable tester|Assign IP addresses|Change a server wallpaper',
'Which tool cuts a cable to the required length?|Wire cutter|Punch-down tool|Cable tester|Label printer',
'What is the purpose of a cable stripper?|Remove the cable jacket without damaging conductors|Increase internet speed|Cut a patch panel|Connect a router to Wi-Fi'
],
peralatan: [
'What can a basic cable tester check?|Wiremap and continuity|CPU processing speed|Monitor temperature|Windows version',
'Why use a server rack?|Organise equipment such as switches and patch panels|Store student notes|Charge phones|Replace trunking',
'What is the function of a patch panel?|Central cable termination and management point|Main power supply|A new topology|Virus detector',
'What is a patch cord usually like?|Short and flexible for equipment connections|Undersea fibre cable|Server power cable|Earth wire',
'What does a label printer help with?|Clearly label cables and ports|Upgrade a switch to 10G|Change router OS|Cut cables',
'When is a stable ladder important?|Working near ceilings or at height|Changing IP addresses|Testing RAM|Printing documents',
'Which tool can help find a broken wire in an RJ45 link?|Cable tester|Monitor|Scanner|CPU fan',
'What does 1U mean in a server rack?|One rack-height unit|One registered user|One UTP cable|One wireless router'
],
bahan: [
'Which colour-code standard is commonly used in UTP termination training?|T568B|NTFS|ATX|PCIe',
'What is the job of a face plate?|Neatly hold a wall data outlet|Power a switch|Replace a patch panel|Cool a server',
'Where is a modular jack usually installed?|Face plate or patch panel|CPU heatsink|Monitor stand|PC power supply',
'What is a cable tie used for?|Bundle and organise cables|Increase internet bandwidth|Create MAC addresses|Replace labels',
'What is an RJ45 plug?|Connector for copper network cables|Server fan type|Linux file system|Network monitor',
'Why choose suitable materials and accessories?|For neater and safer installations|To change topology automatically|To increase SSD space|To replace a faulty switch',
'What is a modular jack used for?|Create a data outlet with an IDC connection|Generate 12 V power|Scan computer viruses|Store the OS',
'Why should cables not be tied too tightly?|It may damage cables or affect performance|It automatically makes them 100 m|It deletes port details|It doubles speed'
],
prosedur: [
'What is cable termination?|Connect cable ends to plugs or terminals|Stop internet service in a building|Remove all old cables|Arrange devices on a desk',
'What can happen if wire colours are arranged incorrectly?|Cable tester shows a failure|RAM becomes slower|Switch changes brand|CPU overclocks itself',
'Why keep wire pairs twisted close to the termination point?|To maintain performance and reduce interference|To make cable colours longer|To add switch ports|To make patch panels heavier',
'What is the usual traditional straight-through wiring?|Same pin arrangement at both ends|T568A at one end and T568B at the other|Fibre at one end only|Only four wires',
'What does traditional crossover wiring use?|Different pin arrangements at each end|RJ11 at one end|One end without a connector|A fibre patch cord',
'What must be done after cable termination?|Test the cable|Paint the cable|Change the topology|Turn off all switches',
'After terminating RJ45, how should you verify the link?|Test the wiremap using a suitable tool|Turn on the computer PSU|Change OS to Linux|Untwist all wire pairs',
'Why keep cable pairs twisted close to the termination point?|Reduce interference and preserve transmission characteristics|Add more wire colours|Make wires longer automatically|Change the supply voltage'
]
}
};

export const EN_QUIZ_BANKS = Object.fromEntries(Object.entries(lines).map(([moduleCode, topics]) => [moduleCode,
  Object.fromEntries(Object.entries(topics).map(([topicId, items]) => [topicId, items.map((item) => {
    const [question, ...options] = item.split('|');
    if (options.length !== 4) throw new Error(`Invalid EN translation: ${moduleCode}/${topicId}`);
    return { question, options };
  })]))
]));
