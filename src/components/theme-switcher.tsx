"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Moon, Sun, Palette } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;

  const toggleCrazyTheme = () => {
    // Add or remove the crazy class
    const root = document.documentElement;
    if (root.classList.contains('crazy')) {
      root.classList.remove('crazy');
      setTheme('light');
    } else {
      root.classList.add('crazy');
      // Store that we're using crazy theme
      localStorage.setItem('crazyTheme', 'true');
    }
  };

  // Check if we're using the crazy theme
  const isCrazyTheme = typeof window !== 'undefined' && document.documentElement.classList.contains('crazy');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          {isCrazyTheme && <Palette className="h-4 w-4" />}
          {!isCrazyTheme && theme === "light" && <Sun className="h-4 w-4" />}
          {!isCrazyTheme && theme === "dark" && <Moon className="h-4 w-4" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleCrazyTheme}>
          <Palette className="mr-2 h-4 w-4" />
          <span>Crazy</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 