import { useEffect, useState } from 'react'
import { Link, Routes, Route, useNavigate, NavLink } from 'react-router-dom'
import { LayoutDashboard, Wrench, MessageSquare, Images, LogOut, Home, Menu, X, Plus, Pencil, Trash2, Search, CheckCircle2, AlertCircle, LoaderCircle } from 'lucide-react'
import { apiRequest } from '../../lib/api'

const navItems = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/services', label: 'Services', icon: Wrench },
  { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
  { to: '/admin/gallery', label: 'Gallery', icon: Images },
  { to: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare },
]
const blank = { services: { title:'', description:'', icon:'House', number:'', tag:'Home care', active:true, sortOrder:0 }, testimonials: { name:'', text:'', rating:5, active:true, sortOrder:0 }, gallery: { title:'', imageUrl:'', active:true, sortOrder:0 } }

function Notice({ error, children }) {
  if (!children) return null
  return <div className={`mb-4 flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${error ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-800'}`}>{error ? <AlertCircle size={17}/> : <CheckCircle2 size={17}/>} {children}</div>
}
function Login({ onLogin }) {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [busy,setBusy] = useState(false)
  const [error,setError] = useState('')
  async function submit(e) {
    e.preventDefault(); setBusy(true); setError('')
    try { const data = await apiRequest('/auth/login',{method:'POST',body:JSON.stringify({email,password})}); localStorage.setItem('hh_admin_token',data.token); onLogin(data.admin) }
    catch(err) { setError(err.message) } finally { setBusy(false) }
  }
  return <div className="grid min-h-screen place-items-center bg-[#f2f4ef] p-5"><form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl md:p-10">
    <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#174b3b]"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#174b3b] text-lg text-[#c7e36a]">h.</span> Home Hancer</Link>
    <p className="mt-8 text-xs font-extrabold uppercase tracking-[.2em] text-[#6e806f]">Content management</p><h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-[#172c25]">Welcome back.</h1><p className="mt-2 text-sm text-slate-500">Sign in to manage your website.</p>
    <Notice error>{error}</Notice>
    <label className="mt-7 block text-xs font-bold text-slate-600">Admin email<input required type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-700"/></label>
    <label className="mt-4 block text-xs font-bold text-slate-600">Password<input required type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-700"/></label>
    <button disabled={busy} className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#174b3b] px-5 py-3.5 text-sm font-bold text-white disabled:opacity-60">{busy && <LoaderCircle className="animate-spin" size={17}/>} Sign in</button>
    <Link to="/" className="mt-5 block text-center text-xs font-semibold text-slate-500 hover:text-emerald-800">← Back to website</Link>
  </form></div>
}
function Shell({ admin, onLogout, children }) {
  const [mobile,setMobile] = useState(false)
  return <div className="min-h-screen bg-[#f5f6f2] text-[#172c25] md:flex">
    <aside className={`${mobile?'fixed inset-0 z-50':'hidden'} w-[270px] shrink-0 border-r border-slate-200 bg-white p-6 md:sticky md:top-0 md:flex md:h-screen md:flex-col`}>
      <div className="flex items-center justify-between"><Link to="/" className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#174b3b] font-heading text-xl font-extrabold text-[#c7e36a]">h.</span><span className="font-heading text-lg font-extrabold tracking-tight">home hancer</span></Link><button className="md:hidden" onClick={()=>setMobile(false)}><X/></button></div>
      <p className="mb-3 mt-10 text-[10px] font-extrabold uppercase tracking-[.2em] text-slate-400">Workspace</p>
      <nav className="space-y-1">{navItems.map(({to,label,icon:Icon,end})=><NavLink key={to} to={to} end={end} onClick={()=>setMobile(false)} className={({isActive})=>`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive?'bg-[#e9eee6] text-[#174b3b]':'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}><Icon size={18}/>{label}</NavLink>)}</nav>
      <div className="mt-auto rounded-2xl bg-[#f2f5ef] p-4"><p className="text-xs font-bold">{admin?.name || 'Administrator'}</p><p className="mt-1 truncate text-[10px] text-slate-500">{admin?.email}</p><button onClick={onLogout} className="mt-4 flex items-center gap-2 text-xs font-bold text-red-600"><LogOut size={15}/> Sign out</button></div>
    </aside>
    <div className="min-w-0 flex-1"><header className="sticky top-0 z-20 flex h-[70px] items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur md:px-9"><button onClick={()=>setMobile(true)} className="md:hidden"><Menu/></button><span className="text-xs font-semibold text-slate-500">Home Hancer / Admin CMS</span><Link to="/" target="_blank" className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-bold"><Home size={14}/> View website</Link></header><main className="mx-auto max-w-6xl p-5 md:p-9">{children}</main></div>
  </div>
}
function Dashboard() {
  const [data,setData]=useState(null); const [error,setError]=useState('')
  useEffect(()=>{apiRequest('/admin/dashboard').then(setData).catch(e=>setError(e.message))},[])
  const cards=[['Services',data?.stats.services,Wrench],['Testimonials',data?.stats.testimonials,MessageSquare],['Gallery items',data?.stats.gallery,Images],['Total enquiries',data?.stats.totalEnquiries,MessageSquare],['New enquiries',data?.stats.newEnquiries,AlertCircle]]
  return <><PageTitle title="Overview" subtitle="A snapshot of your website content and incoming leads."/><Notice error>{error}</Notice>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{cards.map(([label,value,Icon])=><div key={label} className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex items-center justify-between"><p className="text-sm font-semibold text-slate-500">{label}</p><Icon size={19} className="text-emerald-800"/></div><p className="mt-4 font-heading text-4xl font-extrabold">{value ?? '—'}</p></div>)}</div>
    <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-6"><h2 className="font-heading text-lg font-extrabold">Latest enquiries</h2>{data?.recent?.length ? <div className="mt-4 divide-y divide-slate-100">{data.recent.map(item=><div key={item._id} className="flex flex-wrap items-center justify-between gap-3 py-3"><div><p className="text-sm font-bold">{item.name}</p><p className="mt-1 text-xs text-slate-500">{item.service} · {new Date(item.createdAt).toLocaleString()}</p></div><span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold capitalize text-emerald-800">{item.status}</span></div>)}</div>:<p className="mt-4 text-sm text-slate-500">No enquiries yet.</p>}</section>
  </>
}
function PageTitle({title,subtitle,action}) { return <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-emerald-800">Content manager</p><h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight">{title}</h1><p className="mt-2 text-sm text-slate-500">{subtitle}</p></div>{action}</div> }

function ContentManager({ type, title, subtitle, fields }) {
  const [items,setItems]=useState([]), [editing,setEditing]=useState(null), [form,setForm]=useState(blank[type]), [error,setError]=useState(''), [message,setMessage]=useState(''), [busy,setBusy]=useState(false)
  const load=()=>apiRequest(`/admin/${type}`).then(d=>setItems(d.items)).catch(e=>setError(e.message))
  useEffect(()=>{load()},[type])
  function startEdit(item=null){setEditing(item?._id||'new');setForm(item?{...item}:blank[type]);setError('');setMessage('')}
  async function save(e){e.preventDefault();setBusy(true);setError('');try{const method=editing==='new'?'POST':'PUT';const path=editing==='new'?`/admin/${type}`:`/admin/${type}/${editing}`;await apiRequest(path,{method,body:JSON.stringify(form)});setEditing(null);setMessage('Changes saved successfully.');await load()}catch(err){setError(err.message)}finally{setBusy(false)}}
  async function remove(item){if(!confirm(`Delete "${item.title||item.name}"? This cannot be undone.`))return;try{await apiRequest(`/admin/${type}/${item._id}`,{method:'DELETE'});setMessage('Item deleted.');load()}catch(e){setError(e.message)}}
  async function toggle(item){try{await apiRequest(`/admin/${type}/${item._id}`,{method:'PUT',body:JSON.stringify({active:!item.active})});load()}catch(e){setError(e.message)}}
  return <>
    <PageTitle title={title} subtitle={subtitle} action={<button onClick={()=>startEdit()} className="inline-flex items-center gap-2 rounded-full bg-[#174b3b] px-5 py-3 text-xs font-bold text-white"><Plus size={16}/> Add new</button>}/>
    <Notice error>{error}</Notice><Notice>{message}</Notice>
    {editing!==null && <form onSubmit={save} className="mb-7 rounded-2xl border border-emerald-200 bg-white p-6"><div className="mb-5 flex items-center justify-between"><h2 className="font-heading text-lg font-extrabold">{editing==='new'?'Create item':'Edit item'}</h2><button type="button" onClick={()=>setEditing(null)} className="text-xs font-bold text-slate-500">Cancel</button></div>
      <div className="grid gap-4 sm:grid-cols-2">{fields.map(field=><label key={field.key} className={`text-xs font-bold text-slate-600 ${field.full?'sm:col-span-2':''}`}>{field.label}
        {field.type==='textarea'?<textarea required={field.required!==false} rows="3" maxLength={field.max||1000} value={form[field.key]??''} onChange={e=>setForm({...form,[field.key]:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal outline-none focus:border-emerald-700"/>:
        field.type==='checkbox'?<input type="checkbox" checked={!!form[field.key]} onChange={e=>setForm({...form,[field.key]:e.target.checked})} className="ml-3 mt-2 h-4 w-4 accent-emerald-800"/>:
        <input required={field.required!==false} type={field.type||'text'} min={field.min} max={field.max} value={form[field.key]??''} onChange={e=>setForm({...form,[field.key]:field.type==='number'?Number(e.target.value):e.target.value})} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal outline-none focus:border-emerald-700"/>}
      </label>)}</div>
      <button disabled={busy} className="mt-5 rounded-full bg-[#174b3b] px-6 py-3 text-xs font-bold text-white disabled:opacity-50">{busy?'Saving…':'Save changes'}</button>
    </form>}
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="divide-y divide-slate-100">{items.map(item=><div key={item._id} className="flex flex-wrap items-center gap-4 p-4 sm:px-6">{type==='gallery'&&<img src={item.imageUrl} alt="" className="h-14 w-16 rounded-lg object-cover"/>}<div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{item.title||item.name}</p><p className="mt-1 line-clamp-2 text-xs text-slate-500">{item.description||item.text||item.imageUrl}</p></div><button onClick={()=>toggle(item)} className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${item.active?'bg-emerald-50 text-emerald-800':'bg-slate-100 text-slate-500'}`}>{item.active?'Published':'Hidden'}</button><button onClick={()=>startEdit(item)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Edit"><Pencil size={16}/></button><button onClick={()=>remove(item)} className="rounded-lg p-2 text-red-500 hover:bg-red-50" aria-label="Delete"><Trash2 size={16}/></button></div>)}{!items.length&&<p className="p-8 text-center text-sm text-slate-500">No content yet. Use Add new to create your first item.</p>}</div></div>
  </>
}
const serviceFields=[{key:'title',label:'Service title'},{key:'description',label:'Description',type:'textarea',full:true},{key:'icon',label:'Icon name (Wrench, Zap, Paintbrush, Hammer, Snowflake, Bath, House)'},{key:'number',label:'Display number'},{key:'tag',label:'Small label'},{key:'sortOrder',label:'Sort order',type:'number',min:0},{key:'active',label:'Visible on website',type:'checkbox'}]
const testimonialFields=[{key:'name',label:'Customer name'},{key:'rating',label:'Rating (1–5)',type:'number',min:1,max:5},{key:'text',label:'Review text',type:'textarea',full:true},{key:'sortOrder',label:'Sort order',type:'number',min:0},{key:'active',label:'Visible on website',type:'checkbox'}]
const galleryFields=[{key:'title',label:'Image caption'},{key:'imageUrl',label:'Image URL',type:'url',full:true},{key:'sortOrder',label:'Sort order',type:'number',min:0},{key:'active',label:'Visible on website',type:'checkbox'}]
function Enquiries() {
  const [items,setItems]=useState([]),[status,setStatus]=useState('all'),[q,setQ]=useState(''),[error,setError]=useState('')
  async function load(){try{const params=new URLSearchParams();if(status!=='all')params.set('status',status);if(q)params.set('q',q);const d=await apiRequest(`/enquiries?${params}`);setItems(d.enquiries)}catch(e){setError(e.message)}}
  useEffect(()=>{load()},[status])
  async function update(id,next){try{await apiRequest(`/enquiries/${id}`,{method:'PATCH',body:JSON.stringify({status:next})});load()}catch(e){setError(e.message)}}
  return <><PageTitle title="Enquiries" subtitle="Review incoming customer requests and track their progress."/><Notice error>{error}</Notice>
    <div className="mb-4 flex flex-wrap gap-3"><div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3"><Search size={16} className="text-slate-400"/><input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==='Enter'&&load()} placeholder="Search name, phone or service" className="w-full py-3 text-sm outline-none"/></div><select value={status} onChange={e=>setStatus(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 text-sm"><option value="all">All statuses</option>{['new','contacted','in-progress','completed','archived'].map(s=><option key={s} value={s}>{s}</option>)}</select><button onClick={load} className="rounded-xl bg-[#174b3b] px-5 text-xs font-bold text-white">Search</button></div>
    <div className="space-y-3">{items.map(item=><article key={item._id} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-bold">{item.name}</h3><p className="mt-1 text-xs text-slate-500">{item.phone} · {item.service}</p></div><span className="text-[10px] text-slate-400">{new Date(item.createdAt).toLocaleString()}</span></div><p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-600">{item.message}</p><div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4"><a href={`tel:${item.phone}`} className="text-xs font-bold text-emerald-800">Call customer ↗</a><select value={item.status} onChange={e=>update(item._id,e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold capitalize">{['new','contacted','in-progress','completed','archived'].map(s=><option key={s} value={s}>{s}</option>)}</select></div></article>)}{!items.length&&<div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">No enquiries found.</div>}</div>
  </>
}
export default function Admin() {
  const [admin,setAdmin]=useState(null),[checking,setChecking]=useState(true)
  const navigate=useNavigate()
  useEffect(()=>{const token=localStorage.getItem('hh_admin_token');if(!token){setChecking(false);return}apiRequest('/auth/me').then(d=>setAdmin(d.admin)).catch(()=>localStorage.removeItem('hh_admin_token')).finally(()=>setChecking(false))},[])
  function logout(){localStorage.removeItem('hh_admin_token');setAdmin(null);navigate('/admin')}
  if(checking)return <div className="grid min-h-screen place-items-center text-sm text-slate-500">Loading admin…</div>
  if(!admin)return <Login onLogin={setAdmin}/>
  return <Shell admin={admin} onLogout={logout}><Routes>
    <Route index element={<Dashboard/>}/>
    <Route path="services" element={<ContentManager type="services" title="Services" subtitle="Create, edit, publish or hide your service cards." fields={serviceFields}/>}/>
    <Route path="testimonials" element={<ContentManager type="testimonials" title="Testimonials" subtitle="Manage customer review content shown on your website." fields={testimonialFields}/>}/>
    <Route path="gallery" element={<ContentManager type="gallery" title="Gallery" subtitle="Manage project photos and captions. Use publicly accessible image URLs." fields={galleryFields}/>}/>
    <Route path="enquiries" element={<Enquiries/>}/>
    <Route path="*" element={<Dashboard/>}/>
  </Routes></Shell>
}
