export default function BrandLogo({ wordmark = false }) {
  return (
    <img
      className={`brand-logo${wordmark ? " brand-wordmark" : ""}`}
      src={wordmark ? "/logo.svg" : "/logo-mark.svg"}
      width="1090"
      height={wordmark ? 350 : 260}
      alt=""
    />
  );
}
