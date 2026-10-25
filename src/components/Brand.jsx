export default function Brand({ className = '' }) {
  return (
    <img
      src="/logo.png"
      alt="AJJAYER Constructions Contracting LLC"
      className={`brand ${className}`}
      draggable="false"
    />
  );
}
