import { useEffect, useState } from "react";

const useDarkTheme = (
  darkTheme = false,
  dColor = "#FFFFFF",
  dBgColor = "#222222",
  lColor = "#222222",
  lBgColor = "#FFFFFF"
) => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (darkTheme) {
      document.body.style.color = dColor;
      document.body.style.backgroundColor = dBgColor;
      setTheme("dark");
    } else {
      document.body.style.color = lColor;
      document.body.style.backgroundColor = lBgColor;
      setTheme("light");
    }
  }, [darkTheme, dColor, dBgColor, lColor, lBgColor]);

  return theme === "dark" ? "dark" : "light";
};

export default useDarkTheme;

  const currTheme = useDarkTheme(
    false,
    themeData.darkTextColor,
    themeData.darkBgColor,
    themeData.lightTextColor,
    themeData.lightBgColor
  );
