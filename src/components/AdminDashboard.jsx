import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { Terminal, Shield, LogOut, Save, Plus, Trash2, Edit2, Mail, Briefcase, FileCode, Cpu, Loader2, Upload, Image, X, Search, Filter, Sparkles, Layers, ExternalLink, FolderPlus, Check, LayoutGrid, List, Eye, Link } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ThemeToggle from './ThemeToggle';

export default function AdminDashboard() {
  // Auth states
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  // Active Tab: 'profile' | 'projects' | 'messages'
  const [activeTab, setActiveTab] = useState('profile');

  // Loading & success flags
  const [actionLoading, setActionLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  // Profile data state
  const [profileData, setProfileData] = useState({
    name: 'Elite Full-Stack Engineer',
    role: 'Visual Architect & Core Engineer',
    about: 'I focus on bridging clean frontend architecture with robust cloud databases. Leveraging the MERN stack alongside Firebase, I design modular web systems and deploy intelligent vector-search RAG pipelines to automate workflows, prioritizing performance, secure authentication, and seamless user experiences.',
    heroAbout: 'A results-driven Full-Stack & AI Engineer specializing in the MERN stack, Firebase cloud architectures, and intelligent RAG-based pipelines. I build secure, high-performance web applications that connect clean code with interactive user experiences.',
    focusTags: 'React/Vite, Firebase Cloud, High-Fidelity Tailwind Designs'
  });

  // Projects states
  const [projectsList, setProjectsList] = useState([]);
  const [projectForm, setProjectForm] = useState({
    id: '', // Empty means creating new project
    title: '',
    description: '',
    longDescription: '',
    features: '',
    techStack: '', // input as string, split to array
    liveLink: '',
    githubLink: '',
    image: '',
    category: 'Full-Stack',
    fileName: 'App.jsx',
    gallery: [] // Array of { url: '', caption: '' }
  });

  // Projects CMS UI states & search filters
  const [formSubTab, setFormSubTab] = useState('general'); // 'general' | 'specs' | 'media'
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [registryViewMode, setRegistryViewMode] = useState('grid'); // 'grid' | 'list'

  // Reset form handler
  const handleResetProjectForm = () => {
    setProjectForm({
      id: '',
      title: '',
      description: '',
      longDescription: '',
      features: '',
      techStack: '',
      liveLink: '',
      githubLink: '',
      image: '',
      category: 'Full-Stack',
      fileName: 'App.jsx',
      gallery: []
    });
    setFormSubTab('general');
  };

  // Metrics & Search Filtering
  const fullStackCount = projectsList.filter(p => p.category === 'Full-Stack').length;
  const frontendCount = projectsList.filter(p => p.category === 'Frontend').length;

  const filteredProjectsList = projectsList.filter(proj => {
    if (!projectSearchQuery.trim()) return true;
    const q = projectSearchQuery.toLowerCase();
    const titleMatch = proj.title?.toLowerCase().includes(q);
    const catMatch = proj.category?.toLowerCase().includes(q);
    const techMatch = Array.isArray(proj.techStack) && proj.techStack.some(t => t.toLowerCase().includes(q));
    const fileMatch = proj.fileName?.toLowerCase().includes(q);
    return titleMatch || catMatch || techMatch || fileMatch;
  });

  // Messages inbox state
  const [messagesList, setMessagesList] = useState([]);
  const [replyingToId, setReplyingToId] = useState(null);
  const [replyText, setReplyText] = useState({});
  const [replyStatus, setReplyStatus] = useState({});

  // Image Upload state
  const [uploadingImage, setUploadingImage] = useState(false);

  // Handle direct main cover upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'suzllkcp';
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'portfolio';

    if (!cloudName || !uploadPreset) {
      alert("Cloudinary configuration is missing!");
      return;
    }

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        setProjectForm(prev => ({ ...prev, image: data.secure_url }));
      } else {
        alert("Cloudinary Upload Failed: " + (data.error?.message || "Invalid upload parameters"));
      }
    } catch (err) {
      console.error("Cloudinary upload error: ", err);
      alert("Failed to upload image to Cloudinary.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle uploading individual gallery screenshot to Cloudinary
  const handleGalleryImageUpload = async (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'suzllkcp';
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'portfolio';

    if (!cloudName || !uploadPreset) {
      alert("Cloudinary configuration is missing!");
      return;
    }

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        setProjectForm(prev => {
          const updated = [...(prev.gallery || [])];
          if (!updated[index]) {
            updated[index] = { url: data.secure_url, caption: '' };
          } else {
            updated[index] = { ...updated[index], url: data.secure_url };
          }
          return { ...prev, gallery: updated };
        });
      } else {
        alert("Cloudinary Upload Failed: " + (data.error?.message || "Invalid upload parameters"));
      }
    } catch (err) {
      console.error("Cloudinary screenshot upload error: ", err);
      alert("Failed to upload screenshot to Cloudinary.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddGallerySlide = () => {
    setProjectForm(prev => ({
      ...prev,
      gallery: [...(prev.gallery || []), { url: '', caption: '' }]
    }));
  };

  const handleRemoveGallerySlide = (index) => {
    setProjectForm(prev => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, i) => i !== index)
    }));
  };

  const handleUpdateGalleryItem = (index, field, value) => {
    setProjectForm(prev => {
      const updated = [...(prev.gallery || [])];
      if (updated[index]) {
        updated[index] = { ...updated[index], [field]: value };
      }
      return { ...prev, gallery: updated };
    });
  };

  // Monitor Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Firestore Content once authenticated
  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchProjects();
      fetchMessages();
    }
  }, [user]);

  // Load Profile from Firestore
  const fetchProfile = async () => {
    try {
      const docRef = doc(db, 'profile', 'developer');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfileData({
          name: data.name || '',
          role: data.role || '',
          about: data.about || '',
          heroAbout: data.heroAbout || '',
          focusTags: data.focusTags || ''
        });
      }
    } catch (err) {
      console.error("Error reading profile data: ", err);
    }
  };

  // Load Projects from Firestore
  const fetchProjects = async () => {
    try {
      const colRef = collection(db, 'projects');
      const snapshot = await getDocs(colRef);
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjectsList(list);
    } catch (err) {
      console.error("Error reading projects: ", err);
    }
  };

  // Load Messages from Firestore
  const fetchMessages = async () => {
    try {
      const colRef = collection(db, 'messages');
      const snapshot = await getDocs(colRef);
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
      setMessagesList(list);
    } catch (err) {
      console.error("Error reading messages: ", err);
    }
  };

  // Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      setAuthLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setAuthError('INVALID_CREDENTIALS // ACCESS_DENIED');
      console.error(err);
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    await signOut(auth);
  };

  // Save Profile Handler
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setActionSuccess('');
    try {
      const docRef = doc(db, 'profile', 'developer');
      await setDoc(docRef, profileData);
      setActionSuccess('PROFILE_COMMITTED_SUCCESSFULLY');
      setTimeout(() => setActionSuccess(''), 4000);
    } catch (err) {
      console.error("Save profile error: ", err);
      alert("Error saving profile details!");
    } finally {
      setActionLoading(false);
    }
  };

  // Add or Edit Project Handler
  const handleSaveProject = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setActionSuccess('');
    try {
      const formattedFeatures = typeof projectForm.features === 'string'
        ? projectForm.features.split('\n').map(s => s.trim()).filter(s => s !== '')
        : (projectForm.features || []);

      const validGallery = (projectForm.gallery || []).filter(item => item.url && item.url.trim() !== '');

      const payload = {
        title: projectForm.title.trim(),
        description: projectForm.description.trim(),
        longDescription: projectForm.longDescription ? projectForm.longDescription.trim() : projectForm.description.trim(),
        features: formattedFeatures,
        techStack: projectForm.techStack.split(',').map(s => s.trim()).filter(s => s !== ''),
        liveLink: projectForm.liveLink.trim(),
        githubLink: projectForm.githubLink.trim(),
        image: projectForm.image.trim() || (validGallery[0]?.url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop'),
        category: projectForm.category,
        fileName: projectForm.fileName.trim() || 'App.jsx',
        gallery: validGallery
      };

      if (projectForm.id) {
        // Edit Existing project
        const docRef = doc(db, 'projects', projectForm.id);
        await updateDoc(docRef, payload);
        setActionSuccess('PROJECT_UPDATED_SUCCESSFULLY');
      } else {
        // Create new project
        const colRef = collection(db, 'projects');
        await addDoc(colRef, payload);
        setActionSuccess('PROJECT_CREATED_SUCCESSFULLY');
      }

      setProjectForm({
        id: '',
        title: '',
        description: '',
        longDescription: '',
        features: '',
        techStack: '',
        liveLink: '',
        githubLink: '',
        image: '',
        category: 'Full-Stack',
        fileName: 'App.jsx',
        gallery: []
      });

      fetchProjects();
      setTimeout(() => setActionSuccess(''), 4000);

    } catch (err) {
      console.error("Save project error: ", err);
      alert("Error saving project details!");
    } finally {
      setActionLoading(false);
    }
  };

  // Populate form to edit project
  const handleEditProjectClick = (proj) => {
    setProjectForm({
      id: proj.id,
      title: proj.title || '',
      description: proj.description || '',
      longDescription: proj.longDescription || proj.description || '',
      features: Array.isArray(proj.features) ? proj.features.join('\n') : (proj.features || ''),
      techStack: Array.isArray(proj.techStack) ? proj.techStack.join(', ') : '',
      liveLink: proj.liveLink || '',
      githubLink: proj.githubLink || '',
      image: proj.image || '',
      category: proj.category || 'Full-Stack',
      fileName: proj.fileName || 'App.jsx',
      gallery: proj.gallery && Array.isArray(proj.gallery) ? proj.gallery : (proj.image ? [{ url: proj.image, caption: proj.description || '' }] : [])
    });
    setFormSubTab('general');
  };

  // Delete Project Handler
  const handleDeleteProject = async (id) => {
    if (!window.confirm("EXECUTE: delete_project? Details cannot be recovered.")) return;
    try {
      setActionLoading(true);
      await deleteDoc(doc(db, 'projects', id));
      fetchProjects();
    } catch (err) {
      console.error("Delete project error: ", err);
    } finally {
      setActionLoading(false);
    }
  };

  // Delete message handler
  const handleDeleteMessage = async (id) => {
    if (!window.confirm("EXECUTE: delete_message?")) return;
    try {
      setActionLoading(true);
      await deleteDoc(doc(db, 'messages', id));
      fetchMessages();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Dispatch email response via EmailJS
  const handleSendReply = async (msg) => {
    const text = replyText[msg.id]?.trim();
    if (!text) {
      alert("Please type a response payload.");
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_uqsyfa5';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_a7asz69';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'W1IquHHwgOi2bFZ9V';
    const avatarUrl = import.meta.env.VITE_EMAILJS_AVATAR_URL || 'https://plain-eeur-prod-public.komododecks.com/202606/10/WTCPLIgKHwJXvmDjczaz/image.jpg';

    if (!serviceId || serviceId === 'your_emailjs_service_id' || !publicKey) {
      alert("EmailJS is not fully configured. Please edit your VITE_EMAILJS_... environment variables.");
      return;
    }

    setReplyStatus(prev => ({ ...prev, [msg.id]: 'sending' }));

    try {
      const templateParams = {
        to_name: msg.name || 'Valued User',
        to_email: msg.email,
        reply_message: text,
        original_message: msg.message || '',
        avatar_url: avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop',
        developer_name: profileData.name || 'Muhammad Waqas',
        developer_role: profileData.role || 'AI-Driven Full-Stack Engineer',
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      // Save reply to Firestore under the message document
      const messageDocRef = doc(db, 'messages', msg.id);
      const newReply = {
        text,
        timestamp: new Date().toISOString()
      };
      const updatedReplies = msg.replies ? [...msg.replies, newReply] : [newReply];
      await updateDoc(messageDocRef, {
        replies: updatedReplies
      });

      // Update local state reactively
      setMessagesList(prevList => 
        prevList.map(item => 
          item.id === msg.id 
            ? { ...item, replies: updatedReplies } 
            : item
        )
      );

      setReplyStatus(prev => ({ ...prev, [msg.id]: 'success' }));
      setReplyText(prev => ({ ...prev, [msg.id]: '' }));
      
      // Auto-close reply editor after success
      setTimeout(() => {
        setReplyStatus(prev => ({ ...prev, [msg.id]: null }));
        setReplyingToId(null);
      }, 4000);
    } catch (err) {
      console.error("EmailJS dispatch error: ", err);
      setReplyStatus(prev => ({ ...prev, [msg.id]: 'error' }));
    }
  };

  // Render Loader
  if (authLoading) {
    return (
      <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center space-y-4 font-mono text-xs">
        <Loader2 className="w-8 h-8 text-cyber animate-spin" />
        <span className="text-zinc-500">AUTHORIZING CONNECTION GATEWAY...</span>
      </div>
    );
  }

  // Render Login Panel if unauthenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
        <div className="w-full max-w-md glass-hud rounded-lg border border-zinc-800 shadow-2xl overflow-hidden">
          <div className="bg-zinc-950/90 px-4 py-3 border-b border-zinc-900 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-rose-500" />
              <span className="text-zinc-400 font-bold">SECURE_GATEWAY // AUTH</span>
            </div>
            <ThemeToggle />
          </div>

          <form onSubmit={handleLogin} className="p-6 space-y-4 font-mono text-xs">
            {authError && (
              <div className="p-3 rounded bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px]">
                {authError}
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-zinc-500">ADMIN_USER_ID</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@obsidian.io"
                className="w-full p-2.5 rounded bg-zinc-900/60 border border-zinc-850 outline-none text-white focus:border-cyber"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-zinc-500">PASS_KEY</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full p-2.5 rounded bg-zinc-900/60 border border-zinc-850 outline-none text-white focus:border-cyber"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded bg-rose-600/15 border border-rose-500/40 text-rose-400 font-bold uppercase tracking-wider hover:bg-rose-600 hover:text-white transition-all duration-300"
            >
              INITIALIZE LOGIN
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Admin CMS Panel if authenticated
  return (
    <div className="min-h-screen bg-obsidian text-zinc-300 font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Admin Header Bar */}
        <div className="glass-hud rounded-lg border border-zinc-800 p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-rose-600/15 border border-rose-500/40 rounded text-rose-500">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white font-mono uppercase tracking-wider">OBSIDIAN // CENTRAL_CMS</h1>
              <p className="text-[10px] text-zinc-500 font-mono">user_auth: {user.email} (ACTIVE)</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <div className="h-6 w-[1px] bg-zinc-850" />
            {/* View Portfolio link */}
            <a 
              href="#/" 
              className="px-3.5 py-1.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-cyber hover:text-cyber transition-all font-mono text-xs"
            >
              Launch Site
            </a>
            
            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded bg-rose-600/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition-all flex items-center space-x-2 font-mono text-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>

        {/* CMS Tabs Control and Action notifications */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900 pb-3 font-mono text-xs">
          <div className="flex space-x-2">
            {[
              { id: 'profile', label: '[1] Profile Config', icon: <Cpu className="w-3.5 h-3.5" /> },
              { id: 'projects', label: '[2] Projects CRUD', icon: <FileCode className="w-3.5 h-3.5" /> },
              { id: 'messages', label: `[3] Messages (${messagesList.length})`, icon: <Mail className="w-3.5 h-3.5" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded flex items-center space-x-1.5 transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-matrix/10 text-matrix border-b border-matrix' 
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {actionSuccess && (
            <div className="text-[10px] text-matrix bg-matrix/5 border border-matrix/20 px-3 py-1 rounded">
              {actionSuccess}
            </div>
          )}
        </div>

        {/* Tab 1: Profile Editor */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="glass-hud rounded-lg border border-zinc-850 p-6 space-y-4">
            <h2 className="text-base font-bold text-white font-mono flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-matrix" />
              <span>Update Bio & Stats Telemetry</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-zinc-500">DISPLAY_NAME</label>
                <input 
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData(p => ({ ...p, name: e.target.value }))}
                  className="w-full p-2.5 rounded bg-zinc-900/60 border border-zinc-800 outline-none text-white focus:border-matrix"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-500">PROFESSIONAL_ROLE</label>
                <input 
                  type="text"
                  value={profileData.role}
                  onChange={(e) => setProfileData(p => ({ ...p, role: e.target.value }))}
                  className="w-full p-2.5 rounded bg-zinc-900/60 border border-zinc-800 outline-none text-white focus:border-matrix"
                  required
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-zinc-500">HERO_PARAGRAPH (Home introduction summary)</label>
                <textarea 
                  value={profileData.heroAbout}
                  onChange={(e) => setProfileData(p => ({ ...p, heroAbout: e.target.value }))}
                  rows={2}
                  className="w-full p-2.5 rounded bg-zinc-900/60 border border-zinc-800 outline-none text-white focus:border-matrix resize-none"
                  required
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-zinc-500">ABOUT_PARAGRAPH (Detailed profile description)</label>
                <textarea 
                  value={profileData.about}
                  onChange={(e) => setProfileData(p => ({ ...p, about: e.target.value }))}
                  rows={4}
                  className="w-full p-2.5 rounded bg-zinc-900/60 border border-zinc-800 outline-none text-white focus:border-matrix resize-none"
                  required
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-zinc-500">CORE_FOCUS_TAGS (Comma separated)</label>
                <input 
                  type="text"
                  value={profileData.focusTags}
                  onChange={(e) => setProfileData(p => ({ ...p, focusTags: e.target.value }))}
                  className="w-full p-2.5 rounded bg-zinc-900/60 border border-zinc-800 outline-none text-white focus:border-matrix"
                  required
                />
              </div>

            </div>

            <button
              type="submit"
              disabled={actionLoading}
              className="mt-4 px-5 py-2.5 rounded bg-matrix text-obsidian font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 hover:scale-105 active:scale-95 transition-transform"
            >
              {actionLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>SAVE CONFIG</span>
            </button>
          </form>
        )}

        {/* Tab 2: Projects CRUD - ULTRA PRO MAX REDESIGN */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            
            {/* Top Action & Statistics Header Bar */}
            <div className="glass-hud rounded-lg border border-zinc-850 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              
              {/* Projects Metrics */}
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                <div className="flex items-center space-x-2 bg-zinc-950/80 px-3 py-1.5 rounded border border-zinc-850">
                  <Briefcase className="w-4 h-4 text-electric" />
                  <span className="text-zinc-400">Total Nodes:</span>
                  <span className="text-white font-bold">{projectsList.length}</span>
                </div>
                <div className="flex items-center space-x-2 bg-zinc-950/80 px-3 py-1.5 rounded border border-zinc-850">
                  <span className="w-2 h-2 rounded-full bg-cyber" />
                  <span className="text-zinc-400">Full-Stack:</span>
                  <span className="text-cyber font-bold">{fullStackCount}</span>
                </div>
                <div className="flex items-center space-x-2 bg-zinc-950/80 px-3 py-1.5 rounded border border-zinc-850">
                  <span className="w-2 h-2 rounded-full bg-matrix" />
                  <span className="text-zinc-400">Frontend:</span>
                  <span className="text-matrix font-bold">{frontendCount}</span>
                </div>
              </div>

              {/* Search Bar & Add Project CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={projectSearchQuery}
                    onChange={(e) => setProjectSearchQuery(e.target.value)}
                    placeholder="Search projects..."
                    className="w-full bg-zinc-950/80 border border-zinc-850 rounded pl-9 pr-3 py-1.5 text-xs font-mono text-white placeholder-zinc-600 outline-none focus:border-cyber/50 transition-all"
                  />
                  {projectSearchQuery && (
                    <button
                      onClick={() => setProjectSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <a
                  href="/PROJECT_SUBMISSION_GUIDE.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 font-mono text-xs flex items-center justify-center space-x-1.5 transition-all shrink-0"
                  title="View Developer Submission Guide (.md)"
                >
                  <FileCode className="w-3.5 h-3.5 text-matrix" />
                  <span>Dev Guide (.md)</span>
                </a>

                <button
                  onClick={handleResetProjectForm}
                  className="px-3.5 py-1.5 rounded bg-cyber/10 border border-cyber text-cyber font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 hover:bg-cyber hover:text-obsidian transition-all duration-300 shadow-[0_0_12px_rgba(0,255,255,0.15)] active:scale-95 shrink-0"
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>+ New Project</span>
                </button>
              </div>

            </div>

            {/* Main Projects Grid: Left = Modular Form, Right = Interactive Registry */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT COLUMN: Modular Sub-Tabbed Project Editor Form (7 Cols) */}
              <form onSubmit={handleSaveProject} className="lg:col-span-7 glass-hud rounded-lg border border-zinc-850 p-5 sm:p-6 space-y-5 font-mono text-xs shadow-2xl">
                
                {/* Form Mode Header & Sub-Tabs Navigator */}
                <div className="space-y-4 border-b border-zinc-900 pb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-cyber" />
                      <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                        {projectForm.id ? `EDITING NODE: ${projectForm.title || 'PROJECT'}` : 'REGISTER NEW PROJECT NODE'}
                      </h2>
                    </div>
                    {projectForm.id && (
                      <button
                        type="button"
                        onClick={handleResetProjectForm}
                        className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-rose-400 hover:text-white hover:border-rose-500 text-[10px] font-mono transition-all"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>

                  {/* Form Sub-Tabs Control */}
                  <div className="flex items-center space-x-1.5 bg-zinc-950/80 p-1.5 rounded-lg border border-zinc-900">
                    {[
                      { id: 'general', label: '[1] General Info', icon: <FileCode className="w-3.5 h-3.5" /> },
                      { id: 'specs', label: '[2] Tech Specs', icon: <Cpu className="w-3.5 h-3.5" /> },
                      { id: 'media', label: `[3] Gallery (${projectForm.gallery?.length || 0})`, icon: <Image className="w-3.5 h-3.5" /> }
                    ].map(subTab => (
                      <button
                        key={subTab.id}
                        type="button"
                        onClick={() => setFormSubTab(subTab.id)}
                        className={`flex-1 py-1.5 px-3 rounded flex items-center justify-center space-x-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                          formSubTab === subTab.id 
                            ? 'bg-cyber/10 text-cyber border-b-2 border-cyber font-bold' 
                            : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
                        }`}
                      >
                        {subTab.icon}
                        <span className="truncate">{subTab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* SUB-TAB 1: GENERAL INFO */}
                {formSubTab === 'general' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-zinc-500">PROJECT_TITLE *</label>
                        <input 
                          type="text"
                          value={projectForm.title}
                          onChange={(e) => setProjectForm(p => ({ ...p, title: e.target.value }))}
                          placeholder="Quantum Cyber Dashboard"
                          className="w-full p-2.5 rounded bg-zinc-900/60 border border-zinc-800 outline-none text-white focus:border-cyber"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-zinc-500">FILE_NAME (Code Tab) *</label>
                        <input 
                          type="text"
                          value={projectForm.fileName}
                          onChange={(e) => setProjectForm(p => ({ ...p, fileName: e.target.value }))}
                          placeholder="Dashboard.tsx"
                          className="w-full p-2.5 rounded bg-zinc-900/60 border border-zinc-800 outline-none text-white focus:border-cyber"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-500">CATEGORY *</label>
                      <select 
                        value={projectForm.category}
                        onChange={(e) => setProjectForm(p => ({ ...p, category: e.target.value }))}
                        className="w-full p-2.5 rounded bg-zinc-900/60 border border-zinc-800 outline-none text-white focus:border-cyber"
                      >
                        <option value="Full-Stack">Full-Stack</option>
                        <option value="Frontend">Frontend</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-500">SHORT_SUMMARY (Card snippet) *</label>
                      <textarea 
                        value={projectForm.description}
                        onChange={(e) => setProjectForm(p => ({ ...p, description: e.target.value }))}
                        rows={2}
                        placeholder="High-performance developer tracking matrix linking Firestore telemetry streams..."
                        className="w-full p-2.5 rounded bg-zinc-900/60 border border-zinc-800 outline-none text-white focus:border-cyber resize-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-zinc-500">LIVE_DEMO_LINK *</label>
                        <input 
                          type="text"
                          value={projectForm.liveLink}
                          onChange={(e) => setProjectForm(p => ({ ...p, liveLink: e.target.value }))}
                          placeholder="https://..."
                          className="w-full p-2.5 rounded bg-zinc-900/60 border border-zinc-800 outline-none text-white focus:border-cyber"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-zinc-500">GITHUB_REPOSITORY_LINK (Optional)</label>
                        <input 
                          type="text"
                          value={projectForm.githubLink}
                          onChange={(e) => setProjectForm(p => ({ ...p, githubLink: e.target.value }))}
                          placeholder="https://github.com/..."
                          className="w-full p-2.5 rounded bg-zinc-900/60 border border-zinc-800 outline-none text-white focus:border-cyber"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* SUB-TAB 2: TECH SPECS & NARRATIVE */}
                {formSubTab === 'specs' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="space-y-1">
                      <label className="text-zinc-500">TECH_STACK (Comma separated) *</label>
                      <input 
                        type="text"
                        value={projectForm.techStack}
                        onChange={(e) => setProjectForm(p => ({ ...p, techStack: e.target.value }))}
                        placeholder="React, Firebase, Tailwind, Node.js"
                        className="w-full p-2.5 rounded bg-zinc-900/60 border border-zinc-800 outline-none text-white focus:border-cyber"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-500">LONG_DESCRIPTION (Detailed Narrative for Specs Page)</label>
                      <textarea 
                        value={projectForm.longDescription}
                        onChange={(e) => setProjectForm(p => ({ ...p, longDescription: e.target.value }))}
                        rows={4}
                        placeholder="Enter comprehensive architecture overview, system design, and database schema..."
                        className="w-full p-2.5 rounded bg-zinc-900/60 border border-zinc-800 outline-none text-white focus:border-cyber resize-none font-sans text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-500">CORE_CAPABILITIES (Key features list - One per line)</label>
                      <textarea 
                        value={projectForm.features}
                        onChange={(e) => setProjectForm(p => ({ ...p, features: e.target.value }))}
                        rows={4}
                        placeholder="Real-time WebSockets telemetry stream&#10;OAuth 2.0 multi-tenant authentication&#10;Automated Cloudinary media pipeline"
                        className="w-full p-2.5 rounded bg-zinc-900/60 border border-zinc-800 outline-none text-white focus:border-cyber resize-none font-mono text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* SUB-TAB 3: MEDIA & SCREENSHOTS GALLERY - ULTRA PRO MAX RECREATION */}
                {formSubTab === 'media' && (
                  <div className="space-y-6 animate-fadeIn">
                    
                    {/* Cover Image Banner Card */}
                    <div className="glass-hud rounded-lg border border-zinc-850 p-4 space-y-3 bg-zinc-950/40">
                      <div className="flex items-center justify-between font-mono text-xs border-b border-zinc-900 pb-2">
                        <span className="text-white font-bold uppercase flex items-center space-x-2">
                          <Image className="w-4 h-4 text-cyber" />
                          <span>MAIN_COVER_IMAGE // CLOUDINARY_ASSET</span>
                        </span>
                        {projectForm.image ? (
                          <span className="px-2 py-0.5 rounded bg-matrix/10 border border-matrix/30 text-matrix text-[10px] font-semibold">
                            ✓ COVER_ACTIVE
                          </span>
                        ) : (
                          <span className="text-zinc-600 text-[10px]">NO_COVER_SET</span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                        {/* Dropzone & Manual URL Input */}
                        <div className="sm:col-span-7 space-y-2 font-mono text-xs">
                          <label className={`relative border border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                            uploadingImage 
                              ? 'border-cyber bg-cyber/10 animate-pulse' 
                              : 'border-zinc-800 bg-zinc-950/80 hover:border-cyber/60 hover:bg-zinc-900/60'
                          }`}>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={handleImageUpload} 
                              className="hidden" 
                              disabled={uploadingImage}
                            />
                            <div className="flex items-center space-x-2">
                              {uploadingImage ? (
                                <>
                                  <Loader2 className="w-4 h-4 text-cyber animate-spin" />
                                  <span className="text-cyber font-bold">UPLOADING_TO_CLOUDINARY...</span>
                                </>
                              ) : (
                                <>
                                  <Upload className="w-4 h-4 text-cyber" />
                                  <span className="text-zinc-300 font-semibold">Upload Cover Photo</span>
                                </>
                              )}
                            </div>
                            <span className="text-[9px] text-zinc-500 mt-1">PNG, JPG, WEBP • Direct to Cloudinary CDN</span>
                          </label>

                          <div className="relative">
                            <input 
                              type="text"
                              value={projectForm.image}
                              onChange={(e) => setProjectForm(p => ({ ...p, image: e.target.value }))}
                              placeholder="Or paste direct image URL (https://...)"
                              className="w-full p-2.5 rounded bg-zinc-950/60 border border-zinc-900 outline-none text-white text-xs font-mono focus:border-cyber/40"
                            />
                          </div>
                        </div>

                        {/* Live Cover Preview Aspect Box */}
                        <div className="sm:col-span-5 flex flex-col items-center justify-center">
                          {projectForm.image ? (
                            <div className="relative group w-full h-28 rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden shadow-xl">
                              <img 
                                src={projectForm.image} 
                                alt="Main Cover" 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2">
                                <span className="text-[9px] font-mono text-zinc-300">COVER PREVIEW</span>
                                <button
                                  type="button"
                                  onClick={() => setProjectForm(p => ({ ...p, image: '' }))}
                                  className="p-1 rounded-full bg-rose-600 text-white shadow hover:scale-110 transition-transform"
                                  title="Remove Cover"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-28 rounded-lg border border-zinc-900 bg-zinc-950/40 flex flex-col items-center justify-center text-zinc-600 text-xs font-mono space-y-1">
                              <Image className="w-8 h-8 opacity-30" />
                              <span className="text-[10px]">No Cover Selected</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Recreated Multi-Screenshot Slide Cards Manager */}
                    <div className="space-y-4 border-t border-zinc-900 pt-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div className="flex items-center space-x-2 font-mono text-xs">
                          <Layers className="w-4 h-4 text-matrix" />
                          <span className="text-white font-bold uppercase">
                            PAGE_SCREENSHOTS_GALLERY
                          </span>
                          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-matrix text-[10px] font-mono">
                            {projectForm.gallery?.length || 0} SLIDES
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={handleAddGallerySlide}
                          className="px-3 py-1.5 rounded bg-matrix/10 border border-matrix/40 text-matrix hover:bg-matrix hover:text-obsidian text-xs font-mono font-bold flex items-center space-x-1.5 transition-all shadow-[0_0_10px_rgba(0,255,102,0.15)]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Screenshot Slide</span>
                        </button>
                      </div>

                      {(!projectForm.gallery || projectForm.gallery.length === 0) ? (
                        <div className="p-8 rounded-lg border border-dashed border-zinc-850 bg-zinc-950/30 text-center font-mono text-xs text-zinc-500 space-y-2">
                          <Layers className="w-8 h-8 text-zinc-700 mx-auto" />
                          <p className="text-zinc-400 font-semibold">NO SCREENSHOT SLIDES REGISTERED YET</p>
                          <p className="text-[10px] text-zinc-600 max-w-xs mx-auto">
                            Click "+ Add Screenshot Slide" to add multi-page screenshot slides with individual captions for the auto-sliding carousel.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1.5 scrollbar-thin">
                          {projectForm.gallery.map((item, idx) => (
                            <div 
                              key={idx} 
                              className="glass-hud rounded-lg border border-zinc-850 bg-zinc-950/70 p-4 space-y-3 relative group hover:border-zinc-750 transition-all shadow-lg"
                            >
                              {/* Slide Header Tag & Remove */}
                              <div className="flex items-center justify-between border-b border-zinc-900/90 pb-2">
                                <div className="flex items-center space-x-2 font-mono text-xs">
                                  <span className="px-2 py-0.5 rounded bg-matrix/10 border border-matrix/30 text-matrix font-bold text-[10px]">
                                    SLIDE #{String(idx + 1).padStart(2, '0')}
                                  </span>
                                  {item.url ? (
                                    <span className="text-zinc-500 text-[10px] font-mono flex items-center space-x-1">
                                      <Check className="w-3 h-3 text-matrix" />
                                      <span>IMAGE LOADED</span>
                                    </span>
                                  ) : (
                                    <span className="text-amber-500/80 text-[10px] font-mono">IMAGE REQUIRED</span>
                                  )}
                                </div>

                                <button
                                  type="button"
                                  onClick={() => handleRemoveGallerySlide(idx)}
                                  className="p-1 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-600 hover:text-white transition-all text-xs flex items-center space-x-1"
                                  title="Delete Slide"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span className="hidden sm:inline font-mono text-[10px]">Remove</span>
                                </button>
                              </div>

                              {/* Slide Image Uploader & Caption Box */}
                              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
                                
                                {/* Slide Image Viewport & Upload */}
                                <div className="sm:col-span-5 space-y-2">
                                  {item.url ? (
                                    <div className="relative h-28 rounded border border-zinc-800 bg-zinc-950 overflow-hidden group/img">
                                      <img src={item.url} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                                      <button
                                        type="button"
                                        onClick={() => handleUpdateGalleryItem(idx, 'url', '')}
                                        className="absolute top-1 right-1 p-1 rounded bg-zinc-950/80 text-rose-400 hover:text-white"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ) : (
                                    <label className="border border-dashed border-zinc-800 hover:border-cyber/50 rounded-lg p-3 h-28 flex flex-col items-center justify-center cursor-pointer bg-zinc-950/50 text-xs font-mono text-zinc-400 transition-all">
                                      <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={(e) => handleGalleryImageUpload(e, idx)} 
                                        className="hidden" 
                                        disabled={uploadingImage}
                                      />
                                      <Upload className="w-4 h-4 text-cyber mb-1" />
                                      <span className="text-[11px] font-medium text-zinc-300">Upload Screenshot</span>
                                      <span className="text-[9px] text-zinc-600 mt-0.5">Cloudinary Direct</span>
                                    </label>
                                  )}

                                  <input 
                                    type="text"
                                    value={item.url || ''}
                                    onChange={(e) => handleUpdateGalleryItem(idx, 'url', e.target.value)}
                                    placeholder="Or paste screenshot URL..."
                                    className="w-full p-2 rounded bg-zinc-950/80 border border-zinc-850 text-[10px] font-mono text-white outline-none focus:border-cyber/40"
                                  />
                                </div>

                                {/* Slide Page Explanation Input */}
                                <div className="sm:col-span-7 space-y-1">
                                  <label className="text-[10px] text-zinc-500 font-mono flex items-center justify-between">
                                    <span>PAGE_EXPLANATION // FEATURE_CAPTION</span>
                                    <span className="text-zinc-600">{item.caption?.length || 0} chars</span>
                                  </label>
                                  <textarea
                                    value={item.caption || ''}
                                    onChange={(e) => handleUpdateGalleryItem(idx, 'caption', e.target.value)}
                                    placeholder="Describe what is shown on this page screenshot (e.g., Dashboard Overview showing telemetry graphs)..."
                                    rows={4}
                                    className="w-full p-2.5 rounded bg-zinc-900/60 border border-zinc-800 text-xs font-sans text-white outline-none focus:border-cyber resize-none leading-relaxed"
                                  />
                                </div>

                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {projectForm.gallery && projectForm.gallery.length > 0 && (
                        <button
                          type="button"
                          onClick={handleAddGallerySlide}
                          className="w-full py-2.5 rounded-lg border border-dashed border-zinc-800 text-zinc-400 hover:text-matrix hover:border-matrix/50 bg-zinc-950/30 text-xs font-mono flex items-center justify-center space-x-2 transition-all"
                        >
                          <Plus className="w-4 h-4" />
                          <span>+ ADD ANOTHER SCREENSHOT SLIDE</span>
                        </button>
                      )}

                    </div>

                  </div>
                )}

                {/* Form Action Controls Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
                  <div className="flex items-center space-x-2">
                    {formSubTab !== 'general' && (
                      <button
                        type="button"
                        onClick={() => setFormSubTab(formSubTab === 'media' ? 'specs' : 'general')}
                        className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-mono"
                      >
                        ← Back
                      </button>
                    )}
                    {formSubTab !== 'media' && (
                      <button
                        type="button"
                        onClick={() => setFormSubTab(formSubTab === 'general' ? 'specs' : 'media')}
                        className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-cyber hover:text-white text-xs font-mono"
                      >
                        Next →
                      </button>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="submit"
                      disabled={actionLoading}
                      className="px-5 py-2.5 rounded bg-cyber text-obsidian font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 hover:scale-105 active:scale-95 transition-transform shadow-[0_0_15px_rgba(0,255,255,0.2)]"
                    >
                      {actionLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      <span>{projectForm.id ? 'UPDATE NODE' : 'SAVE PROJECT NODE'}</span>
                    </button>
                  </div>
                </div>

              </form>

              {/* RIGHT COLUMN: RECREATED PROJECT NODES REGISTRY (5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Header & View Mode Switcher */}
                <div className="flex items-center justify-between font-mono text-xs border-b border-zinc-900 pb-2">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-electric" />
                    <span className="text-white font-bold uppercase">NODES REGISTRY</span>
                    <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-electric text-[10px]">
                      {filteredProjectsList.length}
                    </span>
                  </div>

                  {/* View Mode Toggle Buttons */}
                  <div className="flex items-center space-x-1 bg-zinc-950/80 p-1 rounded border border-zinc-900">
                    <button
                      type="button"
                      onClick={() => setRegistryViewMode('grid')}
                      className={`p-1.5 rounded transition-all ${
                        registryViewMode === 'grid' 
                          ? 'bg-cyber/15 text-cyber border border-cyber/30' 
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                      title="Grid View Cards"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegistryViewMode('list')}
                      className={`p-1.5 rounded transition-all ${
                        registryViewMode === 'list' 
                          ? 'bg-cyber/15 text-cyber border border-cyber/30' 
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                      title="Compact List View"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Registry View Display (Grid View vs List View) */}
                <div className="space-y-4 max-h-[650px] overflow-y-auto pr-1 scrollbar-thin">
                  {filteredProjectsList.length === 0 ? (
                    <div className="p-10 rounded-lg border border-dashed border-zinc-850 bg-zinc-950/30 text-center font-mono text-zinc-500 text-xs space-y-2">
                      <FolderPlus className="w-8 h-8 text-zinc-700 mx-auto" />
                      <p>{projectSearchQuery ? 'NO_MATCHING_NODES_FOUND' : 'NO_PROJECT_NODES_REGISTERED'}</p>
                    </div>
                  ) : registryViewMode === 'grid' ? (
                    
                    /* HIGH-FIDELITY GRID CARDS */
                    filteredProjectsList.map((proj) => {
                      const isEditingThis = projectForm.id === proj.id;
                      const slidesCount = proj.gallery?.length || (proj.image ? 1 : 0);
                      return (
                        <div 
                          key={proj.id} 
                          className={`glass-hud rounded-lg border overflow-hidden transition-all duration-300 ${
                            isEditingThis 
                              ? 'border-cyber bg-cyber/5 shadow-[0_0_20px_rgba(0,255,255,0.15)] ring-1 ring-cyber/50' 
                              : 'border-zinc-850 bg-zinc-950/60 hover:border-zinc-750'
                          } flex flex-col group`}
                        >
                          {/* Banner Image Viewport */}
                          <div className="h-32 relative overflow-hidden bg-zinc-950">
                            <img 
                              src={proj.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop'} 
                              alt={proj.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                            
                            {/* Top Badges Overlay */}
                            <div className="absolute top-2 left-2 right-2 flex items-center justify-between font-mono text-[9px]">
                              <span className="px-2 py-0.5 rounded bg-zinc-950/80 border border-zinc-800 text-matrix font-bold backdrop-blur-md">
                                {proj.category || 'Full-Stack'}
                              </span>
                              <span className="px-2 py-0.5 rounded bg-zinc-950/80 border border-zinc-800 text-zinc-300 backdrop-blur-md">
                                {proj.fileName || 'App.jsx'}
                              </span>
                            </div>

                            {/* Bottom Slides Counter Overlay */}
                            <div className="absolute bottom-2 left-2 flex items-center space-x-1.5 font-mono text-[9px] text-zinc-300 bg-zinc-950/80 px-2 py-0.5 rounded border border-zinc-800 backdrop-blur-md">
                              <Layers className="w-3 h-3 text-cyber" />
                              <span>{slidesCount} {slidesCount === 1 ? 'SLIDE' : 'SLIDES'}</span>
                            </div>
                          </div>

                          {/* Card Content Body */}
                          <div className="p-4 space-y-3 font-mono text-xs flex-1 flex flex-col justify-between">
                            <div className="space-y-1.5">
                              <h4 className="text-sm font-bold text-white group-hover:text-cyber transition-colors">
                                {proj.title}
                              </h4>
                              <p className="text-zinc-400 text-[11px] font-sans line-clamp-2 leading-relaxed">
                                {proj.description}
                              </p>
                            </div>

                            {/* Tech Stack Pills */}
                            {proj.techStack && proj.techStack.length > 0 && (
                              <div className="flex flex-wrap gap-1 text-[9px]">
                                {proj.techStack.slice(0, 4).map((tech) => (
                                  <span key={tech} className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                                    '{tech}'
                                  </span>
                                ))}
                                {proj.techStack.length > 4 && (
                                  <span className="text-zinc-600 text-[9px] self-center">+{proj.techStack.length - 4}</span>
                                )}
                              </div>
                            )}

                            {/* Action Dock Footer */}
                            <div className="flex items-center justify-between border-t border-zinc-900 pt-2.5">
                              {proj.liveLink ? (
                                <a
                                  href={proj.liveLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-zinc-500 hover:text-matrix text-[10px] flex items-center space-x-1 transition-colors"
                                >
                                  <span>Live Demo</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              ) : <div />}

                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleEditProjectClick(proj)}
                                  className={`px-3 py-1 rounded border text-[11px] font-mono font-bold flex items-center space-x-1.5 transition-all ${
                                    isEditingThis 
                                      ? 'bg-cyber text-obsidian border-cyber shadow-[0_0_10px_rgba(0,255,255,0.3)]' 
                                      : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-cyber hover:border-cyber/40'
                                  }`}
                                >
                                  <Edit2 className="w-3 h-3" />
                                  <span>{isEditingThis ? 'Editing' : 'Edit Node'}</span>
                                </button>

                                <button
                                  onClick={() => handleDeleteProject(proj.id)}
                                  className="p-1 rounded bg-rose-600/10 border border-rose-500/20 text-rose-400 hover:bg-rose-600 hover:text-white transition-all"
                                  title="Delete Project"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                          </div>
                        </div>
                      );
                    })
                  ) : (
                    
                    /* COMPACT LIST VIEW */
                    filteredProjectsList.map((proj) => {
                      const isEditingThis = projectForm.id === proj.id;
                      const slidesCount = proj.gallery?.length || (proj.image ? 1 : 0);
                      return (
                        <div 
                          key={proj.id} 
                          className={`p-3 rounded-lg border transition-all ${
                            isEditingThis 
                              ? 'border-cyber bg-cyber/5 shadow-[0_0_10px_rgba(0,255,255,0.15)]' 
                              : 'border-zinc-850 bg-zinc-950/40 hover:border-zinc-750'
                          } flex items-center justify-between gap-3 font-mono text-xs`}
                        >
                          <div className="flex items-center space-x-3 overflow-hidden">
                            <div className="w-12 h-10 rounded border border-zinc-800 bg-zinc-950 overflow-hidden shrink-0">
                              <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="overflow-hidden">
                              <div className="text-white font-bold truncate">{proj.title}</div>
                              <div className="text-zinc-500 text-[10px] truncate">{proj.fileName} • {slidesCount} Slides</div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 shrink-0">
                            <button
                              onClick={() => handleEditProjectClick(proj)}
                              className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-cyber"
                              title="Edit Node"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="p-1.5 rounded bg-rose-600/10 border border-rose-500/20 text-rose-400 hover:bg-rose-600 hover:text-white"
                              title="Delete Node"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })

                  )}
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Tab 3: Messages inbox */}
        {activeTab === 'messages' && (
          <div className="glass-hud rounded-lg border border-zinc-850 p-6 space-y-4">
            <h2 className="text-sm font-bold text-white font-mono uppercase flex items-center space-x-2">
              <Mail className="w-4 h-4 text-cyber" />
              <span>Contact Message Packets ({messagesList.length})</span>
            </h2>

            <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2 scrollbar-thin">
              {messagesList.length === 0 ? (
                <div className="text-center py-12 font-mono text-zinc-500 text-xs">INBOX_QUEUE_EMPTY // NO_PACKETS_RECEIVED</div>
              ) : (
                  messagesList.map((msg) => (
                  <div key={msg.id} className="p-4 rounded border border-zinc-900 bg-zinc-950/45 font-mono text-xs relative group flex flex-col space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between gap-4 items-start">
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-zinc-500">
                          <span className="text-white font-bold">{msg.name}</span>
                          <span className="text-zinc-800">|</span>
                          <a href={`mailto:${msg.email}`} className="text-cyber hover:underline">{msg.email}</a>
                          <span className="text-zinc-800">|</span>
                          <span>
                            {msg.timestamp?.seconds 
                              ? new Date(msg.timestamp.seconds * 1000).toLocaleString() 
                              : 'Date unavailable'}
                          </span>
                        </div>
                        <p className="text-zinc-350 break-words pl-2 border-l border-zinc-800 whitespace-pre-wrap">{msg.message}</p>

                        {/* Sent Replies History */}
                        {msg.replies && msg.replies.length > 0 && (
                          <div className="mt-4 space-y-2 border-t border-zinc-900/60 pt-3 pl-2 sm:pl-4">
                            <span className="text-[9px] text-matrix uppercase tracking-wider font-semibold block select-none">
                              // TRANSMITTED_REPLIES_HISTORY
                            </span>
                            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                              {msg.replies.map((rep, idx) => (
                                <div key={idx} className="bg-zinc-950/20 p-2.5 rounded border border-zinc-900 flex flex-col space-y-1.5">
                                  <div className="flex justify-between items-center text-[8px] text-zinc-500 font-mono select-none">
                                    <span className="text-zinc-400 font-semibold">// REPLY_PAYLOAD_#{idx + 1}</span>
                                    <span>{rep.timestamp ? new Date(rep.timestamp).toLocaleString() : 'Date unavailable'}</span>
                                  </div>
                                  <p className="text-zinc-300 font-sans text-xs break-words pl-2 border-l border-matrix/50 whitespace-pre-wrap">{rep.text}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="shrink-0 flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setReplyingToId(replyingToId === msg.id ? null : msg.id);
                          }}
                          className={`p-1.5 rounded border transition-all duration-305 ${
                            replyingToId === msg.id 
                              ? 'bg-cyber/10 border-cyber text-cyber' 
                              : 'bg-zinc-900 border-zinc-850 text-zinc-400 hover:text-cyber hover:border-cyber/30'
                          }`}
                          title="Compose Reply"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-1.5 rounded bg-rose-600/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-all opacity-80 group-hover:opacity-100"
                          title="Delete Packet"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Expandable Email Reply Editor Panel */}
                    {replyingToId === msg.id && (
                      <div className="w-full mt-3 p-4 rounded border border-zinc-850 bg-zinc-950/20 flex flex-col space-y-3">
                        <div className="flex items-center justify-between border-b border-zinc-900/60 pb-2 select-none">
                          <span className="text-[10px] text-zinc-500">// COMPOSING_TRANSMISSION_PAYLOAD</span>
                          <span className="text-[9px] text-cyber">TARGET: {msg.email}</span>
                        </div>
                        <textarea
                          value={replyText[msg.id] || ''}
                          onChange={(e) => setReplyText(p => ({ ...p, [msg.id]: e.target.value }))}
                          placeholder="Type response payload details here..."
                          rows={4}
                          className="w-full bg-zinc-950/40 border border-zinc-850 rounded px-3 py-2 outline-none text-white placeholder-zinc-700 text-sm font-sans resize-none focus:border-cyber/40 focus:bg-zinc-950/80 transition-all focus:shadow-[0_0_12px_rgba(0,255,255,0.05)]"
                          required
                        />
                        <div className="flex justify-between items-center text-[10px]">
                          <div>
                            {replyStatus[msg.id] === 'sending' && <span className="text-cyber animate-pulse">TRANSMITTING SIGNAL...</span>}
                            {replyStatus[msg.id] === 'success' && <span className="text-matrix">SIGNAL_DISPATCHED // OK</span>}
                            {replyStatus[msg.id] === 'error' && <span className="text-rose-500">DISPATCH_FAILED // ACCESS_DENIED</span>}
                            {!replyStatus[msg.id] && <span className="text-zinc-650">READY_FOR_DISPATCH</span>}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleSendReply(msg)}
                              disabled={replyStatus[msg.id] === 'sending'}
                              className="px-4 py-1.5 rounded font-semibold bg-cyber text-obsidian border border-cyber hover:bg-cyber-glow transition-all active:scale-95 disabled:opacity-50"
                            >
                              Send
                            </button>
                            <button
                              onClick={() => setReplyingToId(null)}
                              disabled={replyStatus[msg.id] === 'sending'}
                              className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-850 text-zinc-400 hover:border-zinc-700 transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
