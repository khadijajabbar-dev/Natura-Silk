// import { useState, useEffect } from 'react';
// import adminClient from '../api/adminClient';
// import { useSiteSettingsRefresh } from '../../../shared/hooks/SiteSettingsContext.jsx';
// import ImageField from './ImageField';

// function RepeaterField({ field, value, onChange, imageList, onNewImage }) {
//   const items = Array.isArray(value) ? value : [];

//   function updateItem(idx, key, val) {
//     const next = items.map((it, i) => (i === idx ? { ...it, [key]: val } : it));
//     onChange(next);
//   }

//   function removeItem(idx) {
//     onChange(items.filter((_, i) => i !== idx));
//   }

//   function addItem() {
//     const blank = {};
//     field.itemFields.forEach((f) => { blank[f.key] = ''; });
//     onChange([...items, blank]);
//   }

//   return (
//     <div>
//       {items.map((item, idx) => (
//         <div key={idx} style={{
//           border: '1px solid var(--line)', borderRadius: 8, padding: 14, marginBottom: 10,
//           background: 'var(--cream)',
//         }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
//             <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)' }}>#{idx + 1}</span>
//             <button type="button" onClick={() => removeItem(idx)} style={{
//               fontSize: 11.5, fontWeight: 600, color: '#B3261E', background: 'none',
//               border: 'none', cursor: 'pointer',
//             }}>Remove</button>
//           </div>
//           {field.itemFields.map((sf) => (
//             <div key={sf.key} style={{ marginBottom: 8 }}>
//               <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{sf.label}</label>
//               {sf.type === 'image' ? (
//                 <ImageField
//                   id={`${field.key}-${idx}-${sf.key}`}
//                   value={item[sf.key]}
//                   onChange={(val) => updateItem(idx, sf.key, val)}
//                   imageList={imageList}
//                   onUploaded={onNewImage}
//                 />
//               ) : sf.type === 'textarea' ? (
//                 <textarea
//                   value={item[sf.key] ?? ''}
//                   onChange={(e) => updateItem(idx, sf.key, e.target.value)}
//                   rows={2}
//                   style={{ width: '100%', padding: '8px 10px', borderRadius: 5, border: '1px solid var(--line)', fontSize: 13.5, fontFamily: 'inherit', boxSizing: 'border-box' }}
//                 />
//               ) : (
//                 <input
//                   type={sf.type === 'number' ? 'number' : 'text'}
//                   step={sf.type === 'number' ? '0.5' : undefined}
//                   value={item[sf.key] ?? ''}
//                   onChange={(e) => updateItem(idx, sf.key, sf.type === 'number' ? Number(e.target.value) : e.target.value)}
//                   style={{ width: '100%', padding: '8px 10px', borderRadius: 5, border: '1px solid var(--line)', fontSize: 13.5, boxSizing: 'border-box' }}
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       ))}
//       <button type="button" onClick={addItem} className="btn btn-outline" style={{ fontSize: 12.5, padding: '8px 16px' }}>
//         + Add {field.label.replace(/s$/, '')}
//       </button>
//     </div>
//   );
// }

// export default function SettingsPanel({ group, onNavigate }) {
//   const [fields, setFields] = useState([]);
//   const [values, setValues] = useState({});
//   const [imageList, setImageList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [saved, setSaved] = useState(false);
//   const refreshSiteSettings = useSiteSettingsRefresh();
//   const activeGroup = group;

//   useEffect(() => {
//     Promise.all([
//       adminClient.get('/settings'),
//       adminClient.get('/images'),
//     ]).then(([s, i]) => {
//       setFields(s.data.fields);
//       setValues(s.data.settings);
//       setImageList(i.data.images);
//       setLoading(false);
//     });
//   }, []);

//   // Switching sections in the sidebar should drop the "Saved ✓" note from
//   // whatever section the admin was on previously.
//   useEffect(() => { setSaved(false); }, [activeGroup]);

//   function handleChange(key, val) {
//     setValues((v) => ({ ...v, [key]: val }));
//     setSaved(false);
//   }

//   async function handleSave(e) {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       await adminClient.put('/settings', values);
//       setSaved(true);
//       refreshSiteSettings();
//     } finally {
//       setSaving(false);
//     }
//   }

//   if (loading) return <p style={{ padding: 24 }}>Loading settings...</p>;

//   const groupFields = fields.filter((f) => f.group === activeGroup);

//   return (
//     <div>
//       <h2 style={{ fontSize: 22, marginBottom: 4 }}>{activeGroup}</h2>
//       <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 24 }}>
//         Editing settings for this section only. Pick another section from the sidebar to switch.
//       </p>

