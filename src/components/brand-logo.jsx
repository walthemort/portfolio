export default function BrandLogo({ wordmark = false }) {
  return (
    <img
      className={`brand-logo${wordmark ? " brand-wordmark" : ""}`}
      src={wordmark ? "/logo.svg" : "/logo-mark.svg"}
      width="850"
      height={wordmark ? 610 : 525}
      alt=""
    />
  );
}
