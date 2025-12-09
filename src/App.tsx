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
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center py-20 px-4">
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Color Scale Generator
        </h1>
        <p className="text-neutral-400 text-center mb-10">
          Generate a Tailwind-style color scale from any base color
        </p>

        {/* Color Input */}
        <div className="flex flex-col items-center justify-center gap-4 mb-12">
          <div className="relative flex items-center gap-4 bg-neutral-900/80 backdrop-blur-sm rounded-2xl p-4 border border-neutral-700/50 shadow-xl shadow-black/20">
            <div className="relative">
              <input
                type="color"
                value={hexColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-16 h-16 rounded-xl cursor-pointer border-2 border-neutral-700 hover:border-neutral-500 transition-colors bg-transparent appearance-none [&::-webkit-color-swatch-wrapper]:p-1 [&::-webkit-color-swatch]:rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-neutral-500 font-medium uppercase tracking-wider">
                Hex Color
              </label>
              <input
                type="text"
                value={hexColor}
                onChange={(e) => handleColorChange(e.target.value)}
                placeholder="#3B82F6"
                className="bg-neutral-800/50 text-white text-xl font-mono w-32 px-3 py-2 rounded-lg outline-none uppercase border border-neutral-700/50 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-500/20 transition-all"
              />
            </div>
         
          </div>
        </div>

        {/* Full Width Preview */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-white mb-4">
            Full Scale Preview
          </h2>
          <div className="flex rounded-xl overflow-hidden shadow-2xl">
            {Object.entries(colorScale).map(([step, color]) => (
              <button
                key={step}
                onClick={() => copyToClipboard(color)}
                className="group flex-1 h-24 flex flex-col items-center justify-end pb-2 cursor-pointer transition-all hover:scale-y-110 origin-bottom"
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
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">CSS Variables</h2>
            <button
              onClick={() =>
                copyToClipboard(
                  Object.entries(colorScale)
                    .map(([step, color]) => `--color-${step}: ${color};`)
                    .join("\n")
                )
              }
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm rounded-lg transition-colors"
            >
              Copy All
            </button>
          </div>
          <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
            <pre className="text-sm font-mono text-neutral-300 overflow-x-auto">
              {Object.entries(colorScale)
                .map(([step, color]) => `--color-${step}: ${color};`)
                .join("\n")}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
