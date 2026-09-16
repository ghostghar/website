type PlaceholderProps = {
  label?: string;
  className?: string;
  showText?: boolean;
};

/**
 * Blank placeholder box — swap this out for a real <Image> / <img>
 * once you have your assets.
 */
export default function Placeholder({ label = "Image", className = "", showText = true }: PlaceholderProps) {
  return <div className={`img-ph ${className}`}>{showText && label ? label : null}</div>;
}
