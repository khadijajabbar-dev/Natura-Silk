import { Link } from 'react-router-dom';

export default function PolicyPage({ title, breadcrumb, updated, sections }) {
  return (
    <div className="container section">
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>{title}</h1>
      {updated && <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 32 }}>Last updated: {updated}</p>}

      <div style={{ maxWidth: 760 }}>
        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: 28 }}>
            {s.heading && <h2 style={{ fontSize: 19, marginBottom: 10 }}>{s.heading}</h2>}
            {s.paragraphs?.map((p, j) => (
              <p key={j} style={{ fontSize: 14.5, lineHeight: 1.8, marginBottom: 12 }}>{p}</p>
            ))}
            {s.list && (
              <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
                {s.list.map((item, k) => (
                  <li key={k} style={{ fontSize: 14.5, lineHeight: 1.8, marginBottom: 6 }}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
