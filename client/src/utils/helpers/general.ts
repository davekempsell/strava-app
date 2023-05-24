export const hexToRGBA = (hex: string, opacity: number) => {
  // Remove the '#' character if present
  hex = hex.replace('#', '');

  // Split the hex code into RGB components
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the opacity
  const alpha = opacity.toFixed(2);

  // Return the RGBA color value
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}