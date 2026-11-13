import '@/styles/globals.css';
import { useEffect, useState, createContext, useContext } from 'react';
import Head from 'next/head';

export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
  soundEnabled: true,
  toggleSound: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState('dark');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      document.documentElement.classList.add('dark');
    }

    const savedSound = localStorage.getItem('sound');
    if (savedSound !== null) {
      setSoundEnabled(savedSound === 'true');
    }
  }, []);

  const toggleSound = () => {
    const nextSound = !soundEnabled;
    setSoundEnabled(nextSound);
    localStorage.setItem('sound', String(nextSound));
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, soundEnabled, toggleSound, mounted }}>
      <Head>
        <title>Mishant Gautam | Full-Stack Developer & AI Systems Engineer</title>
        <meta
          name="description"
          content="Portfolio of Mishant Gautam — Information Technology undergraduate at MAIT (Delhi) architecting offline AI tools, full-stack systems, and high-impact web software."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}

