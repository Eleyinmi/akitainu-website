import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Shield, Sword, Trophy, PawPrint, Copy, Check, Menu, X, Rocket, Wallet, ArrowRightLeft, Send } from "lucide-react";
import { SiTelegram, SiX } from "react-icons/si";

export default function Home() {
  const [init, setInit] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("EQD6ikvSPUcpE6HB_OjxCMVkFwrtK73CVV1VLR6NWEykojuQ");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Tokenomics", href: "#tokenomics" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "Community", href: "#community" },
  ];

  return (
    <div className="min-h-screen bg-[#040812] text-white font-inter selection:bg-[#0098EA] selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-t-0 border-l-0 border-r-0 border-b border-[#0098EA]/30 py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-2" data-testid="link-home">
            <span className="font-orbitron text-2xl font-bold tracking-widest text-white">AKITA</span>
            <div className="w-2 h-2 rounded-full bg-[#0098EA] shadow-[0_0_10px_#0098EA] animate-pulse" />
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-sm uppercase tracking-wider text-white/70 hover:text-white transition-colors font-medium"
                  data-testid={`link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <a 
              href="https://dedust.io"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#0098EA] to-[#29b6f6] hover:from-[#29b6f6] hover:to-[#0098EA] text-white px-6 py-2 rounded-md font-bold uppercase text-sm tracking-widest shadow-[0_0_15px_rgba(0,152,234,0.4)] hover:shadow-[0_0_25px_rgba(0,152,234,0.6)] transition-all"
              data-testid="button-buy-nav"
            >
              Buy AKITA
            </a>
          </div>

          <button 
            className="md:hidden text-white/80 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 glass-card border-b border-[#0098EA]/30 flex flex-col p-6 gap-4 md:hidden">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-lg uppercase tracking-wider text-white/80 hover:text-white font-medium py-2 border-b border-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://dedust.io"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#0098EA] to-[#29b6f6] text-white px-6 py-3 rounded-md font-bold uppercase text-center tracking-widest mt-4"
            >
              Buy AKITA
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] pt-24 pb-12 flex flex-col justify-center overflow-hidden">
        {init && (
          <div className="absolute inset-0 z-0">
            <Particles
              id="tsparticles"
              options={{
                background: { color: { value: "transparent" } },
                fpsLimit: 60,
                particles: {
                  color: { value: ["#ffffff", "#0098EA"] },
                  links: {
                    color: "#0098EA",
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1,
                  },
                  move: {
                    direction: "none",
                    enable: true,
                    outModes: { default: "bounce" },
                    random: false,
                    speed: 0.5,
                    straight: false,
                  },
                  number: { density: { enable: true, area: 800 }, value: 60 },
                  opacity: { value: 0.5 },
                  shape: { type: "circle" },
                  size: { value: { min: 1, max: 3 } },
                },
                detectRetina: true,
              }}
            />
          </div>
        )}
        
        {/* Glow behind hero content */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0098EA]/10 blur-[120px] rounded-full z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 z-10 grid md:grid-cols-12 gap-12 items-center flex-1">
          <div className="md:col-span-7 flex flex-col gap-6 pt-12 md:pt-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-[#0098EA] text-xs md:text-sm font-bold tracking-[0.2em] uppercase bg-[#0098EA]/10 px-4 py-2 rounded-full border border-[#0098EA]/30 inline-block mb-2">
                TON Blockchain · Community Takeover
              </span>
            </motion.div>
            
            <motion.h1 
              className="font-orbitron text-5xl md:text-6xl lg:text-7xl leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-[#f0b429] block tracking-wide">AKITA INU</span>
              <span className="text-white font-black uppercase tracking-widest mt-2 block">The Guardian of TON</span>
            </motion.h1>
            
            <motion.h2 
              className="text-xl md:text-2xl text-white/90 font-medium tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Loyalty. Bravery. Honor.
            </motion.h2>
            
            <motion.p 
              className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              A warrior born on the TON chain — not chasing hype, but building legacy. Akita doesn't flinch at the dip. He doesn't chase the pump. He stands guard, fights fair, and brings his community to the moon.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a 
                href="https://dedust.io"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#0098EA] to-[#29b6f6] text-white px-8 py-4 rounded-md font-bold uppercase tracking-widest text-center shadow-[0_0_20px_rgba(0,152,234,0.4)] hover:shadow-[0_0_30px_rgba(0,152,234,0.6)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                data-testid="button-buy-hero"
              >
                Buy AKITA <ArrowRightLeft className="w-4 h-4" />
              </a>
              <a 
                href="https://t.me/AkitaOnTonNetwork"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#0098EA] text-white bg-[#0098EA]/10 hover:bg-[#0098EA]/20 px-8 py-4 rounded-md font-bold uppercase tracking-widest text-center hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                data-testid="button-community-hero"
              >
                Join Community
              </a>
            </motion.div>
          </div>
          
          <div className="md:col-span-5 relative flex justify-center pb-20 md:pb-0">
            <div className="absolute inset-0 bg-[#0098EA]/20 blur-[80px] rounded-full z-0" />
            <motion.img 
              src="/images/akita-warrior.jpg" 
              alt="Akita Warrior" 
              className="w-full max-w-md rounded-2xl border-2 border-[#0098EA]/40 shadow-[0_0_40px_rgba(0,152,234,0.3)] z-10 float-anim object-cover aspect-square"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>

        {/* Ticker Marquee */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#0098EA]/10 border-t border-b border-[#0098EA]/30 py-3 overflow-hidden backdrop-blur-md z-20">
          <div className="marquee whitespace-nowrap text-[#0098EA] font-orbitron font-bold tracking-widest text-sm flex gap-8">
            <span className="flex-shrink-0">AKITA INU · GUARDIAN OF TON · LOYALTY · BRAVERY · HONOR · CTO PROJECT · TON BLOCKCHAIN · 🐕 AKITA INU · AKITA INU · GUARDIAN OF TON · LOYALTY · BRAVERY · HONOR · CTO PROJECT · TON BLOCKCHAIN · 🐕 AKITA INU ·</span>
            <span className="flex-shrink-0">AKITA INU · GUARDIAN OF TON · LOYALTY · BRAVERY · HONOR · CTO PROJECT · TON BLOCKCHAIN · 🐕 AKITA INU · AKITA INU · GUARDIAN OF TON · LOYALTY · BRAVERY · HONOR · CTO PROJECT · TON BLOCKCHAIN · 🐕 AKITA INU ·</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
          <div className="text-center mb-16">
            <span className="text-[#0098EA] font-bold tracking-widest text-sm uppercase mb-4 block">Who is Akita?</span>
            <h2 className="font-orbitron text-4xl md:text-5xl text-white mb-6 uppercase">More Than a Meme. A Movement.</h2>
            <p className="text-white/70 max-w-3xl mx-auto text-lg leading-relaxed">
              In a market full of noise, Akita stays true. We climb every candle with heart, stand through every dip with honor, and rise again with unshakable loyalty. This isn't hype — it's devotion. This is the Akita spirit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Shield, title: "LOYALTY", desc: "He never abandons his holders. Through every dip, through every storm." },
                { icon: Sword, title: "BRAVERY", desc: "He faces every market challenge head-on. No fear. No retreat." },
                { icon: Trophy, title: "HONOR", desc: "Community-first, always. Fair launch, no team allocation, no rugs." },
                { icon: PawPrint, title: "GUARDIANSHIP", desc: "Protecting TON holders and the ecosystem he calls home." },
              ].map((trait, i) => (
                <motion.div 
                  key={trait.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card glass-card-hover p-6 rounded-xl flex flex-col gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#0098EA]/20 flex items-center justify-center text-[#0098EA]">
                    <trait.icon size={24} />
                  </div>
                  <h3 className="font-orbitron text-xl text-white">{trait.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{trait.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,152,234,0.2)] border border-[#0098EA]/30">
              <img src="/images/akita-trio.jpg" alt="Akita Trio" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-24 relative bg-[#0098EA]/5 border-y border-[#0098EA]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
          <div className="text-center mb-16">
            <span className="text-[#0098EA] font-bold tracking-widest text-sm uppercase mb-4 block">Token Stats</span>
            <h2 className="font-orbitron text-4xl md:text-5xl text-white mb-6 uppercase">AKITA INU On-Chain</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: "Token Price", val: "$0.000042", change: "▲ +12.4%" },
              { label: "Market Cap", val: "$420,000", change: "▲ +8.2%" },
              { label: "Liquidity", val: "$85,000", change: "▲ +5.1%" },
              { label: "24H Volume", val: "$62,000", change: "▲ +22.7%" },
              { label: "Holders", val: "1,247", change: "▲ +43 today" },
              { label: "Daily Change", val: "+12.4%", change: "Bullish 🔥" },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card glass-card-hover p-8 rounded-xl flex flex-col items-center text-center gap-2"
              >
                <span className="text-white/60 text-sm uppercase tracking-widest font-medium">{stat.label}</span>
                <span className="font-orbitron text-3xl text-white">{stat.val}</span>
                <span className="text-green-400 text-sm font-bold">{stat.change}</span>
              </motion.div>
            ))}
          </div>

          <div className="glass-card p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div className="flex-1 w-full flex flex-col gap-2">
              <span className="text-[#0098EA] text-xs font-bold uppercase tracking-widest">Contract Address</span>
              <div className="bg-black/50 font-mono text-sm md:text-base p-3 rounded border border-white/10 break-all text-white/90">
                EQD6ikvSPUcpE6HB_OjxCMVkFwrtK73CVV1VLR6NWEykojuQ
              </div>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button 
                onClick={handleCopy}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-white/20 hover:bg-white/10 px-6 py-3 rounded text-sm font-bold uppercase tracking-wider transition-colors"
              >
                {copied ? <Check className="text-green-400" size={18} /> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <a 
                href="https://dedust.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#0098EA] hover:bg-[#29b6f6] text-white px-6 py-3 rounded text-sm font-bold uppercase tracking-wider transition-colors shadow-[0_0_15px_rgba(0,152,234,0.4)]"
              >
                Buy <ArrowRightLeft size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics */}
      <section id="tokenomics" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
          <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
            <div className="flex-1">
              <span className="text-[#0098EA] font-bold tracking-widest text-sm uppercase mb-4 block">AKITANOMICS</span>
              <h2 className="font-orbitron text-4xl md:text-5xl text-white mb-6 uppercase">Fair. Transparent. Community-Owned.</h2>
              <div className="inline-flex items-center gap-3 bg-[#f0b429]/10 border border-[#f0b429]/50 text-[#f0b429] px-6 py-3 rounded-lg text-sm md:text-base mb-8">
                <span className="text-xl">⚠</span>
                <p>No team allocation. No VC. No presale. This is a 100% CTO project.</p>
              </div>
              <p className="text-white/60 text-lg">Total Supply: 1,000,000,000 AKITA</p>
            </div>
            <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(240,180,41,0.2)] border border-[#f0b429]/30">
              <img src="/images/akita-council.jpg" alt="Akita Council" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Liquidity", val: 60, color: "#0098EA" },
              { label: "Community", val: 20, color: "#f0b429" },
              { label: "CEX Fund", val: 15, color: "#00e5ff" },
              { label: "Burn", val: 5, color: "#ff3d00" },
            ].map((item, i) => (
              <motion.div 
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-xl flex flex-col items-center text-center gap-4 border-t-2"
                style={{ borderTopColor: item.color }}
              >
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                    <motion.circle 
                      cx="50" cy="50" r="40" 
                      fill="transparent" 
                      stroke={item.color} 
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      initial={{ strokeDashoffset: 251.2 }}
                      whileInView={{ strokeDashoffset: 251.2 - (251.2 * item.val) / 100 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute font-orbitron text-xl" style={{ color: item.color }}>{item.val}%</span>
                </div>
                <span className="text-white/80 font-medium uppercase tracking-wider text-sm">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <img src="/images/akita-moon.jpg" alt="" className="w-full h-full object-cover object-right mask-image-l" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black)' }} />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 md:px-12 z-10 relative">
          <div className="text-center mb-16">
            <span className="text-[#0098EA] font-bold tracking-widest text-sm uppercase mb-4 block">The Mission</span>
            <h2 className="font-orbitron text-4xl md:text-5xl text-white mb-6 uppercase">A CTO journey built with the community.</h2>
          </div>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-1 bg-[#0098EA]/30 -translate-x-1/2 shadow-[0_0_15px_rgba(0,152,234,0.5)]" />

            {[
              { phase: "PHASE 1", title: "AWAKENING", active: true, desc: "CTO launched, Community formed, Telegram & X channels live, Building trust" },
              { phase: "PHASE 2", title: "THE PUSH", active: false, desc: "Marketing campaign, Influencer outreach, DEX listing, Referral program" },
              { phase: "PHASE 3", title: "ALPHA PACK", active: false, desc: "CEX listing pursuit, Strategic partnerships, Utility exploration, Cross-chain awareness" },
              { phase: "PHASE 4", title: "NUKE THE MOON", active: false, desc: "Ecosystem growth, Long-term loyalty rewards, Community governance" },
            ].map((item, i) => (
              <motion.div 
                key={item.phase}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex items-center mb-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} pl-12 md:pl-0`}
              >
                <div className={`absolute left-[15px] md:left-1/2 w-6 h-6 rounded-full -translate-x-1/2 border-4 border-[#040812] ${item.active ? 'bg-[#0098EA] shadow-[0_0_15px_#0098EA] animate-pulse' : 'bg-gray-600'}`} />
                
                <div className={`w-full md:w-[45%] ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className={`glass-card p-6 rounded-xl inline-block w-full border-l-4 ${item.active ? 'border-l-[#0098EA]' : 'border-l-gray-600'}`}>
                    <span className={`text-xs font-bold tracking-widest block mb-2 ${item.active ? 'text-[#0098EA]' : 'text-gray-400'}`}>{item.phase}</span>
                    <h3 className="font-orbitron text-2xl text-white mb-3">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <p className="text-center text-white/40 italic text-sm mt-8">
            * This roadmap evolves with the community. We are the team.
          </p>
        </div>
      </section>

      {/* How to Buy */}
      <section className="py-24 relative bg-[#0098EA]/5 border-y border-[#0098EA]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
          <div className="text-center mb-16">
            <span className="text-[#0098EA] font-bold tracking-widest text-sm uppercase mb-4 block">Join The Pack</span>
            <h2 className="font-orbitron text-4xl md:text-5xl text-white mb-6 uppercase">Get your AKITA in 3 simple steps.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { num: 1, title: "Get a TON Wallet", desc: "Download Tonkeeper or any TON wallet. Save your seed phrase securely.", icon: Wallet },
              { num: 2, title: "Buy TON", desc: "Purchase from Binance, OKX, Bybit and send to your wallet address.", icon: Send },
              { num: 3, title: "Swap for AKITA", desc: "Go to DeDust.io, paste the contract, swap TON for AKITA.", icon: ArrowRightLeft },
            ].map((step, i) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card glass-card-hover p-8 rounded-2xl relative text-center flex flex-col items-center mt-8"
              >
                <div className="absolute -top-8 w-16 h-16 rounded-full bg-[#0098EA] flex items-center justify-center text-white font-orbitron text-2xl font-bold shadow-[0_0_20px_#0098EA] border-4 border-[#040812]">
                  {step.num}
                </div>
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-[#0098EA] mb-6 mt-4">
                  <step.icon size={24} />
                </div>
                <h3 className="font-orbitron text-xl text-white mb-4">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <a 
              href="https://dedust.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-[#0098EA] to-[#29b6f6] text-white px-12 py-5 rounded-md font-orbitron font-bold uppercase tracking-widest text-xl shadow-[0_0_30px_rgba(0,152,234,0.5)] hover:shadow-[0_0_50px_rgba(0,152,234,0.8)] hover:scale-105 transition-all"
            >
              Buy AKITA on DeDust
            </a>
          </div>
        </div>
      </section>

      {/* Community */}
      <section id="community" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,152,234,0.15)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 w-full md:pr-12">
              <h2 className="font-orbitron text-4xl md:text-6xl text-white mb-6 uppercase leading-tight">JOIN THE PACK <span className="text-[#f0b429]">🐕</span></h2>
              <p className="text-white/80 text-xl md:text-2xl mb-12">Akita doesn't fight alone. Neither should you.</p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: SiTelegram, name: "Telegram", desc: "Join 1,000+ holders in the Akita army", btn: "Join Telegram", link: "https://t.me/AkitaOnTonNetwork", color: "#229ED9" },
                  { icon: SiX, name: "Twitter / X", desc: "Follow for alpha, updates, and meme warfare", btn: "Follow on X", link: "https://x.com/akitaonton1", color: "#fff" },
                  { icon: Rocket, name: "DexScreener", desc: "Track the chart live", btn: "View Chart", link: "https://dexscreener.com", color: "#fff" },
                  { icon: Shield, name: "TonScan", desc: "Verify on-chain", btn: "View on TonScan", link: "https://tonscan.org", color: "#0098EA" },
                ].map((social, i) => (
                  <motion.a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={social.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card glass-card-hover p-6 rounded-xl flex flex-col items-start gap-4 group"
                  >
                    <social.icon size={32} style={{ color: social.color }} />
                    <div>
                      <h3 className="font-orbitron text-lg text-white mb-1">{social.name}</h3>
                      <p className="text-white/50 text-xs">{social.desc}</p>
                    </div>
                    <span className="mt-auto text-xs font-bold uppercase tracking-wider text-[#0098EA] group-hover:text-[#29b6f6] flex items-center gap-1">
                      {social.btn} <ArrowRightLeft size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div className="w-full md:w-[40%]">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,152,234,0.3)] border border-[#0098EA]/40 rotate-2 hover:rotate-0 transition-all duration-500">
                <img src="/images/akita-army.jpg" alt="Akita Army" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040812] to-transparent opacity-60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#020408] pt-16 pb-8 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="font-orbitron text-3xl font-bold tracking-widest text-white">AKITA</span>
                <div className="w-2 h-2 rounded-full bg-[#0098EA]" />
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                Loyalty. Bravery. Honor. The Guardian of TON. A community takeover project built for the people, by the people.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-orbitron tracking-widest uppercase mb-6 text-sm">Quick Links</h4>
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} className="text-white/50 hover:text-[#0098EA] text-sm transition-colors w-fit">
                    {link.name}
                  </a>
                ))}
                <a href="https://dedust.io" className="text-[#0098EA] hover:text-[#29b6f6] font-bold text-sm transition-colors w-fit">
                  How to Buy
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-orbitron tracking-widest uppercase mb-6 text-sm">Community</h4>
              <div className="flex gap-4">
                <a href="https://t.me/AkitaOnTonNetwork" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-[#0098EA] hover:text-white transition-all">
                  <SiTelegram size={18} />
                </a>
                <a href="https://x.com/akitaonton1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-[#0098EA] hover:text-white transition-all">
                  <SiX size={18} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <p>© 2025 AKITA INU. Community-owned. CTO Project.</p>
            <p>Not financial advice. DYOR.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
