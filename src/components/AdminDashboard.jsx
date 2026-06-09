import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { Terminal, Shield, LogOut, Save, Plus, Trash2, Edit2, Mail, Briefcase, FileCode, Cpu, Loader2 } from 'lucide-react';

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
    about: 'I am a Full-Stack Engineer designing high-performance interfaces, cloud structures, and interactive layouts. Leveraging modular technologies to bridge code speed with clean visual art.',
    focusTags: 'React/Vite, Firebase Cloud, High-Fidelity Tailwind Designs'
  });

  // Projects states
  const [projectsList, setProjectsList] = useState([]);
  const [projectForm, setProjectForm] = useState({
    id: '', // Empty means creating new project
    title: '',
    description: '',
    techStack: '', // input as string, split to array
    liveLink: '',
    githubLink: '',
    image: '',
    category: 'Full-Stack',
    fileName: 'App.jsx'
  });

  // Messages inbox state
  const [messagesList, setMessagesList] = useState([]);

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
      const payload = {
        title: projectForm.title.trim(),
        description: projectForm.description.trim(),
        techStack: projectForm.techStack.split(',').map(s => s.trim()).filter(s => s !== ''),
        liveLink: projectForm.liveLink.trim(),
        githubLink: projectForm.githubLink.trim(),
        image: projectForm.image.trim() || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
        category: projectForm.category,
        fileName: projectForm.fileName.trim() || 'App.jsx'
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
        techStack: '',
        liveLink: '',
        githubLink: '',
        image: '',
        category: 'Full-Stack',
        fileName: 'App.jsx'
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
      title: proj.title,
      description: proj.description,
      techStack: proj.techStack.join(', '),
      liveLink: proj.liveLink,
      githubLink: proj.githubLink,
      image: proj.image,
      category: proj.category,
      fileName: proj.fileName || 'App.jsx'
    });
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
          <div className="bg-zinc-950/90 px-4 py-3 border-b border-zinc-900 flex items-center space-x-2 font-mono text-xs">
            <Shield className="w-4 h-4 text-rose-500" />
            <span className="text-zinc-400 font-bold">SECURE_GATEWAY // AUTH</span>
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
                <label className="text-zinc-500">ABOUT_PARAGRAPH</label>
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

        {/* Tab 2: Projects CRUD */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Project form */}
            <form onSubmit={handleSaveProject} className="lg:col-span-5 glass-hud rounded-lg border border-zinc-850 p-6 space-y-4 font-mono text-xs">
              <h2 className="text-sm font-bold text-white uppercase flex items-center space-x-2">
                <Plus className="w-4 h-4 text-cyber" />
                <span>{projectForm.id ? 'Edit Project Node' : 'Register New Project'}</span>
              </h2>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-zinc-500">PROJECT_TITLE</label>
                  <input 
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm(p => ({ ...p, title: e.target.value }))}
                    className="w-full p-2 rounded bg-zinc-900/60 border border-zinc-800 outline-none text-white focus:border-cyber"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-500">FILE_EXTENSION_NAME (tab)</label>
                  <input 
                    type="text"
                    value={projectForm.fileName}
                    onChange={(e) => setProjectForm(p => ({ ...p, fileName: e.target.value }))}
                    placeholder="Dashboard.tsx"
                    className="w-full p-2 rounded bg-zinc-900/60 border border-zinc-800 outline-none text-white focus:border-cyber"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-500">DESCRIPTION</label>
                  <textarea 
                    value={projectForm.description}
                    onChange={(e) => setProjectForm(p => ({ ...p, description: e.target.value }))}
                    rows={3}
                    className="w-full p-2 rounded bg-zinc-900/60 border border-zinc-800 outline-none text-white focus:border-cyber resize-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-500">TECH_STACK (Comma separated)</label>
                  <input 
                    type="text"
                    value={projectForm.techStack}
                    onChange={(e) => setProjectForm(p => ({ ...p, techStack: e.target.value }))}
                    placeholder="React, Firebase, Tailwind"
                    className="w-full p-2 rounded bg-zinc-900/60 border border-zinc-800 outline-none text-white focus:border-cyber"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-500">CATEGORY</label>
                  <select 
                    value={projectForm.category}
                    onChange={(e) => setProjectForm(p => ({ ...p, category: e.target.value }))}
                    className="w-full p-2 rounded bg-zinc-900/60 border border-zinc-800 outline-none text-white focus:border-cyber"
                  >
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Frontend">Frontend</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-500">IMAGE_URL</label>
                  <input 
                    type="url"
                    value={projectForm.image}
                    onChange={(e) => setProjectForm(p => ({ ...p, image: e.target.value }))}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2 rounded bg-zinc-900/60 border border-zinc-800 outline-none text-white focus:border-cyber"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-500">LIVE_LINK</label>
                  <input 
                    type="text"
                    value={projectForm.liveLink}
                    onChange={(e) => setProjectForm(p => ({ ...p, liveLink: e.target.value }))}
                    placeholder="https://..."
                    className="w-full p-2 rounded bg-zinc-900/60 border border-zinc-800 outline-none text-white focus:border-cyber"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-500">GITHUB_LINK</label>
                  <input 
                    type="text"
                    value={projectForm.githubLink}
                    onChange={(e) => setProjectForm(p => ({ ...p, githubLink: e.target.value }))}
                    placeholder="https://github.com/..."
                    className="w-full p-2 rounded bg-zinc-900/60 border border-zinc-800 outline-none text-white focus:border-cyber"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 rounded bg-cyber text-obsidian font-bold uppercase flex items-center space-x-1 hover:scale-105 active:scale-95 transition-transform"
                >
                  {actionLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>{projectForm.id ? 'Update Node' : 'Register Node'}</span>
                </button>
                {projectForm.id && (
                  <button
                    type="button"
                    onClick={() => setProjectForm({
                      id: '', title: '', description: '', techStack: '', liveLink: '', githubLink: '', image: '', category: 'Full-Stack', fileName: 'App.jsx'
                    })}
                    className="px-4 py-2 rounded bg-zinc-900 border border-zinc-850 hover:text-white hover:border-zinc-750 transition-all"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            {/* Project list table */}
            <div className="lg:col-span-7 glass-hud rounded-lg border border-zinc-850 p-6 space-y-4">
              <h2 className="text-sm font-bold text-white font-mono uppercase flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-electric" />
                <span>Active Project Nodes ({projectsList.length})</span>
              </h2>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
                {projectsList.length === 0 ? (
                  <div className="text-center py-10 font-mono text-zinc-500 text-xs">NO_PROJECT_NODES_FOUND</div>
                ) : (
                  projectsList.map((proj) => (
                    <div key={proj.id} className="p-3 rounded border border-zinc-900 bg-zinc-950/40 flex justify-between items-center gap-4 hover:border-zinc-800 transition-colors">
                      <div className="font-mono text-xs overflow-hidden">
                        <div className="text-white font-bold truncate">{proj.title}</div>
                        <div className="text-zinc-500 text-[10px] truncate">{proj.fileName} // {proj.category}</div>
                      </div>
                      <div className="flex space-x-2 shrink-0">
                        <button
                          onClick={() => handleEditProjectClick(proj)}
                          className="p-1.5 rounded bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-cyber hover:border-cyber/30 transition-all"
                          title="Edit Node"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1.5 rounded bg-rose-600/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-all"
                          title="Delete Node"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
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
                  <div key={msg.id} className="p-4 rounded border border-zinc-900 bg-zinc-950/45 font-mono text-xs relative group flex flex-col sm:flex-row justify-between gap-4">
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
                    </div>

                    <div className="shrink-0 flex items-start">
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-1.5 rounded bg-rose-600/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-all opacity-80 group-hover:opacity-100"
                        title="Delete Packet"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
