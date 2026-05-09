import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import {
  Shield, Sword, Trophy, PawPrint, Copy, Check, Menu, X,
  Rocket, Wallet, ArrowRightLeft, Send, TrendingUp, TrendingDown, RefreshCw
} from "lucide-react";
import { SiTelegram, SiX } from "react-icons/si";

const CA = "EQD6ikvSPUcpE6HB_OjxCMVkFwrtK73CVV1VLR6NWEykojuQ";
const BUY_LINK = `https://dedust.io/swap/TON/${CA}`;

interface TokenStats {
  price: string;
  marketCap: string;
  liquidity: string;
  priceChange24h: string;
  isPositive: boolean;
  loading: boolean;
}

function formatCurrency(val: number): string {
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(2)}M`;
  if (val >= 1_000) return `$${(val / 1_000).toFixed(2)}K`;
  return `$${val.toFixed(2)}`;
}

export default function Home() {
  const [particlesInit, setParticlesInit] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tokenStats, setTokenStats] = useState<TokenStats>({
    price: "—", marketCap: "—", liquidity: "—",
    priceChange24h: "—", isPositive: true, loading: true,
  });
  const statsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesInit(true));
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${CA}`
      );
      const data = await res.json();
      const pair = data.pairs?.[0];
      if (pair) {
        const priceChange = Number(pair.priceChange?.h24 ?? 0);
        const priceNum = Number(pair.priceUsd ?? 0);
        setTokenStats({
          price: priceNum < 0.0001
            ? `$${priceNum.toFixed(10)}`
            : priceNum < 0.01
            ? `$${priceNum.toFixed(8)}`
            : `$${priceNum.toFixed(6)}`,
          marketCap: pair.marketCap ? formatCurrency(pair.marketCap) : "N/A",
          liquidity: pair.liquidity?.usd ? formatCurrency(pair.liquidity.usd) : "N/A",
          priceChange24h: `${priceChange > 0 ? "+" : ""}${priceChange.toFixed(2)}%`,
          isPositive: priceChange >= 0,
          loading: false,
        });
      } else {
        setTokenStats((prev) => ({ ...prev, loading: false }));
      }
    } catch {
      setTokenStats((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  const handleCopy = () => {
    navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToStats = () => {
    statsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Tokenomics", href: "#tokenomics" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "Community", href: "#community" },
  ];

  const phases = [
    {
      phase: "PHASE 1", title: "AWAKENING", active: true,
      items: [
        { done: true, text: "CTO launched on TON" },
        { done: true, text: "Community formed" },
        { done: true, text: "Telegram & X channels live" },
        { done: false, text: "Building trust and momentum" },
      ],
    },
    {
      phase: "PHASE 2", title: "THE PUSH", active: false,
      items: [
        { done: false, text: "Marketing campaign launch" },
        { done: false, text: "Influencer outreach" },
        { done: false, text: "DEX listing promotion" },
      ],
    },
    {
      phase: "PHASE 3", title: "ALPHA PACK", active: false,
      items: [
        { done: false, text: "Strategic partnerships" },
        { done: false, text: "Utility exploration" },
        { done: false, text: "Cross-chain awareness" },
      ],
    },
    {
      phase: "PHASE 4", title: "NUKE THE MOON", active: false,
      items: [
        { done: false, text: "AKITA INU ecosystem growth" },
        { done: false, text: "Long-term loyalty rewards" },
        { done: false, text: "Community governance" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#040812] text-white font-inter selection:bg-[#0098EA] selection:text-white overflow-x-hidden">

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-t-0 border-l-0 border-r-0 border-b border-[#0098EA]/30 py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-2" data-testid="link-home">
            <span className="font-bangers text-3xl text-white tracking-widest">AKITA</span>
            <div className="w-2 h-2 rounded-full bg-[#0098EA] shadow-[0_0_10px_#0098EA] animate-pulse" />
          </a>

          <div className="hidden md:flex items-center gap-8">
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
            <a
              href={BUY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#0098EA] to-[#29b6f6] text-white px-6 py-2 rounded-md font-bold uppercase text-sm tracking-widest shadow-[0_0_15px_rgba(0,152,234,0.4)] hover:shadow-[0_0_25px_rgba(0,152,234,0.6)] transition-all"
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
              href={BUY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#0098EA] to-[#29b6f6] text-white px-6 py-3 rounded-md font-bold uppercase text-center tracking-widest mt-4"
            >
              Buy AKITA
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-[100dvh] pt-20 flex flex-col overflow-hidden">
        {/* Particles */}
        {particlesInit && (
          <div className="absolute inset-0 z-0">
            <Particles
              id="tsparticles"
              options={{
                background: { color: { value: "transparent" } },
                fpsLimit: 60,
                particles: {
                  color: { value: ["#ffffff", "#0098EA"] },
                  links: { color: "#0098EA", distance: 150, enable: true, opacity: 0.15, width: 1 },
                  move: { direction: "none", enable: true, outModes: { default: "bounce" }, speed: 0.4, straight: false },
                  number: { density: { enable: true, area: 900 }, value: 55 },
                  opacity: { value: 0.45 },
                  shape: { type: "circle" },
                  size: { value: { min: 1, max: 3 } },
                },
                detectRetina: true,
              }}
            />
          </div>
        )}

        {/* Blue radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#0098EA]/10 blur-[150px] rounded-full z-0 pointer-events-none" />

        {/* Giant watermark */}
        <div className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden pointer-events-none select-none">
          <span
            className="font-bangers text-[22vw] tracking-widest whitespace-nowrap"
            style={{
              color: "transparent",
              WebkitTextStroke: "2px rgba(0,152,234,0.08)",
            }}
          >
            AKITA INU
          </span>
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 pb-8 gap-4">

          {/* Eyebrow */}
          <motion.span
            className="mt-6 text-[#0098EA] text-[10px] md:text-sm font-bold tracking-[0.12em] md:tracking-[0.2em] uppercase bg-[#0098EA]/10 px-3 md:px-4 py-2 rounded-full border border-[#0098EA]/30 whitespace-nowrap text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            TON Blockchain · CTO Project
          </motion.span>

          {/* Character + floating buttons */}
          <div className="relative flex items-center justify-center w-full max-w-lg">

            {/* Left: social circles */}
            <div className="absolute left-0 md:-left-4 flex flex-col gap-3 z-20">
              <motion.a
                href="https://t.me/AkitaOnTonNetwork"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-telegram-hero"
                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#229ED9] flex items-center justify-center shadow-[0_0_20px_rgba(34,158,217,0.6)] hover:scale-110 transition-all"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <SiTelegram size={22} color="white" />
              </motion.a>
              <motion.a
                href="https://x.com/akitaonton1"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-x-hero"
                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black border-2 border-white/30 flex items-center justify-center hover:border-white/70 hover:scale-110 transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <SiX size={20} color="white" />
              </motion.a>
            </div>

            {/* Character image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
            >
              <div className="absolute inset-0 bg-[#0098EA]/30 blur-[70px] rounded-full z-0 scale-90" />
              <img
                src="/images/akita-guardian.jpg"
                alt="AKITA INU Guardian"
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-2 border-[#0098EA]/50 shadow-[0_0_60px_rgba(0,152,234,0.5)] z-10 relative float-anim"
              />
            </motion.div>

            {/* Right: BUY NOW circle */}
            <motion.button
              onClick={scrollToStats}
              data-testid="button-buy-circle"
              className="absolute right-0 md:-right-4 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,152,234,0.7)] hover:scale-110 transition-all z-20 border-4 border-[#040812] cursor-pointer"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <span className="font-bangers text-[#0098EA] text-xs md:text-sm leading-tight text-center tracking-wider">
                BUY<br />NOW
              </span>
            </motion.button>
          </div>

          {/* Title */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="font-bangers text-6xl md:text-8xl leading-none tracking-wider text-[#f0b429]">
              AKITA INU
            </h1>
            <h2 className="font-bangers text-2xl md:text-4xl text-white tracking-widest mt-1">
              THE GUARDIAN OF TON
            </h2>
          </motion.div>

          <motion.p
            className="text-white/60 text-sm md:text-base text-center max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Loyalty. Bravery. Honor. A warrior born on the TON chain — not chasing hype, but building legacy.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              onClick={scrollToStats}
              data-testid="button-buy-hero"
              className="bg-gradient-to-r from-[#0098EA] to-[#29b6f6] text-white px-8 py-4 rounded-md font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(0,152,234,0.4)] hover:shadow-[0_0_35px_rgba(0,152,234,0.7)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              Buy AKITA <ArrowRightLeft className="w-4 h-4" />
            </button>
            <a
              href="https://t.me/AkitaOnTonNetwork"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-community-hero"
              className="border border-[#0098EA] text-white bg-[#0098EA]/10 hover:bg-[#0098EA]/20 px-8 py-4 rounded-md font-bold uppercase tracking-widest hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              Join Community
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Ticker (standalone strip, no overlap) ── */}
      <div className="bg-[#0098EA]/10 border-t border-b border-[#0098EA]/30 py-3 overflow-hidden">
        <div className="marquee whitespace-nowrap text-[#0098EA] font-orbitron font-bold tracking-widest text-sm flex gap-8">
          <span className="flex-shrink-0">
            AKITA INU · GUARDIAN OF TON · LOYALTY · BRAVERY · HONOR · CTO PROJECT · TON BLOCKCHAIN · 🐕 AKITA INU · AKITA INU · GUARDIAN OF TON · LOYALTY · BRAVERY · HONOR · CTO PROJECT · TON BLOCKCHAIN · 🐕 AKITA INU ·
          </span>
          <span className="flex-shrink-0">
            AKITA INU · GUARDIAN OF TON · LOYALTY · BRAVERY · HONOR · CTO PROJECT · TON BLOCKCHAIN · 🐕 AKITA INU · AKITA INU · GUARDIAN OF TON · LOYALTY · BRAVERY · HONOR · CTO PROJECT · TON BLOCKCHAIN · 🐕 AKITA INU ·
          </span>
        </div>
      </div>

      {/* ── About ── */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
          <div className="text-center mb-16">
            <span className="text-[#0098EA] font-bold tracking-widest text-sm uppercase mb-4 block">Who is Akita?</span>
            <h2 className="font-bangers text-5xl md:text-6xl text-white mb-6 tracking-wider">
              More Than a Meme. A Movement.
            </h2>
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
                  <h3 className="font-bangers text-2xl text-white tracking-wider">{trait.title}</h3>
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

      {/* ── Live Token Stats ── */}
      <section id="stats" ref={statsRef} className="py-24 relative bg-[#0098EA]/5 border-y border-[#0098EA]/20">
        <div className="max-w-2xl mx-auto px-6 md:px-12 z-10 relative">
          <div className="text-center mb-10">
            <span className="text-[#0098EA] font-bold tracking-widest text-sm uppercase mb-4 block">Token Stats</span>
            <h2 className="font-bangers text-5xl md:text-6xl text-white tracking-wider">AKITA INU On-Chain</h2>
          </div>

          {/* Reference-style card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl overflow-hidden border border-[#0098EA]/40 shadow-[0_0_40px_rgba(0,152,234,0.2)]"
          >
            {/* Card header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-2 bg-[#0098EA]/20 border border-[#0098EA]/40 px-3 py-1.5 rounded-full">
                <span className="text-[#0098EA] text-xs font-bold">⬡ TON Chain</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-bold tracking-widest">LIVE</span>
                <button
                  onClick={fetchStats}
                  data-testid="button-refresh-stats"
                  className="ml-2 text-white/30 hover:text-white/70 transition-colors"
                  title="Refresh"
                >
                  <RefreshCw size={13} />
                </button>
              </div>
            </div>

            {/* CA address */}
            <div className="px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                <span className="font-mono text-xs md:text-sm text-white/80 flex-1 truncate">
                  {CA}
                </span>
                <button
                  onClick={handleCopy}
                  data-testid="button-copy-ca"
                  className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 hover:bg-[#0098EA]/30 flex items-center justify-center transition-colors"
                  title="Copy address"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-white/70" />}
                </button>
              </div>
              {copied && (
                <p className="text-green-400 text-xs mt-1.5 text-center font-bold">Copied!</p>
              )}
            </div>

            {/* Stats 2×2 grid */}
            <div className="grid grid-cols-2 gap-px bg-white/10 border-b border-white/10">
              {[
                {
                  label: "PRICE",
                  value: tokenStats.price,
                  color: "text-white",
                  loading: tokenStats.loading,
                },
                {
                  label: "MARKET CAP",
                  value: tokenStats.marketCap,
                  color: "text-white",
                  loading: tokenStats.loading,
                },
                {
                  label: "LIQUIDITY",
                  value: tokenStats.liquidity,
                  color: "text-white",
                  loading: tokenStats.loading,
                },
                {
                  label: "24H CHANGE",
                  value: tokenStats.priceChange24h,
                  color: tokenStats.isPositive ? "text-green-400" : "text-red-400",
                  loading: tokenStats.loading,
                  icon: tokenStats.isPositive ? TrendingUp : TrendingDown,
                },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#040812]/80 p-5 flex flex-col gap-1">
                  <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">
                    {stat.label}
                  </span>
                  <div className="flex items-center gap-2">
                    {stat.icon && <stat.icon size={16} className={stat.color} />}
                    <span className={`font-orbitron text-lg md:text-xl font-bold ${stat.loading ? "animate-pulse text-white/30" : stat.color}`}>
                      {stat.loading ? "loading..." : stat.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Buy button */}
            <div className="p-5">
              <a
                href={BUY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-buy-stats"
                className="block w-full text-center bg-gradient-to-r from-[#0098EA] to-[#0066cc] hover:from-[#29b6f6] hover:to-[#0098EA] text-white py-4 rounded-xl font-bold text-lg tracking-widest shadow-[0_0_25px_rgba(0,152,234,0.4)] hover:shadow-[0_0_40px_rgba(0,152,234,0.7)] transition-all hover:-translate-y-0.5"
              >
                Buy $AKITA Now →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Tokenomics ── */}
      <section id="tokenomics" className="py-24 relative">
        <div className="max-w-3xl mx-auto px-6 md:px-12 z-10 relative">
          <div className="text-center mb-12">
            <span className="text-[#0098EA] font-bold tracking-widest text-sm uppercase mb-4 block">Akitanomics</span>
            <h2 className="font-bangers text-5xl md:text-6xl text-white mb-4 tracking-wider">
              Fair. Transparent. Community-Owned.
            </h2>
            <div className="inline-flex items-start gap-3 bg-[#f0b429]/10 border border-[#f0b429]/50 text-[#f0b429] px-6 py-3 rounded-lg text-sm md:text-base">
              <span className="text-xl flex-shrink-0">⚠</span>
              <p>No team allocation. No VC. No presale. This is a 100% CTO project.</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl overflow-hidden border border-[#0098EA]/40 shadow-[0_0_40px_rgba(0,152,234,0.15)]"
          >
            {[
              { label: "Token Name", value: "Akita Inu", accent: false },
              { label: "Ticker", value: "$AKITA", accent: true },
              { label: "Blockchain", value: "TON", accent: false },
              { label: "Total Supply", value: "1,000,000,000", accent: false },
              { label: "Liquidity", value: "🔒 Locked", accent: false },
            ].map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between px-6 py-5 ${i < 4 ? "border-b border-white/8" : ""}`}
              >
                <span className="text-white/50 text-sm uppercase tracking-widest font-medium">{row.label}</span>
                <span className={`font-orbitron text-base md:text-lg font-bold ${row.accent ? "text-[#0098EA]" : "text-white"}`}>
                  {row.value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Roadmap ── */}
      <section id="roadmap" className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <img
            src="/images/akita-moon.jpg"
            alt=""
            className="w-full h-full object-cover object-right"
            style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black)" }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-12 z-10 relative">
          <div className="text-center mb-16">
            <span className="text-[#0098EA] font-bold tracking-widest text-sm uppercase mb-4 block">The Mission</span>
            <h2 className="font-bangers text-5xl md:text-6xl text-white mb-4 tracking-wider">THE MISSION</h2>
            <p className="text-white/50 text-base">A CTO journey built with the community, for the community.</p>
          </div>

          <div className="relative">
            <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[#0098EA]/30 -translate-x-1/2 shadow-[0_0_15px_rgba(0,152,234,0.5)]" />

            {phases.map((item, i) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                className={`relative flex items-start mb-12 ${i % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"} pl-12 md:pl-0`}
              >
                {/* Dot */}
                <div
                  className={`absolute left-[15px] md:left-1/2 top-6 w-7 h-7 rounded-full -translate-x-1/2 border-4 border-[#040812] flex items-center justify-center ${
                    item.active
                      ? "bg-[#0098EA] shadow-[0_0_0_6px_rgba(0,152,234,0.25),0_0_20px_#0098EA]"
                      : "bg-[#1a2744] border-gray-600"
                  }`}
                />

                <div className={`w-full md:w-[45%] ${i % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
                  <div className={`glass-card p-6 rounded-xl border-l-4 ${item.active ? "border-l-[#0098EA]" : "border-l-[#1a2744]"}`}>
                    <span className={`text-xs font-bold tracking-widest block mb-1 ${item.active ? "text-[#0098EA]" : "text-gray-500"}`}>
                      {item.phase}
                    </span>
                    <h3 className={`font-bangers text-2xl mb-4 tracking-wider ${item.active ? "text-white" : "text-white/70"}`}>
                      {item.title}
                      {item.active && (
                        <span className="ml-3 text-xs font-sans font-bold text-[#0098EA] bg-[#0098EA]/20 px-2 py-0.5 rounded-full border border-[#0098EA]/40 uppercase tracking-widest align-middle">
                          Active
                        </span>
                      )}
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {item.items.map((bullet, bi) => (
                        <li key={bi} className="flex items-start gap-2 text-sm">
                          <span className={`mt-0.5 flex-shrink-0 ${bullet.done ? "text-green-400" : item.active ? "text-[#0098EA]" : "text-white/30"}`}>
                            {bullet.done ? "✓" : "→"}
                          </span>
                          <span className={bullet.done ? "text-white/80" : "text-white/50"}>
                            {bullet.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-white/40 italic text-sm mt-4">
            * This roadmap evolves with the community. We are the team.
          </p>
        </div>
      </section>

      {/* ── How to Buy ── */}
      <section className="py-24 relative bg-[#0098EA]/5 border-y border-[#0098EA]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
          <div className="text-center mb-16">
            <span className="text-[#0098EA] font-bold tracking-widest text-sm uppercase mb-4 block">Join The Pack</span>
            <h2 className="font-bangers text-5xl md:text-6xl text-white mb-4 tracking-wider">
              Get your AKITA in 3 simple steps.
            </h2>
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
                <div className="absolute -top-8 w-16 h-16 rounded-full bg-[#0098EA] flex items-center justify-center font-bangers text-white text-3xl shadow-[0_0_20px_#0098EA] border-4 border-[#040812]">
                  {step.num}
                </div>
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-[#0098EA] mb-4 mt-6">
                  <step.icon size={24} />
                </div>
                <h3 className="font-bangers text-2xl text-white mb-3 tracking-wider">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <a
              href={BUY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-buy-howtobuy"
              className="inline-block bg-gradient-to-r from-[#0098EA] to-[#29b6f6] text-white px-12 py-5 rounded-md font-bangers uppercase tracking-widest text-2xl shadow-[0_0_30px_rgba(0,152,234,0.5)] hover:shadow-[0_0_50px_rgba(0,152,234,0.8)] hover:scale-105 transition-all"
            >
              Buy AKITA on DeDust →
            </a>
          </div>
        </div>
      </section>

      {/* ── Community ── */}
      <section id="community" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,152,234,0.12)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 w-full md:pr-12">
              <h2 className="font-bangers text-5xl md:text-7xl text-white mb-4 tracking-wider">
                JOIN THE PACK <span className="text-[#f0b429]">🐕</span>
              </h2>
              <p className="text-white/80 text-xl md:text-2xl mb-12">
                Akita doesn't fight alone. Neither should you.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: SiTelegram, name: "Telegram",
                    desc: "Join 100+ holders in the Akita army",
                    btn: "Join Telegram",
                    link: "https://t.me/AkitaOnTonNetwork",
                    color: "#229ED9",
                  },
                  {
                    icon: SiX, name: "Twitter / X",
                    desc: "Follow for alpha, updates, and meme warfare",
                    btn: "Follow on X",
                    link: "https://x.com/akitaonton1",
                    color: "#fff",
                  },
                  {
                    icon: Rocket, name: "DexScreener",
                    desc: "Track the chart live",
                    btn: "View Chart",
                    link: "https://dexscreener.com/ton/eqbtzd5px8a3osoeh_aecnf-jl6j9cn74brte7qnmkdvwe2u",
                    color: "#fff",
                  },
                  {
                    icon: Shield, name: "TonScan",
                    desc: "Verify on-chain",
                    btn: "View on TonScan",
                    link: `https://tonscan.org/address/${CA}`,
                    color: "#0098EA",
                  },
                ].map((social, i) => (
                  <motion.a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={social.name}
                    data-testid={`button-${social.name.toLowerCase().replace(/\s/g, "-")}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card glass-card-hover p-6 rounded-xl flex flex-col items-start gap-4 group"
                  >
                    <social.icon size={32} style={{ color: social.color }} />
                    <div>
                      <h3 className="font-bangers text-xl text-white mb-1 tracking-wider">{social.name}</h3>
                      <p className="text-white/50 text-xs">{social.desc}</p>
                    </div>
                    <span className="mt-auto text-xs font-bold uppercase tracking-wider text-[#0098EA] group-hover:text-[#29b6f6] flex items-center gap-1 transition-colors">
                      {social.btn} <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all inline-block">→</span>
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

      {/* ── Footer ── */}
      <footer className="bg-[#020408] pt-16 pb-8 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="font-bangers text-4xl tracking-widest text-white">AKITA</span>
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
                <a href={BUY_LINK} target="_blank" rel="noopener noreferrer" className="text-[#0098EA] hover:text-[#29b6f6] font-bold text-sm transition-colors w-fit">
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
