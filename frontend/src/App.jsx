import { useEffect, useState } from 'react';
import { LayoutDashboard, Users, Utensils, ClipboardCheck, CookingPot, Trash2, Package, Truck, ShoppingCart, ChartNoAxesCombined, FileText, Settings, Search, Bell, ChevronDown, ArrowUpRight, ArrowDownRight, Leaf, Menu, X, Sparkles, AlertTriangle, TrendingUp, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';
import Students from './Students.jsx';
import Operations from './Operations.jsx';

const nav = [
  ['Overview',LayoutDashboard],['Students',Users],['Menu management',Utensils],['Attendance',ClipboardCheck],['Food preparation',CookingPot],['Waste tracking',Trash2],['Inventory',Package],['Suppliers',Truck],['Purchases',ShoppingCart],['Analytics',ChartNoAxesCombined],['Reports',FileText],['Settings',Settings]
];
const weekly = [{day:'Mon',prepared:420,consumed:365,waste:55},{day:'Tue',prepared:460,consumed:410,waste:50},{day:'Wed',prepared:390,consumed:344,waste:46},{day:'Thu',prepared:510,consumed:452,waste:58},{day:'Fri',prepared:480,consumed:429,waste:51},{day:'Sat',prepared:330,consumed:295,waste:35},{day:'Sun',prepared:280,consumed:251,waste:29}];
const lastWeek = [{day:'Mon',prepared:390,consumed:344,waste:46},{day:'Tue',prepared:430,consumed:380,waste:50},{day:'Wed',prepared:410,consumed:365,waste:45},{day:'Thu',prepared:470,consumed:420,waste:50},{day:'Fri',prepared:450,consumed:402,waste:48},{day:'Sat',prepared:310,consumed:280,waste:30},{day:'Sun',prepared:260,consumed:235,waste:25}];
const dishes = [{name:'Vegetable pulao',waste:18},{name:'Dal makhani',waste:14},{name:'Paneer curry',waste:12},{name:'Idli sambar',waste:9},{name:'Veg sandwich',waste:7}];
const stock = [{name:'Basmati rice',qty:'8 kg',status:'Low stock'},{name:'Cooking oil',qty:'24 L',status:'Healthy'},{name:'Potatoes',qty:'12 kg',status:'Healthy'},{name:'Paneer',qty:'3 kg',status:'Low stock'}];

function BrandMark(){
 return <svg viewBox="0 0 40 40" width="25" height="25" fill="none" aria-hidden="true">
  <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2.2"/>
  <circle cx="20" cy="20" r="11" stroke="currentColor" strokeWidth="1.5" opacity=".55"/>
  <path d="M20 26V15m0 5c-5 0-7-3-7-7 4 0 7 2 7 7Zm0-2c0-5 3-8 8-8 0 5-3 8-8 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
 </svg>;
}

function App(){
 const [active,setActive]=useState('Overview');
 const [mobile,setMobile]=useState(false);
 const [search,setSearch]=useState('');
 const [notificationOpen,setNotificationOpen]=useState(false);
 const [chartRange,setChartRange]=useState('this-week');
 const [intelligence,setIntelligence]=useState(null);
 const [intelligenceLoading,setIntelligenceLoading]=useState(true);
 const [intelligenceError,setIntelligenceError]=useState('');
 const api=(import.meta.env.VITE_API_URL || 'http://localhost:5050/api').replace(/\/$/,'');
 useEffect(()=>{
  let cancelled=false;
  async function loadIntelligence(){
   const token=sessionStorage.getItem('canteeniq_token');
   if(!token){setIntelligenceLoading(false);setIntelligenceError('Sign in through an operations module to unlock live insights.');return;}
   try{
    const response=await fetch(api+'/analytics/summary',{headers:{Authorization:'Bearer '+token}});
    const data=await response.json();
    if(!response.ok)throw new Error(data.message||'Could not load live insights');
    if(!cancelled)setIntelligence(data);
   }catch(error){if(!cancelled)setIntelligenceError(error.message);}
   finally{if(!cancelled)setIntelligenceLoading(false);}
  }
  loadIntelligence();
  return ()=>{cancelled=true;};
 },[api]);
 const preparedAverage=Number(intelligence?.prepared||0)/7;
 const wasteTotal=Number(intelligence?.waste||0);
 const wasteRate=Number(intelligence?.prepared)>0?(wasteTotal/Number(intelligence.prepared))*100:0;
 const forecast=Math.round(preparedAverage);
 const stockAlerts=intelligence?.lowStock||[];
 const smartRecommendation=wasteRate>=10?'Waste is above the 10% watch level. Reduce the next batch for dishes with repeated leftovers.':wasteRate>0?'Waste is currently below the 10% watch level. Keep tracking preparation against actual demand.':'Record preparation and waste entries to generate a useful waste-reduction recommendation.';
 const isOverview=active==='Overview';
 const searchResults=search.trim()?nav.filter(([label])=>label.toLowerCase().includes(search.trim().toLowerCase())).slice(0,5):[];

 return <div className="shell">
  <aside className={`sidebar ${mobile?'show':''}`}>
   <div className="brand">
    <div className="brand-icon"><BrandMark/></div>
    <div><b>NOURIQ</b><small>SMART FOOD • LESS WASTE</small></div>
    <button className="close" onClick={()=>setMobile(false)}><X/></button>
   </div>
   <div className="workspace-label">WORKSPACE</div>
   <nav>
    {nav.map(([label,Icon])=><button key={label} className={`nav-item ${active===label?'selected':''}`} onClick={()=>{setActive(label);setMobile(false)}}>
     <Icon size={18}/><span>{label}</span>{label==='Waste tracking'&&<i className="nav-dot"/>}
    </button>)}
   </nav>
   <div className="sidebar-bottom">
    <div className="profile" role="button" tabIndex={0} onClick={()=>setActive('Settings')} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setActive('Settings');}}} style={{cursor:'pointer'}}>
     <div className="avatar">AD</div>
     <div><b>Admin Dashboard</b><small>Manager account</small></div>
     <ChevronDown size={16}/>
    </div>
   </div>
  </aside>
  {mobile&&<div className="scrim" onClick={()=>setMobile(false)}/>}
  <main className="main">
   <header className="topbar">
    <button className="mobile-menu" onClick={()=>setMobile(true)}><Menu/></button>
    <div className="crumb">Workspace <span>/</span> <b>{active}</b></div>
    <div className="top-actions">
     <label className="search">
      <Search size={16}/>
      <input placeholder="Search modules..." value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&searchResults[0]){setActive(searchResults[0][0]);setSearch('');}}}/>
      <kbd>⌘ K</kbd>
     </label>
     {search.trim()&&<div className="global-search-results">{searchResults.length?searchResults.map(([label,Icon])=><button key={label} onClick={()=>{setActive(label);setSearch('');}}><Icon size={15}/>{label}</button>):<span>No matching modules</span>}</div>}
     <div className="notification-wrap"><button className="icon-btn" aria-label="Notifications" onClick={()=>setNotificationOpen(!notificationOpen)}><Bell size={18}/><i/></button>{notificationOpen&&<div className="notification-popover"><b>Notifications</b><p>Review low inventory and recent cafeteria activity.</p><button onClick={()=>{setActive('Inventory');setNotificationOpen(false);}}>Check inventory</button><button onClick={()=>{setActive('Waste tracking');setNotificationOpen(false);}}>Review food waste</button></div>}</div>
     <div className="top-avatar">AD</div>
    </div>
   </header>
   <div className="content">
    <div className="heading-row">
     <div>
      <div className="eyebrow">MONITOR • MANAGE • MINIMIZE WASTE</div>
      <h1>{isOverview?'Good morning, Admin':active}</h1>
      <p>{isOverview?'Here’s what’s happening in your cafeteria today.':'Manage your cafeteria operations and keep everything running smoothly.'}</p>
     </div>
     <button className="date-btn" onClick={()=>setActive('Reports')}>View operational reports ↗</button>
    </div>

    {isOverview?<>
     <section className="metrics">
      <Metric title="Meals prepared" value="1,248" change="+8.2%" up/>
      <Metric title="Meals consumed" value="1,096" change="+5.4%" up/>
      <Metric title="Food waste" value="152 kg" change="-12.8%" up/>
      <Metric title="Waste percentage" value="12.2%" change="-2.1%" up/>
     </section>
     <section className="intelligence-panel panel">
      <div className="intelligence-heading"><div className="intelligence-symbol"><Sparkles size={19}/></div><div><span className="intelligence-kicker">NOURIQ INTELLIGENCE</span><h3>Your cafeteria, understood.</h3><p>Live operational signals with a simple seven-day demand estimate.</p></div><button className="intelligence-refresh" onClick={()=>{setIntelligenceLoading(true);setIntelligenceError('');const token=sessionStorage.getItem('canteeniq_token');if(!token){setIntelligenceLoading(false);setIntelligenceError('Sign in through an operations module to unlock live insights.');return;}fetch(api+'/analytics/summary',{headers:{Authorization:'Bearer '+token}}).then(async r=>{const d=await r.json();if(!r.ok)throw new Error(d.message||'Refresh failed');setIntelligence(d);}).catch(e=>setIntelligenceError(e.message)).finally(()=>setIntelligenceLoading(false));}}><RefreshCw size={15}/> Refresh insights</button></div>
      {intelligenceLoading?<div className="intelligence-empty">Reading your cafeteria data…</div>:<>
       <div className="intelligence-cards">
        <div className="intelligence-card"><span>Estimated daily preparation</span><strong>{intelligence?forecast.toLocaleString('en-IN')+' units':'—'}</strong><small>Based on 7-day preparation average</small></div>
        <div className="intelligence-card"><span>7-day waste rate</span><strong>{intelligence&&Number(intelligence.prepared)>0?wasteRate.toFixed(1)+'%':'—'}</strong><small>{intelligence?String(wasteTotal.toFixed(1))+' waste units from '+Number(intelligence.prepared).toFixed(1)+' prepared':'Waiting for recorded data'}</small></div>
        <div className="intelligence-card"><span>Stock items needing attention</span><strong>{intelligence?stockAlerts.length:'—'}</strong><small>{stockAlerts.length?stockAlerts.slice(0,2).map(item=>item.ingredient_name).join(', '):'No low-stock alerts right now'}</small></div>
       </div>
       <div className="intelligence-advice"><div className="advice-icon">{wasteRate>=10?<AlertTriangle size={17}/>:<TrendingUp size={17}/>}</div><p><b>{wasteRate>=10?'Waste reduction priority':'Operational recommendation'}</b><br/>{smartRecommendation}</p></div>
       {intelligenceError&&<p className="intelligence-note">{intelligenceError}</p>}
      </>}
      <div className="intelligence-disclaimer">Estimates use recorded database data and simple averages; they are not machine-learning predictions.</div>
     </section>
     <section className="grid-main">
      <div className="panel chart-panel">
       <div className="panel-head">
        <div><h3>Food demand overview</h3><p>Prepared vs consumed meals this week</p></div>
        <select value={chartRange} onChange={e=>setChartRange(e.target.value)}><option value="this-week">This week</option><option value="last-week">Last week</option></select>
       </div>
       <div className="legend"><span><i className="green-dot"/> Prepared</span><span><i className="blue-dot"/> Consumed</span></div>
       <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
         <AreaChart data={chartRange==='last-week'?lastWeek:weekly}>
          <defs>
           <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3d9b72" stopOpacity={.22}/>
            <stop offset="95%" stopColor="#3d9b72" stopOpacity={0}/>
           </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf0ed"/>
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill:'#89938d',fontSize:12}}/>
          <YAxis axisLine={false} tickLine={false} tick={{fill:'#89938d',fontSize:12}}/>
          <Tooltip/>
          <Area type="monotone" dataKey="prepared" stroke="#31966a" strokeWidth={2.5} fill="url(#g1)"/>
          <Area type="monotone" dataKey="consumed" stroke="#6b91c9" strokeWidth={2.5} fill="transparent"/>
         </AreaChart>
        </ResponsiveContainer>
       </div>
      </div>
      <div className="panel waste-panel">
       <div className="panel-head">
        <div><h3>Waste by dish</h3><p>Top contributors this week</p></div>
        <button className="text-link" onClick={()=>setActive('Waste tracking')}>View entries ↗</button>
       </div>
       <div className="bar-chart">
        <ResponsiveContainer width="100%" height="100%">
         <BarChart data={dishes} layout="vertical" margin={{left:4,right:12}}>
          <XAxis type="number" hide/>
          <YAxis type="category" dataKey="name" width={112} axisLine={false} tickLine={false} tick={{fill:'#68736c',fontSize:11}}/>
          <Tooltip/>
          <Bar dataKey="waste" fill="#e5a15d" radius={[0,5,5,0]} barSize={13}/>
         </BarChart>
        </ResponsiveContainer>
       </div>
       <div className="insight"><span>✦</span><p><b>Quick insight</b><br/>Vegetable pulao contributes the highest recorded waste. Consider adjusting tomorrow’s batch size.</p></div>
      </div>
     </section>
     <section className="grid-bottom">
      <div className="panel">
       <div className="panel-head">
        <div><h3>Inventory watch</h3><p>Ingredients that need attention</p></div>
        <button className="text-link" onClick={()=>setActive('Inventory')}>View inventory ↗</button>
       </div>
       <div className="stock-list">
        {stock.map(s=><div className="stock-row" key={s.name}>
         <div className="stock-icon"><Package size={17}/></div>
         <b>{s.name}</b><span>{s.qty}</span>
         <em className={s.status==='Low stock'?'warning':'healthy'}>{s.status}</em>
        </div>)}
       </div>
      </div>
      <div className="panel activity">
       <div className="panel-head">
        <div><h3>Today’s activity</h3><p>Latest cafeteria updates</p></div>
        <button className="text-link" onClick={()=>setActive('Reports')}>View report ↗</button>
       </div>
       <div className="activity-item">
        <i className="activity-icon green"><ClipboardCheck size={16}/></i>
        <div><b>Lunch attendance completed</b><small>428 students checked in · 12:42 PM</small></div>
       </div>
       <div className="activity-item">
        <i className="activity-icon orange"><Trash2 size={16}/></i>
        <div><b>Waste entry recorded</b><small>8.5 kg from lunch session · 1:15 PM</small></div>
       </div>
       <div className="activity-item">
        <i className="activity-icon blue"><ShoppingCart size={16}/></i>
        <div><b>Purchase request created</b><small>Rice and paneer restock · 2:05 PM</small></div>
       </div>
      </div>
     </section>
     <div className="footnote">Demo dashboard data · Connect your MySQL database to display live cafeteria records.</div>
    </>:active==='Students'?<Students/>:<Operations active={active}/>}
   </div>
  </main>
 </div>
}

function Metric({title,value,change,up}){
 return <div className="metric">
  <div className="metric-top"><span>{title}</span><span className="metric-mark"><Leaf size={15}/></span></div>
  <strong>{value}</strong>
  <div className="metric-foot"><span className={up?'positive':'negative'}>{up?<ArrowUpRight size={14}/>:<ArrowDownRight size={14}/>} {change}</span><span>vs last week</span></div>
 </div>
}

export default App;