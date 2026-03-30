/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans">
      {/* CRT Effects */}
      <div className="crt-overlay" />
      <div className="scanline" />

      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-pink/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-12 text-center z-10 w-full max-w-2xl"
      >
        <div className="h-20 w-full bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue relative overflow-hidden mb-6 border-b border-white/10">
          {/* Scanline Texture */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,4px_100%]" />
          <div className="absolute inset-0 bg-white/5 animate-pulse" />
        </div>
        <p className="text-white/30 font-mono text-[11px] tracking-[0.8em] uppercase font-bold">
          SYNTHETIC PULSE & CLASSIC ARCADE
        </p>
      </motion.header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start z-10">
        {/* Left Sidebar - Info/Stats */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 hidden lg:flex flex-col gap-8"
        >
          <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] backdrop-blur-md">
            <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-6">INSTRUCTIONS</h3>
            <ul className="space-y-4 text-xs text-white/50 font-bold">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-blue shadow-[0_0_5px_#00ffff]" />
                Use Arrow Keys to move
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-pink shadow-[0_0_5px_#ff00ff]" />
                Collect pink orbs
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-green shadow-[0_0_5px_#39ff14]" />
                Don't hit yourself
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-purple shadow-[0_0_5px_#bc13fe]" />
                Space to Pause/Start
              </li>
            </ul>
          </div>

          <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] backdrop-blur-md">
            <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-6">SYSTEM STATUS</h3>
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-white/30 uppercase">Latency</span>
                <span className="text-[10px] font-bold text-neon-green">12ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-white/30 uppercase">Audio Engine</span>
                <span className="text-[10px] font-bold text-neon-blue">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-white/30 uppercase">Visualizer</span>
                <span className="text-[10px] font-bold text-neon-pink">60 FPS</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Center - Snake Game */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-6 flex justify-center"
        >
          <SnakeGame />
        </motion.div>

        {/* Right Sidebar - Music Player */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 flex flex-col gap-8 w-full"
        >
          <MusicPlayer />
          
          <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-4 right-4">
              <div className="w-2 h-2 rounded-full bg-neon-pink animate-ping" />
            </div>
            <h3 className="text-[10px] font-bold text-neon-pink uppercase tracking-[0.2em] mb-4">LIVE FEED</h3>
            <p className="text-[10px] text-white/40 leading-relaxed italic font-medium">
              "The neon grid pulses with every beat. The snake grows, mirroring the synthetic rhythm of the void."
            </p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-white/10 text-[8px] uppercase tracking-[0.8em] font-mono">
        TERMINAL_ACCESS_GRANTED // SESSION_ID_0923X
      </footer>
    </div>
  );
}