//       {activeGroup === 'Ingredients Page' && (
//         <div style={{
//           background: '#FFF8E6', border: '1px solid #F0DFA8', borderRadius: 8,
//           padding: '12px 16px', marginBottom: 22, fontSize: 13, maxWidth: 640,
//         }}>
//           Looking to edit each ingredient's photo, name, or the longer description shown
//           in its popup? That's in a different section —{' '}
//           <button
//             type="button"
//             onClick={() => onNavigate?.('Ingredients')}
//             style={{
//               background: 'none', border: 'none', padding: 0, color: 'var(--olive)',
//               fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', fontSize: 13,
//             }}
//           >
//             Ingredient Cards &amp; Descriptions
//           </button>.
//         </div>
//       )}

//       <form onSubmit={handleSave} style={{ maxWidth: 640 }}>
//         {groupFields.map((f) => (
//           <div key={f.key} style={{ marginBottom: 18 }}>
//             <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
//               {f.label}
//             </label>
//             {f.type === 'repeater' ? (
//               <RepeaterField
//                 field={f}
//                 value={values[f.key]}
//                 onChange={(next) => handleChange(f.key, next)}
//                 imageList={imageList}
//                 onNewImage={(p) => setImageList((list) => [...new Set([...list, p])])}
//               />
//             ) : f.type === 'image' ? (
//               <ImageField
//                 id={f.key}
//                 value={values[f.key]}
//                 onChange={(val) => handleChange(f.key, val)}
//                 imageList={imageList}
//                 onUploaded={(p) => setImageList((list) => [...new Set([...list, p])])}
//               />
//             ) : f.type === 'textarea' ? (
//               <textarea
//                 value={values[f.key] || ''}
//                 onChange={(e) => handleChange(f.key, e.target.value)}
//                 rows={3}
//                 style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid var(--line)', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box' }}
//               />
//             ) : (
//               <input
//                 type={f.type}
//                 value={values[f.key] || ''}
//                 onChange={(e) => handleChange(f.key, e.target.value)}
//                 style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid var(--line)', fontSize: 14, boxSizing: 'border-box' }}
//               />
//             )}
//             {f.hint && <div style={{ fontSize: 11.5, color: 'var(--ink-soft)', marginTop: 4 }}>{f.hint}</div>}
//           </div>
//         ))}

//         <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8 }}>
//           <button type="submit" disabled={saving} className="btn btn-primary">
//             {saving ? 'Saving...' : 'Save Changes'}
//           </button>
//           {saved && <span style={{ color: 'var(--olive-mid)', fontSize: 13, fontWeight: 600 }}>Saved ✓</span>}
//         </div>
//       </form>
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import adminClient from '../api/adminClient';
import { useSiteSettingsRefresh } from '../../../shared/hooks/SiteSettingsContext.jsx';
import ImageField from './ImageField';

