import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Terminal, Send, CheckCircle2, ShieldAlert, RefreshCw, User, Mail, MessageSquare } from 'lucide-react';

export default function ContactTerminal() {
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    consoleMessage: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [logMessage, setLogMessage] = useState('SYSTEM // Ready to dispatch network packet');

  const validateForm = () => {
    if (!formData.senderName.trim()) {
      setLogMessage('ERR // Name parameter is missing.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.senderEmail.trim() || !emailRegex.test(formData.senderEmail.trim())) {
      setLogMessage('ERR // Invalid email format.');
      return false;
    }
    if (!formData.consoleMessage.trim()) {
      setLogMessage('ERR // Message payload is empty.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setStatus('error');
      return;
    }

    try {
      setStatus('sending');
      setLogMessage('STATUS // Connecting to cloud server...');

      await addDoc(collection(db, 'messages'), {
        name: formData.senderName.trim(),
        email: formData.senderEmail.trim(),
        message: formData.consoleMessage.trim(),
        timestamp: serverTimestamp()
      });

      setStatus('success');
      setLogMessage('STATUS // Message written to database queue.');
      setFormData({ senderName: '', senderEmail: '', consoleMessage: '' });

      setTimeout(() => {
        setStatus('idle');
        setLogMessage('SYSTEM // Ready to dispatch network packet');
      }, 5000);

    } catch (err) {
      console.error(err);
      setStatus('error');
      setLogMessage('ERR // Database connection timeout or write error.');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form 
        onSubmit={handleSubmit}
        className={`rounded-lg overflow-hidden glass-hud border transition-all duration-500 flex flex-col h-[450px] shadow-2xl ${
          status === 'error' ? 'border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.25)]' :
          status === 'success' ? 'border-matrix shadow-[0_0_20px_rgba(0,255,102,0.25)]' :
          status === 'sending' ? 'border-cyber shadow-[0_0_20px_rgba(0,255,255,0.25)]' :
          'border-zinc-850 hover:border-zinc-800'
        }`}
      >
        {/* Terminal Header */}
        <div className="bg-zinc-950/90 px-4 py-3 border-b border-zinc-900 flex items-center justify-between font-mono text-[10px] select-none">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-rose-500/50" />
            <span className="w-2 h-2 rounded-full bg-amber-500/50" />
            <span className="w-2 h-2 rounded-full bg-matrix/50" />
            <span className="ml-2 text-zinc-400 font-semibold tracking-wider flex items-center space-x-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyber/80" />
              <span>secure_mail_dispatcher.sys</span>
            </span>
          </div>
          <span className="text-zinc-650 font-mono text-[8px]">AES-256 // ENCRYPTED</span>
        </div>

        {/* Input Panel */}
        <div className="flex-1 p-6 bg-zinc-950/20 flex flex-col justify-between space-y-4">
          
          {/* Status bar message */}
          <div className="font-mono text-xs text-zinc-500 border-b border-zinc-900 pb-3 flex items-center justify-between select-none">
            <span className="truncate">{logMessage}</span>
            <span className="text-[10px] text-zinc-600 hidden sm:inline-block">port: 443</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block select-none">Name Parameter</label>
              <div className="relative group/input">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within/input:text-matrix transition-colors">
                  <User className="w-4 h-4" />
                </span>
                <input 
                  type="text"
                  value={formData.senderName}
                  onChange={(e) => {
                    setFormData(p => ({ ...p, senderName: e.target.value }));
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter name"
                  className="w-full bg-zinc-950/40 border border-zinc-850 rounded px-3 py-2.5 pl-9 outline-none text-white placeholder-zinc-700 text-sm font-sans focus:border-matrix/40 focus:bg-zinc-950/80 transition-all focus:shadow-[0_0_12px_rgba(0,255,102,0.05)]"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block select-none">Email Parameter</label>
              <div className="relative group/input">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within/input:text-cyber transition-colors">
                  <Mail className="w-4 h-4" />
                </span>
                <input 
                  type="email"
                  value={formData.senderEmail}
                  onChange={(e) => {
                    setFormData(p => ({ ...p, senderEmail: e.target.value }));
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="name@example.com"
                  className="w-full bg-zinc-950/40 border border-zinc-850 rounded px-3 py-2.5 pl-9 outline-none text-white placeholder-zinc-700 text-sm font-sans focus:border-cyber/40 focus:bg-zinc-950/80 transition-all focus:shadow-[0_0_12px_rgba(0,255,255,0.05)]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Message Textarea */}
          <div className="space-y-1.5 flex-1 flex flex-col">
            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block select-none">Message Payload</label>
            <div className="relative group/input flex-1 flex flex-col">
              <span className="absolute left-3 top-3 text-zinc-600 group-focus-within/input:text-electric transition-colors">
                <MessageSquare className="w-4 h-4" />
              </span>
              <textarea 
                value={formData.consoleMessage}
                onChange={(e) => {
                  setFormData(p => ({ ...p, consoleMessage: e.target.value }));
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Type your message details..."
                className="w-full bg-zinc-950/40 border border-zinc-850 rounded px-3 py-2 pl-9 outline-none text-white placeholder-zinc-700 text-sm font-sans resize-none flex-1 focus:border-electric/40 focus:bg-zinc-950/80 transition-all focus:shadow-[0_0_12px_rgba(139,92,246,0.05)]"
                required
              />
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-zinc-950/80 px-4 py-3 border-t border-zinc-900 flex justify-between items-center font-mono text-xs select-none">
          <div className="text-[10px] text-zinc-600">
            {status === 'sending' && <span className="text-cyber animate-pulse">TRANSMITTING...</span>}
            {status === 'success' && <span className="text-matrix flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1" />PACKET_SENT</span>}
            {status === 'error' && <span className="text-rose-500 flex items-center"><ShieldAlert className="w-3.5 h-3.5 mr-1" />TRANSMIT_ERR</span>}
            {status === 'idle' && <span>SYSTEM_READY</span>}
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className={`px-5 py-2 rounded font-semibold tracking-wider flex items-center space-x-2 transition-all duration-300 ${
              status === 'success'
                ? 'bg-matrix text-obsidian border border-matrix shadow-[0_0_12px_#00ff66]'
                : status === 'sending'
                  ? 'bg-cyber/20 text-cyber border border-cyber cursor-wait'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-matrix hover:text-matrix hover:shadow-[0_0_10px_rgba(0,255,102,0.15)] active:scale-95'
            }`}
          >
            {status === 'sending' ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>{status === 'success' ? 'DISPATCHED' : 'DISPATCH_MESSAGE'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
