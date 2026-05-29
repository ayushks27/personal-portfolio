import { create } from 'zustand';
import { isMockFirebase, db } from '../firebase/config';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  increment, 
  updateDoc 
} from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role?: 'admin' | 'user';
}

export interface GuestbookEntry {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  photoURL?: string;
}

export interface AdminStats {
  visitors: number;
  resumeDownloads: number;
  contactRequests: number;
  pageViews: number;
  deviceAnalytics: { device: string; count: number }[];
}

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  favorites: string[];
  guestbook: GuestbookEntry[];
  adminStats: AdminStats;
  initializeAuth: () => void;
  setClerkUser: (user: UserProfile | null) => void;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  logout: () => Promise<void>;
  toggleFavorite: (projectId: string) => Promise<void>;
  fetchGuestbook: () => Promise<void>;
  addGuestbook: (name: string, email: string, message: string) => Promise<void>;
  fetchAdminStats: () => Promise<void>;
  recordResumeDownload: () => Promise<void>;
}

// Initial Mock Admin Stats
const initialMockStats: AdminStats = {
  visitors: 1248,
  resumeDownloads: 342,
  contactRequests: 27,
  pageViews: 4892,
  deviceAnalytics: [
    { device: 'Desktop', count: 65 },
    { device: 'Mobile', count: 28 },
    { device: 'Tablet', count: 7 }
  ]
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  favorites: [],
  guestbook: [],
  adminStats: initialMockStats,

  setClerkUser: (user) => {
    set({ user });
  },

  initializeAuth: () => {
    set({ loading: true });
    
    // Set up window postMessage listener for Clerk success callback
    if (typeof window !== 'undefined') {
      const handleClerkMessage = (event: MessageEvent) => {
        if (event.data && event.data.type === 'CLERK_AUTH_SUCCESS') {
          const clerkUser = event.data.user;
          localStorage.setItem('portfolio-clerk-user', JSON.stringify(clerkUser));
          set({ user: clerkUser, loading: false });
          get().fetchGuestbook();
          get().fetchAdminStats();
        }
      };
      
      // Ensure we bind the event listener only once globally
      if (!(window as any).__clerk_listener_bound) {
        window.addEventListener('message', handleClerkMessage);
        (window as any).__clerk_listener_bound = true;
      }
    }

    const savedUser = localStorage.getItem('portfolio-clerk-user');
    const savedFavs = localStorage.getItem('portfolio-mock-favs');
    set({ 
      user: savedUser ? JSON.parse(savedUser) : null,
      favorites: savedFavs ? JSON.parse(savedFavs) : [],
      loading: false 
    });
    get().fetchGuestbook();
    get().fetchAdminStats();
  },

  loginWithEmail: async (_email, _pass) => {
    set({ loading: true });
    try {
      const width = 480;
      const height = 620;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      window.open(
        '/clerk-auth.html',
        'Clerk Authentication',
        `width=${width},height=${height},top=${top},left=${left},toolbar=no,menubar=no,scrollbars=yes`
      );
    } finally {
      set({ loading: false });
    }
  },

  registerWithEmail: async (_email, _pass, _name) => {
    set({ loading: true });
    try {
      const width = 480;
      const height = 620;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      window.open(
        '/clerk-auth.html',
        'Clerk Authentication',
        `width=${width},height=${height},top=${top},left=${left},toolbar=no,menubar=no,scrollbars=yes`
      );
    } finally {
      set({ loading: false });
    }
  },

  loginWithGoogle: async () => {
    set({ loading: true });
    try {
      const width = 480;
      const height = 620;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      window.open(
        '/clerk-auth.html',
        'Clerk Authentication',
        `width=${width},height=${height},top=${top},left=${left},toolbar=no,menubar=no,scrollbars=yes`
      );
    } finally {
      set({ loading: false });
    }
  },

  loginWithGithub: async () => {
    set({ loading: true });
    try {
      const width = 480;
      const height = 620;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      window.open(
        '/clerk-auth.html',
        'Clerk Authentication',
        `width=${width},height=${height},top=${top},left=${left},toolbar=no,menubar=no,scrollbars=yes`
      );
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      localStorage.removeItem('portfolio-clerk-user');
      set({ user: null, favorites: [] });
    } finally {
      set({ loading: false });
    }
  },

  toggleFavorite: async (projectId) => {
    const { user, favorites } = get();
    if (!user) return;

    const newFavs = favorites.includes(projectId)
      ? favorites.filter(id => id !== projectId)
      : [...favorites, projectId];

    set({ favorites: newFavs });

    if (isMockFirebase) {
      localStorage.setItem('portfolio-mock-favs', JSON.stringify(newFavs));
    } else {
      try {
        await setDoc(doc(db, 'users', user.uid), { favorites: newFavs }, { merge: true });
      } catch (e) {
        console.error("Error saving favorites:", e);
      }
    }
  },

  fetchGuestbook: async () => {
    if (isMockFirebase) {
      const localMsg = localStorage.getItem('portfolio-mock-guestbook');
      if (localMsg) {
        set({ guestbook: JSON.parse(localMsg) });
      } else {
        // Seed default messages
        const defaults: GuestbookEntry[] = [
          { id: '1', name: 'Sarah Connor', email: 'sarah@skynet.com', message: 'Outstanding sleek design. The 3D interactions are ultra-responsive!', createdAt: new Date().toISOString() },
          { id: '2', name: 'John Miller', email: 'john@techcorp.io', message: 'Perfect recruiter experience. The command palette and terminal integrations are exceptional!', createdAt: new Date().toISOString() }
        ];
        localStorage.setItem('portfolio-mock-guestbook', JSON.stringify(defaults));
        set({ guestbook: defaults });
      }
    } else {
      try {
        const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const entries: GuestbookEntry[] = [];
        querySnapshot.forEach((docSnap) => {
          entries.push({ id: docSnap.id, ...docSnap.data() } as GuestbookEntry);
        });
        set({ guestbook: entries });
      } catch (e) {
        console.error("Error loading guestbook:", e);
      }
    }
  },

  addGuestbook: async (name, email, message) => {
    const { guestbook, user } = get();
    const entry: GuestbookEntry = {
      id: isMockFirebase ? 'entry-' + Math.random().toString(36).substring(2, 9) : '',
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
      photoURL: user?.photoURL || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${name}`
    };

    if (isMockFirebase) {
      const updated = [entry, ...guestbook];
      localStorage.setItem('portfolio-mock-guestbook', JSON.stringify(updated));
      set({ guestbook: updated });
    } else {
      try {
        const docRef = await addDoc(collection(db, 'guestbook'), entry);
        set({ guestbook: [{ ...entry, id: docRef.id }, ...guestbook] });
      } catch (e) {
        console.error("Error adding to guestbook:", e);
      }
    }
  },

  fetchAdminStats: async () => {
    if (isMockFirebase) {
      const savedStats = localStorage.getItem('portfolio-mock-stats');
      if (savedStats) {
        set({ adminStats: JSON.parse(savedStats) });
      } else {
        localStorage.setItem('portfolio-mock-stats', JSON.stringify(initialMockStats));
        set({ adminStats: initialMockStats });
      }
    } else {
      try {
        const docSnap = await getDoc(doc(db, 'analytics', 'dashboard'));
        if (docSnap.exists()) {
          set({ adminStats: docSnap.data() as AdminStats });
        }
      } catch (e) {
        console.error("Error reading admin analytics:", e);
      }
    }
  },

  recordResumeDownload: async () => {
    const { adminStats } = get();
    const updated = { ...adminStats, resumeDownloads: adminStats.resumeDownloads + 1 };
    set({ adminStats: updated });

    if (isMockFirebase) {
      localStorage.setItem('portfolio-mock-stats', JSON.stringify(updated));
    } else {
      try {
        await updateDoc(doc(db, 'analytics', 'dashboard'), {
          resumeDownloads: increment(1)
        });
      } catch (e) {
        console.error("Error logging resume download:", e);
      }
    }
  }
}));


