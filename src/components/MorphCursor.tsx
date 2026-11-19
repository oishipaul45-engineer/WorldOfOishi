import { useEffect, useRef, useState } from "react";
import "./MorphCursor.css";

const styles = [
  { symbol: "✳", color: "#FF5A1F" },
  { symbol: "✧", color: "#CFA0FF" },
  { symbol: "⌘", color: "#FFC260" },
  { symbol: "♫", color: "#FF4DB2" },
  { symbol: "✣", color: "#C7FF39" },
  { symbol: "◇", color: "#FF8658" },
  { symbol: "↗", color: "#5EDBFF" },
  { symbol: "✳", color: "#FF5A1F" },
];

export default function MorphCursor() {
  const [chapter, setChapter] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursor = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Support both mouse and touch input

    let frame = 0;
    let x = -100;
    let y = -100;
    let tx = -100;
    let ty = -100;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      setVisible(true);
      setHovering(
        Boolean(
          (e.target as Element)?.closest(
            "a, button, [role='button'], input"
          )
        )
      );
    };

    const hide = () => setVisible(false);

    const animate = () => {
      tx += (x - tx) * 0.13;
      ty += (y - ty) * 0.13;

      if (cursor.current) {
        cursor.current.style.transform =
          `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      if (trail.current) {
        trail.current.style.transform =
          `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      }

      frame = requestAnimationFrame(animate);
    };

    const updateChapter = () => {
      const chapters = [...document.querySelectorAll(".chapter")];

      if (!chapters.length) return;

      let nearest = 0;
      let distance = Infinity;

      chapters.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const d = Math.abs(
          rect.top + rect.height / 2 - window.innerHeight / 2
        );

        if (d < distance) {
          distance = d;
          nearest = index;
        }
      });

      setChapter(Math.min(nearest, styles.length - 1));
    };

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", hide);
    window.addEventListener("scroll", updateChapter, { passive: true });

    updateChapter();
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("scroll", updateChapter);
      cancelAnimationFrame(frame);
    };
  }, []);

  const current = styles[chapter];

  return (
    <div
      className={`morph-system ${visible ? "visible" : ""} ${hovering ? "is-hovering" : ""}`}
      style={{ "--cursor-accent": current.color } as React.CSSProperties}
      aria-hidden="true"
    >
      <div ref={trail} className="morph-trail" />
      <div ref={cursor} className="morph-cursor">
        <span>{hovering ? "↗" : current.symbol}</span>
      </div>
    </div>
  );
}
