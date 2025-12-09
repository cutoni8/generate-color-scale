import { useState } from "react";
import { generateScale } from "./utils/generate-color-scale";

function App() {
  const [hexColor, setHexColor] = useState("#ECFDF3");
  const [colorScale, setColorScale] = useState<Record<string, string>>(
    generateScale("#ECFDF3")
  );

  const handleColorChange = (value: string) => {
    setHexColor(value);
    try {
      const scale = generateScale(value);
      setColorScale(scale);
    } catch {
      // Invalid color, ignore
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="h-screen bg-neutral-950 flex items-center justify-center py-8 px-4 overflow-hidden">
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Color Scale Generator
        </h1>
        <p className="text-neutral-400 text-center text-sm mb-6">
          Generate a Tailwind-style color scale from any base color
        </p>
      
        {/* Color Input */}
        <div className="flex flex-col items-center justify-center gap-3 mb-6">
          <div className="relative flex items-center gap-3 bg-neutral-900/80 backdrop-blur-sm rounded-xl p-3 border border-neutral-700/50 shadow-xl shadow-black/20">
            <div className="relative">
              <input
                type="color"
                value={hexColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-12 h-12 rounded-lg cursor-pointer border-2 border-neutral-700 hover:border-neutral-500 transition-colors bg-transparent appearance-none [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded-md"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <label className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider">
                Hex Color
              </label>
              <input
                type="text"
                value={hexColor}
                onChange={(e) => handleColorChange(e.target.value)}
                placeholder="#3B82F6"
                className="bg-neutral-800/50 text-white text-lg font-mono w-28 px-2 py-1.5 rounded-md outline-none uppercase border border-neutral-700/50 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-500/20 transition-all"
              />
            </div>
         
          </div>
        </div>

        {/* Full Width Preview */}
        <div className="mt-4">
          <h2 className="text-base font-semibold text-white mb-2">
            Full Scale Preview
          </h2>
          <div className="flex rounded-lg overflow-hidden shadow-2xl">
            {Object.entries(colorScale).map(([step, color]) => (
              <button
                key={step}
                onClick={() => copyToClipboard(color)}
                className="group flex-1 h-16 flex flex-col items-center justify-end pb-1 cursor-pointer transition-all hover:scale-y-110 origin-bottom"
                style={{ backgroundColor: color }}
              >
                <span
                  className="text-xs font-mono font-medium"
                  style={{
                    color: parseInt(step) >= 500 ? "#fff" : "#000",
                  }}
                >
                  {step}
                </span>
                <span
                  className="text-[10px] font-mono"
                  style={{
                    color: parseInt(step) >= 500 ? "#fff" : "#000",
                  }}
                >
                  {color}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* CSS Variables */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-semibold text-white">CSS Variables</h2>
            <button
              onClick={() =>
                copyToClipboard(
                  Object.entries(colorScale)
                    .map(([step, color]) => `--color-${step}: ${color};`)
                    .join("\n")
                )
              }
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs rounded-md transition-colors"
            >
              Copy All
            </button>
          </div>
          <div className="bg-neutral-900 rounded-lg p-4 border border-neutral-800">
            <pre className="text-sm font-mono text-neutral-300 overflow-x-auto">
              {Object.entries(colorScale)
                .map(([step, color]) => `--color-${step}: ${color};`)
                .join("\n")}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-6 pt-4 border-t border-neutral-800 text-center">
          <a
            href="https://github.com/cutoni8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">N-</span>
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
