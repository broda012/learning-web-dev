const particles = [
  { left: "6%", size: 5, duration: 11, delay: 0, opacity: 0.55 },
  { left: "14%", size: 4, duration: 9, delay: 1.5, opacity: 0.45 },
  { left: "22%", size: 6, duration: 13, delay: 3, opacity: 0.6 },
  { left: "31%", size: 4, duration: 10, delay: 0.5, opacity: 0.4 },
  { left: "40%", size: 5, duration: 12, delay: 4, opacity: 0.55 },
  { left: "48%", size: 4, duration: 8, delay: 2, opacity: 0.45 },
  { left: "57%", size: 6, duration: 14, delay: 5, opacity: 0.6 },
  { left: "65%", size: 4, duration: 9, delay: 1, opacity: 0.4 },
  { left: "73%", size: 5, duration: 11, delay: 3.5, opacity: 0.55 },
  { left: "82%", size: 4, duration: 10, delay: 2.5, opacity: 0.45 },
  { left: "90%", size: 6, duration: 13, delay: 0, opacity: 0.6 },
  { left: "96%", size: 4, duration: 9, delay: 4.5, opacity: 0.4 },
];

export default function AmbientMist() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="glow-orb bg-(--color-terracotta)"
        style={{ width: 460, height: 460, top: "0%", left: "-6%", opacity: 0.32, animationDuration: "22s" }}
      />
      <div
        className="glow-orb bg-(--color-clay)"
        style={{ width: 400, height: 400, bottom: "0%", right: "-6%", opacity: 0.28, animationDuration: "26s", animationDelay: "3s" }}
      />

      {particles.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ["--particle-opacity"]: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
