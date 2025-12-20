export default function PrevIcon() {
  return (
    <img
      src="/icons/play.png"
      alt="Previous"
      className="w-6 h-6 brightness-0 opacity-65 dark:invert dark:opacity-100"
      style={{
        transform: 'scaleX(-1)',
        display: 'block'
      }}
    />
  );
}

