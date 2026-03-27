"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so we know we're hydrated
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-full max-w-40 bg-muted animate-pulse rounded-full" />
    );
  }

  return (
    <Tabs value={theme} onValueChange={(value: string) => setTheme(value)}>
      <TabsList className="grid w-full max-w-40 grid-cols-3 rounded-full bg-muted p-1">
        <TabsTrigger
          value="system"
          className="rounded-full data-[state=active]:bg-background"
        >
          <Monitor className="h-4 w-4" />
          <span className="sr-only">System</span>
        </TabsTrigger>
        <TabsTrigger
          value="light"
          className="rounded-full data-[state=active]:bg-background"
        >
          <Sun className="h-4 w-4" />
          <span className="sr-only">Light</span>
        </TabsTrigger>
        <TabsTrigger
          value="dark"
          className="rounded-full data-[state=active]:bg-background"
        >
          <Moon className="h-4 w-4" />
          <span className="sr-only">Dark</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
