import Color from "color";

export function generateScale(baseHex: string): Record<string, string> {
  if (!/^#([0-9A-F]{3}){1,2}$/i.test(baseHex)) {
    throw new Error("Input must be a valid hex color (e.g. #000000)");
  }

  const base = Color(baseHex).hsl();

  // Steps based on the provided Green scale example
  const lightnessSteps: Record<string, number> = {
    50: 96,
    100: 90,
    200: 80,
    300: 67,
    400: 52,
    500: 39,
    600: 30,
    700: 24,
    800: 20,
    900: 16,
  };

  const scale: Record<string, string> = {};

  Object.entries(lightnessSteps).forEach(([key, lightness]) => {
    scale[key] = base.lightness(lightness).hex();
  });

  return scale;
}
