// components/common/theme-changer.tsx
"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch flashes
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-4.5 h-4.5" />;

  return (
    <div className="text-black  dark:text-white  cursor-pointer ">
      {theme === "dark" ? (
        /* FIXED: Sun icon should set the theme to light */
        <Sun onClick={() => setTheme("light")} size={18} />
      ) : (
        /* FIXED: Moon icon should set the theme to dark */
        <Moon onClick={() => setTheme("dark")} size={18} />
      )}
    </div>
  );
};

export default ThemeChanger;
