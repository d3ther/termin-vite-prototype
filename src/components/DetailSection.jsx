export default function DetailSection({
  title,
  action,
  children,
  className = "",
}) {
  return (
    <section className={`detail-section${className ? ` ${className}` : ""}`}>
      <div className="detail-section-head">
        <h2>{title}</h2>
        {action}
      </div>
      <div className="detail-section-body">{children}</div>
    </section>
  );
}

export function DetailRow({ label, children, strong = false }) {
  return (
    <div className="detail-row">
      <div>
        <span className="detail-row-label">{label}</span>
      </div>
      <span className="detail-row-separator">:</span>
      <span className={strong ? "detail-row-value strong" : "detail-row-value"}>
        {children}
      </span>
    </div>
  );
}
