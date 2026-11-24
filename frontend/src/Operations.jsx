import { useEffect, useMemo, useState } from 'react';
import { Plus, Pencil, Trash2, Search, RefreshCw, X, Download, AlertTriangle, Package, ChartNoAxesCombined, FileText, Settings, Utensils, ClipboardCheck, CookingPot, Truck, ShoppingCart } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
const API = (import.meta.env.VITE_API_URL || 'http://localhost:5050/api').replace(/\/$/, '');
const configs = {
  'Menu management': { key: 'menu-items', title: 'Menu items', icon: Utensils, description: 'Manage dishes, prices and daily availability.', fields: [['item_name','Item name','text',true],['category','Category','text'],['price','Price (₹)','number',true],['menu_id','Menu ID','number'],['is_available','Availability','select',true,[['1','Available'],['0','Unavailable']]]] },
  'Attendance': { key: 'attendance', title: 'Meal attendance', icon: ClipboardCheck, description: 'Record student attendance by meal and date.', fields: [['student_id','Student database ID','number',true],['meal_type','Meal type','select',true,[['breakfast','Breakfast'],['lunch','Lunch'],['snacks','Snacks'],['dinner','Dinner']]],['attendance_date','Date','date',true],['menu_id','Menu ID','number'],['status','Status','select',true,[['present','Present'],['absent','Absent']]]] },
  'Food preparation': { key: 'preparation', title: 'Food preparation', icon: CookingPot, description: 'Track how much food the kitchen prepares.', fields: [['menu_item_id','Menu item ID','number'],['preparation_date','Preparation date','date',true],['quantity_prepared','Quantity prepared','number',true],['quantity_unit','Unit','text'],['prepared_by','Prepared by','text']] },
  'Waste tracking': { key: 'waste', title: 'Food waste entries', icon: AlertTriangle, description: 'Record discarded food, quantities and reasons.', fields: [['menu_item_id','Menu item ID','number'],['waste_date','Waste date','date',true],['quantity','Waste quantity','number',true],['unit','Unit','text'],['reason','Reason','text'],['recorded_by','Recorded by','text']] },
  'Inventory': { key: 'inventory', title: 'Ingredient inventory', icon: Package, description: 'Monitor stock levels and reorder thresholds.', fields: [['ingredient_name','Ingredient name','text',true],['quantity','Current quantity','number',true],['unit','Unit','text',true],['reorder_level','Reorder level','number'],['unit_price','Unit price (₹)','number']] },
  'Suppliers': { key: 'suppliers', title: 'Supplier directory', icon: Truck, description: 'Keep supplier contact information in one place.', fields: [['supplier_name','Supplier name','text',true],['contact_person','Contact person','text'],['email','Email','email'],['phone','Phone','tel'],['address','Address','text'],['status','Status','select',true,[['active','Active'],['inactive','Inactive']]]] },
  'Purchases': { key: 'purchases', title: 'Purchase records', icon: ShoppingCart, description: 'Record purchases and update inventory when completed.', fields: [['ingredient_id','Ingredient database ID','number'],['supplier_name','Supplier name','text'],['quantity','Quantity purchased','number',true],['unit_price','Unit price (₹)','number',true],['total_amount','Total amount (₹)','number',true],['purchase_date','Purchase date','date',true],['status','Status','select',true,[['completed','Completed'],['pending','Pending']]]] }
};
function today(){return new Date().toISOString().slice(0,10)}
function emptyForm(config){return Object.fromEntries(config.fields.map(([key,label,type,required,options])=>[key,type==='date'?today():type==='select'?(options?.[0]?.[0] || ''):'']))}
export default function Operations({ active }) {
  const [token,setToken] = useState(sessionStorage.getItem('canteeniq_token') || '');
  const [user,setUser] = useState(sessionStorage.getItem('canteeniq_user') || '');
  const [email,setEmail] = useState('admin@cafeteria.com');
  const [password,setPassword] = useState('Admin@12345');
  const [rows,setRows] = useState([]);
  const [search,setSearch] = useState('');
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');
  const [notice,setNotice] = useState('');
  const [open,setOpen] = useState(false);
  const [editing,setEditing] = useState(null);
  const [form,setForm] = useState({});
  const [summary,setSummary] = useState(null);
  const [report,setReport] = useState(null);
  const [from,setFrom] = useState(today());
  const [to,setTo] = useState(today());
  const config = configs[active];
  async function request(path,options={}) {
    const response = await fetch(API+path,{...options,headers:{'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{}),...(options.headers||{})}});
    const data = await response.json().catch(()=>({message:'Unexpected server response'}));
    if(!response.ok) throw new Error(data.message || 'Request failed');
    return data;
  }
  async function login(event) {
    event.preventDefault(); setError('');
    try {
      const data = await request('/auth/login',{method:'POST',body:JSON.stringify({email,password})});
      sessionStorage.setItem('canteeniq_token',data.accessToken);
      sessionStorage.setItem('canteeniq_user',data.user?.name || data.user?.email || 'Admin');
      setToken(data.accessToken); setUser(data.user?.name || data.user?.email || 'Admin');
    } catch(error) { setError(error.message); }
  }
  async function load() {
    if(!token || !config) return;
    setLoading(true); setError('');
    try { const data = await request('/'+config.key+'?search='+encodeURIComponent(search)); setRows(data.data || []); }
    catch(error) { setError(error.message); }
    finally { setLoading(false); }
  }
  useEffect(()=>{ if(token && config) load(); },[token,active,search]);
  useEffect(()=>{ if(token && (active==='Analytics'||active==='Reports')) loadInsights(); },[token,active]);
  async function loadInsights(){
    try {
      if(active==='Analytics') setSummary(await request('/analytics/summary'));
      if(active==='Reports') setReport(await request('/analytics/report?from='+from+'&to='+to));
    } catch(error){setError(error.message);}
  }
  function startAdd(){setEditing(null);setForm(emptyForm(config));setOpen(true);setNotice('');}
  function startEdit(row){setEditing(row.id);setForm(Object.fromEntries(config.fields.map(([key])=>[key,row[key]===null||row[key]===undefined?'':String(row[key])])));setOpen(true);setNotice('');}
  async function save(event){
    event.preventDefault();setError('');setNotice('');
    const payload={...form};
    config.fields.forEach(([key,label,type])=>{if(type==='number' && payload[key]!=='' && payload[key]!==null) payload[key]=Number(payload[key]);if(key==='is_available')payload[key]=String(payload[key])==='1'?1:0;});
    if(active==='Purchases' && !payload.total_amount) payload.total_amount=Number(payload.quantity)*Number(payload.unit_price);
    try { await request('/'+config.key+(editing?'/'+editing:''),{method:editing?'PUT':'POST',body:JSON.stringify(payload)});setOpen(false);setNotice(editing?'Record updated successfully.':'Record created successfully.');await load(); }
    catch(error){setError(error.message);}
  }
  async function remove(id){
    if(!window.confirm('Delete this record? This action cannot be undone.'))return;
    try{await request('/'+config.key+'/'+id,{method:'DELETE'});setNotice('Record deleted.');await load();}
    catch(error){setError(error.message);}
  }
  function exportCsv(data,filename){
    if(!data?.length){setNotice('There are no records to export.');return;}
    const keys=Object.keys(data[0]);const csv=[keys.join(','),...data.map(row=>keys.map(key=>'"'+String(row[key]??'').replace(/"/g,'""')+'"').join(','))].join('\n');
    const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));const link=document.createElement('a');link.href=url;link.download=filename;link.click();URL.revokeObjectURL(url);
  }
  if(!token) return <div className="panel ops-login"><h2>Admin sign in</h2><p>Sign in to access cafeteria operations.</p>{error&&<div className="ops-error">{error}</div>}<form onSubmit={login}><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label><button type="submit">Sign in</button></form></div>;
  if(active==='Settings') return <div className="ops-grid"><section className="panel ops-card"><Settings size={24}/><h2>Account settings</h2><p>Signed in as <b>{user}</b>.</p><p>Your access is controlled by the admin account and role permissions.</p><button className="ops-secondary" onClick={()=>{sessionStorage.removeItem('canteeniq_token');sessionStorage.removeItem('canteeniq_user');setToken('');setUser('');}}>Sign out</button></section><section className="panel ops-card"><h2>System connection</h2><p>API endpoint: <code>{API}</code></p><button className="ops-secondary" onClick={async()=>{try{const result=await fetch(API+'/health');if(!result.ok)throw new Error('API unavailable');setNotice('API connection is healthy.');}catch(error){setError(error.message);}}}>Check API connection</button>{notice&&<p className="ops-success">{notice}</p>}{error&&<p className="ops-error">{error}</p>}</section></div>;
  if(active==='Analytics') return <div className="ops-page"><div className="ops-cards"><div className="metric"><span>Active students</span><strong>{summary?.students?.active??'—'}</strong></div><div className="metric"><span>Available menu items</span><strong>{summary?.menu?.total??'—'}</strong></div><div className="metric"><span>Meals present today</span><strong>{summary?.attendance?.present??'—'}</strong></div><div className="metric"><span>Waste recorded (7 days)</span><strong>{summary?.waste??'—'}</strong></div></div><section className="panel ops-card"><div className="ops-title"><div><h2>Waste trend</h2><p>Daily recorded waste over the last seven days.</p></div><ChartNoAxesCombined/></div>{summary?.wasteByDay?.length?<div className="ops-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={summary.wasteByDay}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="date"/><YAxis/><Tooltip/><Area dataKey="quantity" stroke="#31966a" fill="#31966a" fillOpacity={.15}/></AreaChart></ResponsiveContainer></div>:<p className="ops-empty">No waste data is available for this period.</p>}</section><section className="panel ops-card"><h2>Low-stock alerts</h2>{summary?.lowStock?.length?summary.lowStock.map(item=><div className="ops-list-row" key={item.id}><b>{item.ingredient_name}</b><span>{item.quantity} {item.unit} left · reorder at {item.reorder_level}</span></div>):<p className="ops-empty">No low-stock ingredients, or no inventory data yet.</p>}</section></div>;
  if(active==='Reports') return <div className="ops-page"><section className="panel ops-card"><div className="ops-title"><div><h2>Operational report</h2><p>Choose a date range and export the returned database records.</p></div><FileText/></div><div className="ops-filters"><label>From<input type="date" value={from} onChange={e=>setFrom(e.target.value)}/></label><label>To<input type="date" value={to} onChange={e=>setTo(e.target.value)}/></label><button onClick={loadInsights}>Generate report</button></div>{report&&<><div className="ops-cards"><div className="metric"><span>Attendance rows</span><strong>{report.attendance?.length||0}</strong></div><div className="metric"><span>Preparation days</span><strong>{report.preparation?.length||0}</strong></div><div className="metric"><span>Waste rows</span><strong>{report.waste?.length||0}</strong></div><div className="metric"><span>Purchase days</span><strong>{report.purchases?.length||0}</strong></div></div>{[['Attendance',report.attendance],['Preparation',report.preparation],['Waste',report.waste],['Purchases',report.purchases]].map(([label,data])=><div className="ops-report-row" key={label}><b>{label}</b><span>{data?.length||0} records</span><button className="ops-secondary" onClick={()=>exportCsv(data,label.toLowerCase()+'-report.csv')}><Download size={15}/> CSV</button></div>)}</>}</section></div>;
  return <div className="ops-page"><section className="panel ops-card"><div className="ops-title"><div><h2>{config.title}</h2><p>{config.description}</p></div><button onClick={startAdd}><Plus size={16}/> Add record</button></div>{error&&<p className="ops-error">{error}</p>}{notice&&<p className="ops-success">{notice}</p>}<div className="ops-toolbar"><label className="search"><Search size={16}/><input placeholder="Search records..." value={search} onChange={e=>setSearch(e.target.value)}/></label><button className="ops-secondary" onClick={load}><RefreshCw size={15}/> Refresh</button><button className="ops-secondary" onClick={()=>exportCsv(rows,config.key+'.csv')}><Download size={15}/> Export CSV</button></div>{loading?<p className="ops-empty">Loading records...</p>:<div className="ops-table-wrap"><table className="ops-table"><thead><tr><th>ID</th>{config.fields.map(([key,label])=><th key={key}>{label}</th>)}<th>Actions</th></tr></thead><tbody>{rows.map(row=><tr key={row.id}><td>{row.id}</td>{config.fields.map(([key,label,type])=><td key={key}>{key==='is_available'?(Number(row[key])?'Available':'Unavailable'):String(row[key]??'—')}</td>)}<td><div className="ops-actions"><button aria-label="Edit record" onClick={()=>startEdit(row)}><Pencil size={15}/></button><button aria-label="Delete record" onClick={()=>remove(row.id)}><Trash2 size={15}/></button></div></td></tr>)}{!rows.length&&<tr><td colSpan={config.fields.length+2} className="ops-empty">No records found. Add your first record to get started.</td></tr>}</tbody></table></div>}</section>{open&&<div className="ops-modal-backdrop"><form className="panel ops-modal" onSubmit={save}><div className="ops-title"><h2>{editing?'Edit':'Add'} {config.title}</h2><button type="button" className="ops-icon" onClick={()=>setOpen(false)}><X size={18}/></button></div>{config.fields.map(([key,label,type,required,options])=><label key={key}>{label}{type==='select'?<select value={form[key]??''} required={!!required} onChange={e=>setForm({...form,[key]:e.target.value})}>{options.map(([value,text])=><option value={value} key={value}>{text}</option>)}</select>:<input type={type} min={type==='number'?0:undefined} step={type==='number'?'any':undefined} value={form[key]??''} required={!!required} onChange={e=>setForm({...form,[key]:e.target.value})}/>}</label>)}{error&&<p className="ops-error">{error}</p>}<button type="submit">{editing?'Save changes':'Create record'}</button></form></div>}</div>;
}
