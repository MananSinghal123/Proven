import { create } from 'zustand';
/* Apply dark class on <html> so body and all descendants pick up dark: variants */
const applyDarkClass = (isDark) => {
    if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', isDark);
    }
};
const initialDark = typeof window !== 'undefined' ? localStorage.getItem('proven-theme') === 'dark' : false;
// Apply on load so first paint is correct
applyDarkClass(initialDark);
export const useThemeStore = create((set) => ({
    dark: initialDark,
    toggle: () => set((state) => {
        const next = !state.dark;
        localStorage.setItem('proven-theme', next ? 'dark' : 'light');
        applyDarkClass(next);
        return { dark: next };
    }),
}));
