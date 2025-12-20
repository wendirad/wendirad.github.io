export default function PrevIcon() {
  return (
    <img
      src="/icons/play.png"
      alt="Previous"
      className="w-6 h-6 dark:brightness-0 dark:invert"
      style={{
        filter: 'brightness(0) opacity(0.65)',
        transform: 'scaleX(-1)',
        display: 'block'
      }}
    />
  );
}

