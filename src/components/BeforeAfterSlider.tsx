"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import styles from "@/styles/cases-doctor.module.css";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "قبل",
  afterLabel = "بعد",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState("50");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPosition(val);
    if (containerRef.current) {
      containerRef.current.style.setProperty("--position", `${val}%`);
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.sliderContainer}
      dir="ltr"
      style={{ direction: "ltr", "--position": "50%" } as React.CSSProperties}
    >
      {/* Background (After Image - Full layer) */}
      <div className={styles.sliderImageWrapper}>
        <Image
          src={afterImage}
          alt={afterLabel || "After treatment"}
          fill
          sizes="(max-width: 968px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
          priority
          draggable={false}
        />
        {afterLabel && (
          <span className={`${styles.sliderBadge} ${styles.sliderBadgeRight}`} dir="auto">
            {afterLabel}
          </span>
        )}
      </div>

      {/* Overlaid clipped layer (Before Image) */}
      <div className={styles.sliderBeforeWrapper}>
        <Image
          src={beforeImage}
          alt={beforeLabel || "Before treatment"}
          fill
          sizes="(max-width: 968px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
          priority
          draggable={false}
        />
        {beforeLabel && (
          <span className={`${styles.sliderBadge} ${styles.sliderBadgeLeft}`} dir="auto">
            {beforeLabel}
          </span>
        )}
      </div>

      {/* Separator Divider Line & Handle */}
      <div className={styles.sliderDivider}>
        <div className={styles.sliderHandle}>
          <i className="bx bx-chevron-left" />
          <i className="bx bx-chevron-right" />
        </div>
      </div>

      {/* Native range input with sub-pixel stepping for zero-lag smooth dragging */}
      <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        value={position}
        onChange={handleInput}
        onInput={handleInput}
        className={styles.sliderInput}
        aria-label="Compare before and after treatment images"
      />
    </div>
  );
}