function RepeaterField({ field, value, onChange, imageList, onNewImage }) {
  const items = Array.isArray(value) ? value : [];

  function updateItem(idx, key, val) {
    const next = items.map((it, i) => (i === idx ? { ...it, [key]: val } : it));
    onChange(next);
  }

  function removeItem(idx) {
    onChange(items.filter((_, i) => i !== idx));
  }

  function addItem() {
    const blank = {};
    field.itemFields.forEach((f) => { blank[f.key] = ''; });
    onChange([...items, blank]);
  }

  return (
    <div>
      {items.map((item, idx) => (
        <div key={idx} style={{
          border: '1px solid var(--line)', borderRadius: 8, padding: 14, marginBottom: 10,
          background: 'var(--cream)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)' }}>#{idx + 1}</span>
            <button type="button" onClick={() => removeItem(idx)} style={{
              fontSize: 11.5, fontWeight: 600, color: '#B3261E', background: 'none',
              border: 'none', cursor: 'pointer',
            }}>Remove</button>
          </div>
          {field.itemFields.map((sf) => (
            <div key={sf.key} style={{ marginBottom: 8 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{sf.label}</label>
              {sf.type === 'image' ? (
                <ImageField
                  id={`${field.key}-${idx}-${sf.key}`}
                  value={item[sf.key]}
                  onChange={(val) => updateItem(idx, sf.key, val)}
                  imageList={imageList}
                  onUploaded={onNewImage}
                />
              ) : sf.type === 'textarea' ? (
                <textarea
                  value={item[sf.key] ?? ''}
                  onChange={(e) => updateItem(idx, sf.key, e.target.value)}
                  rows={2}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 5, border: '1px solid var(--line)', fontSize: 13.5, fontFamily: 'inherit', boxSizing: 'border-box' }}
                />
              ) : (
                <input
                  type={sf.type === 'number' ? 'number' : 'text'}
                  step={sf.type === 'number' ? '0.5' : undefined}
                  value={item[sf.key] ?? ''}
                  onChange={(e) => updateItem(idx, sf.key, sf.type === 'number' ? Number(e.target.value) : e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 5, border: '1px solid var(--line)', fontSize: 13.5, boxSizing: 'border-box' }}
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <button type="button" onClick={addItem} className="btn btn-outline" style={{ fontSize: 12.5, padding: '8px 16px' }}>
        + Add {field.label.replace(/s$/, '')}
      </button>
    </div>
  );
}

export default function SettingsPanel({ group, onNavigate }) {
  const [fields, setFields] = useState([]);
  const [values, setValues] = useState({});
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const refreshSiteSettings = useSiteSettingsRefresh();
  const activeGroup = group;

  useEffect(() => {
    Promise.all([
      adminClient.get('/settings'),
      adminClient.get('/images'),
    ]).then(([s, i]) => {
      setFields(s.data.fields);
      setValues(s.data.settings);
      setImageList(i.data.images);
      setLoading(false);
    });
  }, []);

  // Switching sections in the sidebar should drop the "Saved ✓" note from
  // whatever section the admin was on previously.
  useEffect(() => { setSaved(false); }, [activeGroup]);

  function handleChange(key, val) {
    setValues((v) => ({ ...v, [key]: val }));
    setSaved(false);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await adminClient.put('/settings', values);
      setSaved(true);
      refreshSiteSettings();
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p style={{ padding: 24 }}>Loading settings...</p>;

  const groupFields = fields.filter((f) => f.group === activeGroup);

  return (
    <div>
      <h2 style={{ fontSize: 22, marginBottom: 4 }}>{activeGroup}</h2>
      <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 24 }}>
        Editing settings for this section only. Pick another section from the sidebar to switch.
      </p>

      {activeGroup === 'Best Sellers' && (
        <div style={{
          background: '#FFF8E6', border: '1px solid #F0DFA8', borderRadius: 8,
          padding: '12px 16px', marginBottom: 22, fontSize: 13, maxWidth: 640,
        }}>
          This only edits the section heading. To change which products show here,
          replace their photo, or add/remove a product from Best Sellers, go to{' '}
          <button
            type="button"
            onClick={() => onNavigate?.('products')}
            style={{
              background: 'none', border: 'none', padding: 0, color: 'var(--olive)',
              fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', fontSize: 13,
            }}
          >
            Products Manager
          </button>{' '}
          — edit a product, upload a new photo, and check/uncheck &quot;Show in Best Sellers&quot;.
        </div>
      )}

      {activeGroup === 'Ingredients Page' && (
        <div style={{
          background: '#FFF8E6', border: '1px solid #F0DFA8', borderRadius: 8,
          padding: '12px 16px', marginBottom: 22, fontSize: 13, maxWidth: 640,
        }}>
          Looking to edit each ingredient's photo, name, or the longer description shown
          in its popup? That's in a different section —{' '}
          <button
            type="button"
            onClick={() => onNavigate?.('Ingredients')}
            style={{
              background: 'none', border: 'none', padding: 0, color: 'var(--olive)',
              fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', fontSize: 13,
            }}
          >
            Ingredient Cards &amp; Descriptions
          </button>.
        </div>
      )}

      <form onSubmit={handleSave} style={{ maxWidth: 640 }}>
        {groupFields.map((f) => (
          <div key={f.key} style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
              {f.label}
            </label>
            {f.type === 'repeater' ? (
              <RepeaterField
                field={f}
                value={values[f.key]}
                onChange={(next) => handleChange(f.key, next)}
                imageList={imageList}
                onNewImage={(p) => setImageList((list) => [...new Set([...list, p])])}
              />
            ) : f.type === 'image' ? (
              <ImageField
                id={f.key}
                value={values[f.key]}
                onChange={(val) => handleChange(f.key, val)}
                imageList={imageList}
                onUploaded={(p) => setImageList((list) => [...new Set([...list, p])])}
              />
            ) : f.type === 'textarea' ? (
              <textarea
                value={values[f.key] || ''}
                onChange={(e) => handleChange(f.key, e.target.value)}
                rows={3}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid var(--line)', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box' }}
              />
            ) : (
              <input
                type={f.type}
                value={values[f.key] || ''}
                onChange={(e) => handleChange(f.key, e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid var(--line)', fontSize: 14, boxSizing: 'border-box' }}
              />
            )}
            {f.hint && <div style={{ fontSize: 11.5, color: 'var(--ink-soft)', marginTop: 4 }}>{f.hint}</div>}
          </div>
        ))}

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8 }}>
          <button type="submit" disabled={saving} className="btn btn-primary">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          {saved && <span style={{ color: 'var(--olive-mid)', fontSize: 13, fontWeight: 600 }}>Saved ✓</span>}
        </div>
      </form>
    </div>
  );
}
