type IconProps = { className?: string };

export function TruckIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 4h13v11H1z" strokeLinejoin="round" />
      <path d="M14 8h4l4 4v3h-8z" strokeLinejoin="round" />
      <circle cx="5" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </svg>
  );
}

export function ShieldIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z" strokeLinejoin="round" />
      <path d="M8.5 12l2.3 2.3L15.5 9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CardIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 15h4" strokeLinecap="round" />
    </svg>
  );
}

export function HeartIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 20s-7-4.4-9.5-9C.7 7.4 2.9 4 6.4 4c2 0 3.6 1.2 4.6 2.6C12 5.2 13.6 4 15.6 4 19.1 4 21.3 7.4 21.5 11 19 15.6 12 20 12 20z" strokeLinejoin="round" />
    </svg>
  );
}

export function ChickenIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M8 3c2 0 3 1.4 3 3 1.6-1 3.4-.6 4 .7.6 1.3-.2 2.6-1.5 3-1 3.5-3.7 6.3-7.5 6.3C3 16 1.5 12.8 2.3 9.8 2.9 7.6 5 6.5 7 6.8 6.5 5.6 6.8 4 8 3z" strokeLinejoin="round" />
      <path d="M9 19l-1.5 2M13 19l1 2" strokeLinecap="round" />
    </svg>
  );
}

export function CowIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M7 6c-2 0-3.5 1.5-3.5 3.5v3c0 2 1.5 3.5 3.5 3.5h10c2 0 3.5-1.5 3.5-3.5v-3C20.5 7.5 19 6 17 6H7z" strokeLinejoin="round" />
      <path d="M5 6c-1-1.5-2.5-1.5-3.5-.5S.5 7 2 8" strokeLinecap="round" />
      <path d="M19 6c1-1.5 2.5-1.5 3.5-.5S23.5 7 22 8" strokeLinecap="round" />
      <path d="M8 16v4M16 16v4M10 10.5h.01M14 10.5h.01" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

export function GoatIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M5 8c-1.5-1-2-2.7-1.3-4C4.2 2.8 6 3 6.8 4.4" strokeLinecap="round" />
      <path d="M19 8c1.5-1 2-2.7 1.3-4-.5-1.2-2.3-1-3.1.4" strokeLinecap="round" />
      <ellipse cx="12" cy="11" rx="6" ry="5" />
      <path d="M8 20l1-4M16 20l-1-4M9 6.5c1-1.3 4-1.3 5 0" strokeLinecap="round" />
    </svg>
  );
}

export function ThermometerIcon({ className = "w-7 h-7" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3a2 2 0 0 0-2 2v9.3a4 4 0 1 0 4 0V5a2 2 0 0 0-2-2z" strokeLinejoin="round" />
      <circle cx="12" cy="18" r="1.6" />
    </svg>
  );
}

export function FlaskIcon({ className = "w-7 h-7" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 2h6M10 2v6.5L4.8 18a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 8.5V2" strokeLinejoin="round" />
      <path d="M7 15h10" />
    </svg>
  );
}

export function DropletIcon({ className = "w-7 h-7" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2s6 7 6 11.5a6 6 0 1 1-12 0C6 9 12 2 12 2z" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7L2 9.2l7.1-.6L12 2z" />
    </svg>
  );
}

export function SearchIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

export function CartIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 3h2l2.6 12.5a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9.5" cy="20.5" r="1.3" />
      <circle cx="17.5" cy="20.5" r="1.3" />
    </svg>
  );
}

export function ArrowIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
