"use client";
import Image from "next/image";
import { useEffect, useRef, useState, useId } from "react";

export function SectionHeading({ id, children }) {
  const [message, setMessage] = useState("");
  async function copy() {
    const url = new URL(window.location.href);
    url.hash = id;
    try {
      await navigator.clipboard.writeText(url.toString());
      setMessage("Link copied");
    } catch {
      setMessage(`Copy this address: ${url}`);
    }
  }
  return (
    <div className="section-heading-tools">
      <h2 id={id}>{children}</h2>
      <button
        type="button"
        className="copy-section"
        onClick={copy}
        aria-label={`Copy link to ${children}`}
      >
        Link <span aria-hidden="true">↗</span>
      </button>
      <span
        role="status"
        className={message.startsWith("Copy this") ? "copy-error" : "sr-only"}
      >
        {message}
      </span>
    </div>
  );
}

export function ScreenshotGallery({ images }) {
  const [index, setIndex] = useState(null);
  const dialog = useRef(null);
  const opener = useRef(null);
  useEffect(() => {
    if (index === null) return;
    const node = dialog.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!node.open) node.showModal();
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [index]);
  function close() {
    dialog.current?.close();
    setIndex(null);
    opener.current?.focus();
  }
  function step(amount) {
    setIndex((i) => (i + amount + images.length) % images.length);
  }
  const image = index === null ? null : images[index];
  return (
    <>
      <div className="case-gallery">
        {images.map((image, i) => (
          <figure
            key={image.src}
            className={
              image.height > image.width ? "mobile-capture" : "desktop-capture"
            }
          >
            <button
              type="button"
              className="gallery-trigger"
              onClick={(e) => {
                opener.current = e.currentTarget;
                setIndex(i);
              }}
              aria-label={`Enlarge screenshot: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width:650px) 90vw,65vw"
              />
            </button>
            <figcaption>{image.caption}</figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Project screenshot viewer"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            step(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            step(-1);
          }
        }}
      >
        {image && (
          <div className="lightbox-content">
            <div className="lightbox-toolbar">
              <p aria-live="polite">
                {index + 1} / {images.length} — {image.caption}
              </p>
              <button type="button" onClick={close} autoFocus>
                Close screenshot
              </button>
            </div>
            <img
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
            />
            <div className="lightbox-toolbar">
              <button type="button" onClick={() => step(-1)}>
                Previous screenshot
              </button>
              <a href={image.src} target="_blank" rel="noopener noreferrer">
                Open full size<span className="sr-only"> (new tab)</span>
              </a>
              <button type="button" onClick={() => step(1)}>
                Next screenshot
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

export function ImageComparison({ comparison }) {
  const inputId = useId();
  const [position, setPosition] = useState(50);
  return (
    <div className="comparison">
      <div className="comparison-images">
        <img
          src={comparison.before.src}
          alt={comparison.before.alt}
          width={comparison.before.width}
          height={comparison.before.height}
        />
        <div
          className="comparison-after"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={comparison.after.src}
            alt={comparison.after.alt}
            width={comparison.after.width}
            height={comparison.after.height}
          />
        </div>
        <span className="comparison-label before-label">Before</span>
        <span className="comparison-label after-label">After</span>
      </div>
      <label htmlFor={inputId}>
        Compare versions <output aria-hidden="true">{position}% after</output>
        <input
          id={inputId}
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
        />
      </label>
    </div>
  );
}
