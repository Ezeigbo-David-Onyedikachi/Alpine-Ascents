/**
 * AlpineLogo.jsx — Alpine Ascents SVG Logo Component
 *
 * Renders a mountain/summit SVG icon used across the site
 * (Navbar, Footer, 404 page). Accepts size, light mode toggle,
 * and additional className props.
 */

export default function AlpineLogo({ size = 32, light = true, className = '' }) {
  const color = light ? '#ffffff' : 'var(--color-primary, #2563eb)';

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Alpine Ascents logo"
    >
      {/* Main peak */}
      <polygon
        points="32,6 54,54 10,54"
        fill={color}
        opacity="0.9"
      />
      {/* Secondary peak */}
      <polygon
        points="44,20 58,54 30,54"
        fill={color}
        opacity="0.55"
      />
      {/* Snow cap */}
      <polygon
        points="32,6 38,20 26,20"
        fill={light ? '#e0f2fe' : '#bfdbfe'}
        opacity="0.85"
      />
    </svg>
  );
}
