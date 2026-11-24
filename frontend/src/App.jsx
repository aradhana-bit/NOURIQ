
import { useState } from 'react';
import { LayoutDashboard, Users, Utensils, ClipboardCheck, CookingPot, Trash2, Package, Truck, ShoppingCart, ChartNoAxesCombined, FileText, Settings, Search, Bell, ChevronDown, ArrowUpRight, ArrowDownRight, Leaf, Menu, X } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';
import Students from './Students.jsx';
import Operations from './Operations.jsx';

const nav = [
  ['Overview',LayoutDashboard],['Students',Users],['Menu management',Utensils],['Attendance',ClipboardCheck],['Food preparation',CookingPot],['Waste tracking',Trash2],['Inventory',Package],['Suppliers',Truck],['Purchases',ShoppingCart],['Analytics',ChartNoAxesCombined],['Reports',FileText],['Settings',Settings]
];
const weekly = [{day:'Mon',prepared:420,consumed:365,waste:55},{day:'Tue',prepared:460,consumed:410,waste:50},{day:'Wed',prepared:390,consumed:344,waste:46},{day:'Thu',prepared:510,consumed:452,waste:58},{day:'Fri',prepared:480,consumed:429,waste:51},{day:'Sat',prepared:330,consumed:295,waste:35},{day:'Sun',prepared:280,consumed:251,waste:29}];
const dishes = [{name:'Vegetable pulao',waste:18},{name:'Dal makhani',waste:14},{name:'Paneer curry',waste:12},{name:'Idli sambar',waste:9},{name:'Veg sandwich',waste:7}];
const stock = [{name:'Basmati rice',qty:'8 kg',status:'Low stock'},{name:'Cooking oil',qty:'24 L',status:'Healthy'},{name:'Potatoes',qty:'12 kg',status:'Healthy'},{name:'Paneer',qty:'3 kg',status:'Low stock'}];

function App(){
 const [active,setActive]=useState('Overview');
 const [mobile,setMobile]=useState(false);
 const [search,setSearch]=useState('');
 const isOverview=active==='Overview';

 return <div className="shell">
  <aside className={`sidebar ${mobile?'show':''}`}>
   <div className="brand">
    <div className="brand-icon"><Leaf size={21}/></div>
    <div><b>CanteenIQ</b><small>FOOD • DATA • IMPACT</small></div>
    <button className="close" onClick={()=>setMobile(false)}><X/></button>
   </div>
   <div className="workspace-label">WORKSPACE</div>
   <nav>
    {nav.map(([label,Icon])=><button key={label} className={`nav-item ${active===label?'selected':''}`} onClick={()=>{setActive(label);setMobile(false)}}>
     <Icon size={18}/><span>{label}</span>{label==='Waste tracking'&&<i className="nav-dot"/>}
    </button>)}
   </nav>
   <div className="sidebar-bottom">
    
    <div className="profile">
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
      <input placeholder="Search anything..." value={search} onChange={e=>setSearch(e.target.value)}/>
      <kbd>⌘ K</kbd>
     </label>
     <button className="icon-btn"><Bell size={18}/><i/></button>
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
     <button className="date-btn">↗ &nbsp; Today, 23 Nov 2026</button>
    </div>

    {isOverview?<>
     <section className="metrics">
      <Metric title="Meals prepared" value="1,248" change="+8.2%" up/>
      <Metric title="Meals consumed" value="1,096" change="+5.4%" up/>
      <Metric title="Food waste" value="152 kg" change="-12.8%" up/>
      <Metric title="Waste percentage" value="12.2%" change="-2.1%" up/>
     </section>
     <section className="grid-main">
      <div className="panel chart-panel">
       <div className="panel-head">
        <div><h3>Food demand overview</h3><p>Prepared vs consumed meals this week</p></div>
        <select><option>This week</option><option>This month</option></select>
       </div>
       <div className="legend"><span><i className="green-dot"/> Prepared</span><span><i className="blue-dot"/> Consumed</span></div>
       <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
         <AreaChart data={weekly}>
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
        <button className="dots">···</button>
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
        <button className="dots">···</button>
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
