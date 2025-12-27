import React, { useState } from 'react';
import {
  Github,
  Code2,
  Gamepad2,
  Layers,
  Terminal,
  Cpu,
  Zap,
  Mail,
  Twitter,
  ExternalLink,
  CheckCircle2,
  ChevronRight,
  Copy
} from 'lucide-react';
import AIChat from './components/AIChat';
import { Project, Service } from './types';

// --- Image Generation Helper ---
// This function creates an SVG data URI that mimics Roblox Studio's interface.
const generateStudioImage = (type: 'script' | 'viewport' | 'ui', title: string) => {
  const width = 800;
  const height = 450;

  // Roblox Studio Colors
  const bg = '#232426'; // Main background
  const panel = '#2d2d2d'; // Panels (Explorer/Properties)
  const viewport = '#111111'; // 3D Viewport / Script bg
  const border = '#1e1e1e';
  const text = '#cccccc';
  const accent = '#89b4fa'; // Selection color

  let content = '';

  if (type === 'script') {
    // Script Editor Look
    content = `
      <!-- Tab Bar -->
      <rect x="0" y="0" width="${width}" height="30" fill="${panel}" />
      <rect x="0" y="0" width="150" height="30" fill="${viewport}" />
      <text x="10" y="20" font-family="monospace" font-size="12" fill="${text}">ServerScript.lua</text>
      <rect x="150" y="0" width="1" height="30" fill="${border}" />

      <!-- Line Numbers -->
      <rect x="0" y="30" width="40" height="${height-30}" fill="${panel}" />
      <text x="20" y="60" font-family="monospace" font-size="12" fill="#666" text-anchor="middle">1</text>
      <text x="20" y="80" font-family="monospace" font-size="12" fill="#666" text-anchor="middle">2</text>
      <text x="20" y="100" font-family="monospace" font-size="12" fill="#666" text-anchor="middle">3</text>
      <text x="20" y="120" font-family="monospace" font-size="12" fill="#666" text-anchor="middle">4</text>
      <text x="20" y="140" font-family="monospace" font-size="12" fill="#666" text-anchor="middle">5</text>

      <!-- Code Content -->
      <rect x="40" y="30" width="${width-40}" height="${height-30}" fill="${viewport}" />

      <!-- Mock Code: local Knit = require(...) -->
      <text x="50" y="60" font-family="monospace" font-size="14" fill="#f38ba8">local</text>
      <text x="100" y="60" font-family="monospace" font-size="14" fill="${text}">Knit = </text>
      <text x="150" y="60" font-family="monospace" font-size="14" fill="#89b4fa">require</text>
      <text x="210" y="60" font-family="monospace" font-size="14" fill="${text}">(</text>
      <text x="220" y="60" font-family="monospace" font-size="14" fill="#a6e3a1">game</text>
      <text x="255" y="60" font-family="monospace" font-size="14" fill="${text}">:GetService(</text>
      <text x="340" y="60" font-family="monospace" font-size="14" fill="#a6e3a1">"ReplicatedStorage"</text>
      <text x="490" y="60" font-family="monospace" font-size="14" fill="${text}">))</text>

      <!-- Mock Code: Service Definition -->
      <text x="50" y="90" font-family="monospace" font-size="14" fill="#f38ba8">local</text>
      <text x="100" y="90" font-family="monospace" font-size="14" fill="${text}">${title.replace(/ /g, '')} = Knit.CreateService {</text>

      <text x="80" y="115" font-family="monospace" font-size="14" fill="${text}">Name = </text>
      <text x="135" y="115" font-family="monospace" font-size="14" fill="#a6e3a1">"${title}"</text>
      <text x="130" y="115" font-family="monospace" font-size="14" fill="${text}">,</text>

      <text x="80" y="140" font-family="monospace" font-size="14" fill="${text}">Client = {},</text>
      <text x="50" y="165" font-family="monospace" font-size="14" fill="${text}">}</text>

      <!-- Mock Function -->
      <text x="50" y="200" font-family="monospace" font-size="14" fill="#f38ba8">function</text>
      <text x="125" y="200" font-family="monospace" font-size="14" fill="#89b4fa">${title.replace(/ /g, '')}</text>
      <text x="240" y="200" font-family="monospace" font-size="14" fill="${text}">:KnitStart()</text>
      <text x="80" y="225" font-family="monospace" font-size="14" fill="#fab387">print</text>
      <text x="125" y="225" font-family="monospace" font-size="14" fill="${text}">(</text>
      <text x="135" y="225" font-family="monospace" font-size="14" fill="#a6e3a1">"System Initialized"</text>
      <text x="290" y="225" font-family="monospace" font-size="14" fill="${text}">)</text>
      <text x="50" y="250" font-family="monospace" font-size="14" fill="#f38ba8">end</text>
    `;
  } else if (type === 'viewport') {
    // 3D Viewport Look
    content = `
      <!-- Toolbar -->
      <rect x="0" y="0" width="${width}" height="40" fill="${panel}" />
      <circle cx="20" cy="20" r="5" fill="#555" />
      <circle cx="40" cy="20" r="5" fill="#555" />
      <rect x="60" y="10" width="80" height="20" rx="4" fill="#444" />

      <!-- Main Viewport -->
      <rect x="0" y="40" width="${width-200}" height="${height-40}" fill="#1e1e1e" />

      <!-- Grid Floor -->
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#333" stroke-width="1"/>
        </pattern>
      </defs>
      <rect x="0" y="40" width="${width-200}" height="${height-40}" fill="url(#grid)" />

      <!-- 3D Object (Cube) -->
      <path d="M 300 200 L 400 150 L 500 200 L 400 250 Z" fill="#444" stroke="${accent}" stroke-width="2" />
      <path d="M 300 200 L 300 300 L 400 350 L 400 250" fill="#333" stroke="${accent}" stroke-width="2" />
      <path d="M 500 200 L 500 300 L 400 350" fill="#222" stroke="${accent}" stroke-width="2" />

      <!-- Transform Gizmo -->
      <line x1="400" y1="250" x2="400" y2="150" stroke="#a6e3a1" stroke-width="4" />
      <line x1="400" y1="250" x2="520" y2="280" stroke="#f38ba8" stroke-width="4" />
      <line x1="400" y1="250" x2="280" y2="280" stroke="#89b4fa" stroke-width="4" />

      <!-- Explorer Panel -->
      <rect x="${width-200}" y="40" width="200" height="${height/2}" fill="${panel}" stroke="${border}" />
      <rect x="${width-200}" y="40" width="200" height="20" fill="#333" />
      <text x="${width-190}" y="54" font-family="sans-serif" font-size="10" fill="#ddd">Explorer</text>
      <text x="${width-180}" y="80" font-family="sans-serif" font-size="12" fill="#ddd">Workspace</text>
      <text x="${width-170}" y="100" font-family="sans-serif" font-size="12" fill="${accent}">> ${title}</text>
      <text x="${width-180}" y="120" font-family="sans-serif" font-size="12" fill="#ddd">Players</text>
      <text x="${width-180}" y="140" font-family="sans-serif" font-size="12" fill="#ddd">Lighting</text>

      <!-- Properties Panel -->
      <rect x="${width-200}" y="${40 + height/2}" width="200" height="${height/2 - 40}" fill="${panel}" stroke="${border}" />
      <rect x="${width-200}" y="${40 + height/2}" width="200" height="20" fill="#333" />
      <text x="${width-190}" y="${54 + height/2}" font-family="sans-serif" font-size="10" fill="#ddd">Properties</text>
    `;
  } else {
    // UI Editor Look
    content = `
       <!-- Toolbar -->
      <rect x="0" y="0" width="${width}" height="40" fill="${panel}" />

      <!-- Mobile View Outline -->
      <rect x="0" y="40" width="${width-200}" height="${height-40}" fill="#333" />
      <rect x="200" y="60" width="200" height="350" rx="20" fill="#111" stroke="#555" stroke-width="4" />

      <!-- Mock UI Elements -->
      <rect x="220" y="100" width="160" height="40" rx="8" fill="#f38ba8" />
      <text x="300" y="125" font-family="sans-serif" font-size="16" fill="white" text-anchor="middle">SHOP</text>

      <rect x="220" y="150" width="160" height="40" rx="8" fill="#89b4fa" />
      <text x="300" y="175" font-family="sans-serif" font-size="16" fill="#111" text-anchor="middle">INVENTORY</text>

      <rect x="220" y="200" width="75" height="75" rx="8" fill="#a6e3a1" />
      <rect x="305" y="200" width="75" height="75" rx="8" fill="#fab387" />

      <!-- UI Explorer -->
      <rect x="${width-200}" y="40" width="200" height="${height-40}" fill="${panel}" stroke="${border}" />
      <text x="${width-180}" y="80" font-family="sans-serif" font-size="12" fill="#ddd">StarterGui</text>
      <text x="${width-170}" y="100" font-family="sans-serif" font-size="12" fill="${accent}">> MainInterface</text>
      <text x="${width-160}" y="120" font-family="sans-serif" font-size="12" fill="#ddd">- Frame</text>
      <text x="${width-160}" y="140" font-family="sans-serif" font-size="12" fill="#ddd">- Button</text>
    `;
  }

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${bg}" />
      ${content}
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// --- Data ---
const projects: Project[] = [
  {
    id: 1,
    title: "Project Titan: FPS Framework",
    category: "System Architecture",
    description: "A highly optimized, modular FPS gun framework featuring client-side prediction, server-side validation (anti-cheat), and recoil patterns.",
    tags: ["Luau", "OOP", "Networking", "Raycasting"],
    imageUrl: "/images/image1.webp"
  },
  {
    id: 2,
    title: "Tycoon Data Manager",
    category: "Backend Systems",
    description: "Robust data persistence system using ProfileService with session locking, auto-saving, and duplicate prevention for a 50k+ CCU tycoon game.",
    tags: ["DataStore", "ProfileService", "Rest API"],
    imageUrl: "/images/image2.webp"
  },
  {
    id: 3,
    title: "Inventory & Trading UI",
    category: "User Interface",
    description: "Fully animated, reactive UI built with Roact/Fusion. Includes secure trading logic, drag-and-drop functionality, and mobile support.",
    tags: ["Roact", "Fusion", "UI/UX", "Secure RemoteEvents"],
    imageUrl: "/images/image3.webp"
  },
  {
    id: 4,
    title: "Battle Royale Zone System",
    category: "Game Mechanics",
    description: "Dynamic shrinking zone system with safe circles, damage ticks, and visual effects synchronized across all clients using custom replication.",
    tags: ["Math", "TweenService", "Replication"],
    imageUrl: "/images/image4.webp"
  },
  {
    id: 5,
    title: "Admin Command Panel",
    category: "Tools",
    description: "Secure, permission-based admin panel with logging, banning, kicking, and spectating features. Custom UI integration with OAuth.",
    tags: ["Security", "UI", "Datastore"],
    imageUrl: "/images/image5.webp"
  },
  {
    id: 6,
    title: "Pet Simulator Logic",
    category: "Gameplay Loop",
    description: "Complete pet hatching, equipping, and multiplier calculation system. Optimized for high entity counts and massive data tables.",
    tags: ["OOP", "Inventory", "Math"],
    imageUrl: "/images/image1.webp"
  }
];

const services: Service[] = [
  {
    title: "System Scripting",
    price: "From $150",
    description: "Complex mechanics like combat, inventory, or vehicle chassis programmed from scratch.",
    features: ["Modular OOP Code", "Fully Documented", "Bug-free Guarantee"],
    icon: <Cpu size={24} />
  },
  {
    title: "Backend Architecture",
    price: "From $300",
    description: "Secure data handling, matchmaking systems, and scalable server infrastructure.",
    features: ["ProfileService Integration", "Memory Leak Prevention", "Anti-Exploit Security"],
    icon: <Layers size={24} />
  },
  {
    title: "Full Game Programming",
    price: "Contact for Quote",
    description: "I will program your entire game loop from start to finish based on your GDD.",
    features: ["Project Management", "Live Updates", "Long-term Support"],
    icon: <Gamepad2 size={24} />
  }
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans selection:bg-roblox-accent selection:text-roblox-dark relative overflow-x-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 code-bg opacity-[0.03] pointer-events-none z-0"></div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-roblox-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold font-display tracking-tight text-white flex items-center gap-2">
            <span className="text-roblox-accent">&#123;</span>
            Excellence
            <span className="text-roblox-accent">&#125;</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#contact" className="text-roblox-accent hover:text-white transition-colors">Hire Me</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-roblox-accent/10 border border-roblox-accent/20 text-roblox-accent text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-roblox-accent animate-pulse"></span>
              OPEN FOR COMMISSIONS
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-display text-white leading-[1.1]">
              Turning <span className="text-transparent bg-clip-text bg-gradient-to-r from-roblox-accent to-roblox-secondary">Logic</span> into <span className="italic">Gameplay</span>.
            </h1>
            <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
              I'm Excellence, a professional Roblox Scripter. I build secure, scalable, and engaging systems for the next generation of Roblox experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#portfolio" className="bg-roblox-accent text-roblox-dark font-bold py-4 px-8 rounded-xl hover:bg-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                View My Work <ChevronRight size={18} />
              </a>
              <a href="#contact" className="border border-white/10 bg-white/5 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                Contact Me
              </a>
            </div>

            <div className="flex items-center gap-6 pt-8 text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-roblox-secondary" />
                <span>5+ Years Exp</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-roblox-secondary" />
                <span>Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-roblox-secondary" />
                <span>100M+ Visits Contributed</span>
              </div>
            </div>
          </div>

          {/* Code Showcase Visual */}
          <div className="relative hidden lg:block perspective-1000 group">
            <div className="absolute inset-0 bg-roblox-accent/20 blur-[100px] rounded-full opacity-50"></div>
            <div className="relative bg-roblox-card border border-white/10 rounded-xl p-6 shadow-2xl transform rotate-y-12 rotate-x-6 transition-transform duration-500 group-hover:rotate-0 font-mono text-xs sm:text-sm text-gray-300">
              <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-auto text-gray-600">PlayerHandler.lua</span>
              </div>
              <pre className="overflow-x-auto text-roblox-secondary">
{`local Knit = require(game:GetService("ReplicatedStorage").Packages.Knit)
local PlayerService = Knit.CreateService {
    Name = "PlayerService",
    Client = {},
}

function PlayerService:KnitStart()
    print("PlayerService Started")
    self:ConnectEvents()
end

function PlayerService:LoadProfile(player)
    -- High performance data loading
    local profile = ProfileStore:LoadProfileAsync(
        "Player_" .. player.UserId
    )
    if profile ~= nil then
        profile:AddUserId(player.UserId)
        profile:Reconcile()
        -- Secure handshake with client
    end
end

return PlayerService`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Tech Stack */}
      <div className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-center text-gray-500 text-sm font-mono mb-8">POWERED BY MODERN TECH STACK</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {['Roblox Studio', 'Luau', 'TypeScript', 'Rojo', 'Github', 'VS Code'].map((tech) => (
              <div key={tech} className="flex items-center gap-2 text-xl font-bold text-white">
                <Zap size={20} className="text-roblox-accent" />
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <section id="portfolio" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-bold font-display text-white mb-4">Featured Projects</h2>
              <p className="text-gray-400 max-w-lg">A selection of my best work, ranging from complex backend architecture to immersive gameplay loops.</p>
            </div>
            <a href="https://github.com/Excellencedev" target="_blank" rel="noreferrer" className="text-roblox-accent hover:text-white font-medium flex items-center gap-2 transition-colors">
              View Github <ExternalLink size={16} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group relative bg-roblox-card rounded-2xl overflow-hidden border border-white/5 hover:border-roblox-accent/50 transition-all hover:shadow-[0_0_30px_rgba(137,180,250,0.1)]">
                <div className="aspect-video overflow-hidden bg-roblox-dark relative">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-lg text-xs font-mono text-white border border-white/10">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-roblox-accent transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs text-roblox-muted bg-white/5 px-2 py-1 rounded border border-white/5">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services & Pricing */}
      <section id="services" className="py-32 px-6 bg-roblox-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-white mb-4">Commissions & Pricing</h2>
            <p className="text-gray-400">High quality code delivered on time. Prices are estimated and vary by complexity.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-roblox-card border border-white/5 rounded-2xl p-8 hover:bg-white/[0.02] transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity text-roblox-accent transform group-hover:scale-110 duration-500">
                  {service.icon}
                </div>
                <div className="mb-6 w-12 h-12 rounded-xl bg-roblox-accent/10 flex items-center justify-center text-roblox-accent">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <div className="text-3xl font-display font-bold text-roblox-secondary mb-4">{service.price}</div>
                <p className="text-gray-400 text-sm mb-8">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle2 size={16} className="text-roblox-accent mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About/Philosophy */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-roblox-card to-roblox-dark border border-white/10 rounded-3xl p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-roblox-accent/10 blur-[80px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold font-display text-white">Why Work With Excellence?</h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  Coding on Roblox isn't just about making things work; it's about making them secure, scalable, and fun.
                  I write clean, modular code that is easy for other developers to read and maintain.
                </p>
                <p>
                  I specialize in the <strong className="text-white">Knit Framework</strong> and <strong className="text-white">ProfileService</strong>, ensuring your game data is safe and your networking is optimized to prevent lag and exploits.
                </p>
              </div>
              <div className="pt-4">
                <div className="inline-block p-4 bg-black/20 rounded-xl border border-white/5">
                  <div className="flex gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-white">100%</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">Satisfaction</div>
                    </div>
                    <div className="w-px bg-white/10"></div>
                    <div>
                      <div className="text-2xl font-bold text-white">24/7</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 border-2 border-roblox-accent/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-2 border-2 border-dashed border-roblox-secondary/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Terminal size={48} className="text-roblox-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white">Ready to start your project?</h2>
          <p className="text-xl text-gray-400">
            I'm currently accepting new commissions. Send me a message on Discord or Twitter to discuss your idea.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
            <a
              href="https://discord.com/users/1431461184510492672"
              target="_blank"
              rel="noreferrer"
              className="group relative bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95"
            >
              <Gamepad2 size={24} />
              Discord
            </a>

            <a href="https://x.com/AI_singularit8" target="_blank" rel="noreferrer" className="bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95">
              <Twitter size={24} />
              Twitter / X
            </a>

            <a href="mailto:ademiluyiexcellence@gmail.com" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 border border-white/5">
              <Mail size={24} />
              Email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Excellence. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/Excellencedev" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors"><Github size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Code2 size={20} /></a>
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <AIChat />
    </div>
  );
};

export default App;
