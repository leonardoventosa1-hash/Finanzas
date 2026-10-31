import { useEffect, useMemo, useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, ChartNoAxesCombined, House, Plus, Wallet, X, Download, Upload, Trash2 } from 'lucide-react';

type Kind = 'income' | 'expense';
type Entry = { id: string; kind: Kind; amount: number; description: string; occurred_on: string };
const STORAGE_KEY = 'finanzas:personal:v1';
const money = (amount: number) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount);
const localDate = () => { const d = new Date(); return [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-') };
function isEntry(v: unknown): v is Entry {
 if (!v || typeof v !== 'object') return false;
 const t = v as Record<string, unknown>;
 return typeof t.id === 'string' && (t.kind === 'income'||t.kind === 'expense') && typeof t.amount === 'number' && Number.isFinite(t.amount) && t.amount > 0 && typeof t.description === 'string' && t.description.trim().length > 0 && t.description.length <= 120 && typeof t.occurred_on === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(t.occurred_on) && !Number.isNaN(Date.parse(t.occurred_on+'T12:00:00'));
}
function readEntries(): Entry[] { try { const s = localStorage.getItem(STORAGE_KEY); if (!s) return []; const data: unknown = JSON.parse(s); return Array.isArray(data) ? data.filter(isEntry) : []; } catch { return []; } }
export default function App() {
 const [entries, setEntries] = useState<Entry[]>(readEntries);
 const [month, setMonth] = useState(localDate().slice(0,7));
 const [showForm, setShowForm] = useState(false);
 const [kind, setKind] = useState<Kind>('expense');
 const [amount, setAmount] = useState('');
 const [description, setDescription] = useState('');
 const [date, setDate] = useState(localDate());
 const [error, setError] = useState('');
 const [notice, setNotice] = useState('');
 useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(entries)); } catch { setError('No se pudieron guardar los datos. Exportá una copia de seguridad.'); } }, [entries]);
 const current = useMemo(() => entries.filter(e=>e.occurred_on.startsWith(month)).sort((a,b)=>b.occurred_on.localeCompare(a.occurred_on)),[entries,month]);
 const income = current.filter(e=>e.kind==='income').reduce((s,e)=>s+e.amount,0);
 const expenses = current.filter(e=>e.kind==='expense').reduce((s,e)=>s+e.amount,0);
 function add(e: React.FormEvent) {
  e.preventDefault(); const n=Number(amount);
  if(!Number.isFinite(n)||n<=0||n>999999999999||!description.trim()||!date){setError('Completá una descripción, una fecha y un importe válido.');return;}
  const entry: Entry = {id:crypto.randomUUID(),kind,amount:Math.round(n*100)/100,description:description.trim(),occurred_on:date};
  setEntries(prev=>[entry,...prev]);setMonth(date.slice(0,7));setDescription('');setAmount('');setShowForm(false);setError('');setNotice('Movimiento guardado en este dispositivo.');
 }
 function remove(id: string){if(confirm('¿Eliminar este movimiento?'))setEntries(prev=>prev.filter(e=>e.id!==id))}
 function backup(){
  const blob=new Blob([JSON.stringify({app:'Finanzas',version:1,exportedAt:new Date().toISOString(),entries},null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='finanzas-respaldo-'+localDate()+'.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);setNotice('Guardá el archivo en un lugar seguro, como Archivos de tu iPhone.');
 }
 async function restore(e: React.ChangeEvent<HTMLInputElement>){
  const file=e.target.files?.[0];e.target.value='';if(!file)return;
  if(file.size>5_000_000){setError('El archivo es demasiado grande.');return;}
  try {
   const raw: unknown=JSON.parse(await file.text());
   if(!raw||typeof raw!=='object'){throw Error('Formato incorrecto')}
   const obj=raw as Record<string,unknown>;
   if(obj.app!=='Finanzas'||obj.version!==1||!Array.isArray(obj.entries)||!obj.entries.every(isEntry)){throw Error('Respaldo inválido')}
   const imported=obj.entries as Entry[];
   if(!confirm('¿Reemplazar todos los movimientos actuales por los '+imported.length+' del respaldo?'))return;
   setEntries(imported);setError('');setNotice('Respaldo importado correctamente.');
  } catch {setError('No se pudo importar el respaldo. Verificá que sea un archivo de Finanzas válido.');}
 }
 return <main className="page"><div className="shell"><header><div className="logo"><Wallet/> Finanzas</div><span className="pill">Uso personal</span></header>
 <div className="hero"><div><div className="eyebrow">TU ESPACIO PERSONAL</div><h1>Mis finanzas</h1><p>Tu dinero, en orden y a tu ritmo.</p></div><div className="month"><label htmlFor="month">Período</label><input id="month" type="month" value={month} onChange={e=>setMonth(e.target.value)}/></div></div>
 <section className="cards"><div className="card balance"><span>Balance del mes</span><strong>{money(income-expenses)}</strong><small>Ingresos menos gastos</small></div><div className="card metric"><div className="metric-title"><ArrowDownLeft/> Ingresos</div><strong>{money(income)}</strong></div><div className="card metric"><div className="metric-title"><ArrowUpRight/> Gastos</div><strong>{money(expenses)}</strong></div></section>
 <section className="movements card"><div className="section-head"><div><div className="eyebrow">ACTIVIDAD</div><h2>Mis movimientos</h2></div><button className="primary" onClick={()=>{setError('');setShowForm(true)}}><Plus size={18}/> Agregar</button></div>
 {current.length===0?<div className="empty"><ChartNoAxesCombined size={38}/><h3>Sin movimientos este mes</h3><p>Agregá un ingreso o gasto para empezar.</p></div>:<div className="entries">{current.map(t=><div className="entry" key={t.id}><span className={t.kind==='income'?'entry-icon positive':'entry-icon negative'}>{t.kind==='income'?<ArrowDownLeft/>:<ArrowUpRight/>}</span><div className="entry-text"><b>{t.description}</b><small>{new Date(t.occurred_on+'T12:00:00').toLocaleDateString('es-AR')}</small></div><strong className={t.kind==='income'?'positive-text':''}>{t.kind==='income'?'+':'−'} {money(t.amount)}</strong><button className="delete" aria-label={'Eliminar '+t.description} onClick={()=>remove(t.id)}><Trash2 size={16}/></button></div>)}</div>}</section>
 <section className="movements card"><h2>Mis datos</h2><p>Los movimientos se guardan únicamente en este navegador. No se sincronizan con otros dispositivos ni se almacenan en GitHub.</p><div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:15}}><button className="primary" onClick={backup}><Download size={16}/> Exportar respaldo</button><label className="primary" style={{cursor:'pointer',background:'#243650'}}><Upload size={16}/> Importar respaldo<input style={{display:'none'}} type="file" accept=".json,application/json" onChange={restore}/></label></div><p style={{fontSize:13,color:'#7c899e',marginTop:15}}>Importante: borrar los datos del navegador o cambiar de iPhone puede eliminar tus movimientos. Exportá copias regularmente; el archivo contiene información personal.</p></section>
 <nav className="bottom-nav"><span><House size={19}/> Inicio</span><span><Wallet size={19}/> Mis finanzas</span></nav></div>
 {showForm&&<div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setShowForm(false)}}><section className="modal card" role="dialog" aria-modal="true" aria-label="Nuevo movimiento"><div className="section-head"><h2>Nuevo movimiento</h2><button className="ghost" aria-label="Cerrar" onClick={()=>setShowForm(false)}><X/></button></div><form onSubmit={add}><label>Tipo<select value={kind} onChange={e=>setKind(e.target.value as Kind)}><option value="expense">Gasto</option><option value="income">Ingreso</option></select></label><label>Descripción<input required maxLength={120} value={description} onChange={e=>setDescription(e.target.value)} placeholder="Ej. Supermercado"/></label><label>Importe (ARS)<input type="number" min="0.01" step="0.01" required value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0,00"/></label><label>Fecha<input type="date" value={date} onChange={e=>setDate(e.target.value)} required/></label>{error&&<p className="error" role="alert">{error}</p>}<button className="primary full">Guardar movimiento</button></form></section></div>}
 {error&&<div className="toast" role="alert" onClick={()=>setError('')}>{error} <X size={14}/></div>}
 {!error&&notice&&<div className="toast" role="status" onClick={()=>setNotice('')}>{notice} <X size={14}/></div>}</main>;
}
