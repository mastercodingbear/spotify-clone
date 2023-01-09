import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
export default function () {
  const { theme } = useTheme("");
  const [isDark, setisDark] = useState(null);
  useEffect(() => {
    if (theme === "dark") setisDark(true);
    if (theme === "light") setisDark(false);
  }, [theme]);
  if (isDark) return <IoSunnyOutline />;
  if (isDark === false) return <IoMoonOutline />;
  if (isDark === null) return <></>;
}
