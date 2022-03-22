import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ColorSwitch = (props) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const dark = "dark";
  const light = "light";

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <div className="flex justify-center items-center">
        {/* Sun icon */}
        <span className="mr-2">
          <svg
            className={`h-6 w-6 ${
              theme === light ? "text-black" : "text-gray-300"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
          >
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>

        {/* Toggle switch */}
        <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            className="toggle-checkbox absolute block w-6 h-5 border border-black rounded-full bg-white appearance-none cursor-pointer"
            id={props.toggleName}
            name={props.toggleName}
            onChange={() => setTheme(theme === dark ? light : dark)}
            checked={theme === dark}
          />
          <label
            className="toggle-label block overflow-hidden h-5 border border-black rounded-full bg-gray-100 cursor-pointer"
            htmlFor={props.toggleName}
          ></label>
        </div>

        {/* Moon icon */}
        <span className="ml-2">
          <svg
            className={`h-6 w-6 ${
              theme === dark ? "text-white" : "text-gray-300"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
          >
            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </span>
      </div>
    </>
  );
};

export default ColorSwitch;
