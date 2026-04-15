<<<<<<< HEAD
import { useState } from 'react';
import { Bell, FileText, Network, Search, ShieldAlert } from 'lucide-react';
=======
import { useState, useEffect } from 'react';
>>>>>>> 02022c2b6ec7e05a30b2d70f343f3cc82a783a60
import { Sidebar } from './components/Sidebar';
import { KPICards } from './components/KPICards';
import { TransactionGrid } from './components/TransactionGrid';
import { AlertCenter } from './components/AlertCenter';
import { Investigations } from './components/Investigations';
import { GraphVisualizer } from './components/GraphVisualizer';
import { SettingsModule } from './components/Settings';
import { LogoutConfirm } from './components/LogoutConfirm';
import { Login } from './components/Login';
import { AdminOverview } from './components/AdminOverview';
import { InvestigatorOverview } from './components/InvestigatorOverview';
import { AutomatedReporting, FraudIntelligenceDashboard, PatternAnalytics, RiskManagerOverview } from './components/RiskManagerOverview';
import { UserManagement, MLModelStatus, AuditLogs } from './components/AdminModules';
import { TransactionRisk, FraudTrends } from './components/AnalystModules';
<<<<<<< HEAD

const FraudRingTopology = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div>
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">Fraud Ring Topology</h2>
      <p className="text-slate-500 font-medium">A senior-investigator view of the strongest coordinated clusters, their account states, and export readiness.</p>
    </div>

    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-300">Primary cluster</p>
        <h3 className="mt-3 text-3xl font-black tracking-tight">Merchant cashback laundering mesh</h3>
        <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-slate-300">Nine mule wallets, three beneficiary ladders, and two shared devices form the dominant fraud ring now being prosecuted through CASE-398.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ['Entity count', '44'],
            ['Frozen accounts', '11'],
            ['Evidence-ready links', '6'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-slate-400">{label}</p>
              <p className="mt-2 text-3xl font-black">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-extrabold text-slate-900">Ring intervention status</h3>
        <div className="mt-5 space-y-4">
          {[
            ['Beneficiary ladder A', 'Frozen', 'text-rose-700 bg-rose-50'],
            ['Wallet pair UPI*999 / UPI*921', 'Escalated', 'text-amber-700 bg-amber-50'],
            ['Device DEV01 chain', 'Pinned as evidence', 'text-emerald-700 bg-emerald-50'],
            ['Cleared account release set', '3 ready to unblock', 'text-indigo-700 bg-indigo-50'],
          ].map(([label, status, tone]) => (
            <div key={label as string} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-sm font-semibold text-slate-700">{label as string}</p>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${tone as string}`}>{status as string}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <Network className="text-indigo-600" />
          <h3 className="text-lg font-extrabold text-slate-900">Topology depth</h3>
        </div>
        <p className="text-sm text-slate-500">The ring sustains itself through a four-hop payout pattern that reconnects through two reused merchant endpoints.</p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <ShieldAlert className="text-rose-600" />
          <h3 className="text-lg font-extrabold text-slate-900">Containment</h3>
        </div>
        <p className="text-sm text-slate-500">Most high-risk accounts are frozen; only the three cleared accounts remain pending unblock action from the senior investigator.</p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <FileText className="text-emerald-600" />
          <h3 className="text-lg font-extrabold text-slate-900">Evidence trail</h3>
        </div>
        <p className="text-sm text-slate-500">Timeline exports, graph snapshots, and beneficiary narratives are already staged for encrypted legal payload generation.</p>
      </div>
    </div>
  </div>
);
=======
import { FraudIntelligence, PatternAnalytics } from './components/RiskManagerModules';
import { Bell, Search, ShieldAlert, Users, Zap } from 'lucide-react';

// ── Simulated suspicious cluster data ──────────────────────────────────────
const CLUSTER_POOL = [
  { name: 'Alpha-7',  nodes: 14, risk: 98, type: 'Mule Ring',      color: 'bg-red-500',    badge: 'bg-red-100 text-red-700' },
  { name: 'Beta-2',   nodes: 8,  risk: 91, type: 'SIM-Swap Gang',  color: 'bg-red-400',    badge: 'bg-red-100 text-red-700' },
  { name: 'Gamma-12', nodes: 21, risk: 87, type: 'Velocity Spike', color: 'bg-orange-500', badge: 'bg-orange-100 text-orange-700' },
  { name: 'Delta-5',  nodes: 6,  risk: 83, type: 'ID Spoof Net',   color: 'bg-orange-400', badge: 'bg-orange-100 text-orange-700' },
  { name: 'Sigma-3',  nodes: 33, risk: 79, type: 'Fast-Flow',      color: 'bg-amber-500',  badge: 'bg-amber-100 text-amber-700' },
  { name: 'Zeta-9',   nodes: 11, risk: 75, type: 'Geo Anomaly',    color: 'bg-amber-400',  badge: 'bg-amber-100 text-amber-700' },
];

const SuspiciousClusters = () => {
  const [clusters, setClusters] = useState(CLUSTER_POOL.slice(0, 5));

  useEffect(() => {
    const id = setInterval(() => {
      setClusters(prev =>
        prev.map(c => ({
          ...c,
          nodes: Math.max(4, c.nodes + Math.floor(Math.random() * 5 - 2)),
          risk:  Math.max(70, Math.min(99, c.risk + Math.floor(Math.random() * 5 - 2))),
        }))
      );
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow h-full">
      <h3 className="text-base font-bold mb-4 text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
        <ShieldAlert size={17} className="text-red-500"/> Top Suspicious Clusters
      </h3>
      <div className="flex-1 space-y-3 overflow-auto">
        {clusters.map((c, i) => (
          <div key={c.name} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
            <div className={`w-8 h-8 rounded-lg ${c.color} flex items-center justify-center text-white text-xs font-black shadow-sm`}>
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-bold text-slate-900 text-sm">Cluster {c.name}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${c.badge}`}>{c.type}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Users size={10}/> {c.nodes} nodes</span>
                <span className="flex items-center gap-1"><Zap size={10}/> GNN {c.risk}%</span>
              </div>
            </div>
            <div className="w-12">
              <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${c.risk > 90 ? 'bg-red-500' : c.risk > 80 ? 'bg-orange-500' : 'bg-amber-500'}`}
                  style={{ width: `${c.risk}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
>>>>>>> 02022c2b6ec7e05a30b2d70f343f3cc82a783a60

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab]   = useState('Overview');
  const [searchTerm, setSearchTerm] = useState('');
<<<<<<< HEAD

  const [userRole, setUserRole] = useState(localStorage.getItem('role') || 'Fraud Analyst');
  const [firstName, setFirstName] = useState(localStorage.getItem('first_name') || 'User');
=======
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifCount, setNotifCount] = useState(3);

  const [userRole,   setUserRole]   = useState(localStorage.getItem('role') || 'Fraud Analyst');
  const [firstName,  setFirstName]  = useState(localStorage.getItem('first_name') || 'User');

  const NOTIFS = [
    { id: 1, title: 'Critical Alert: Cluster Alpha-7', sub: 'GNN score 98 — TXN49816329', time: '2 min ago',  color: 'bg-red-100 text-red-600',    dot: 'bg-red-500' },
    { id: 2, title: 'New Mule Node Detected',          sub: 'Sigma-3 cluster expanded to 33 nodes', time: '18 min ago', color: 'bg-orange-100 text-orange-600', dot: 'bg-orange-500' },
    { id: 3, title: 'SAR-1041 Pending RBI Sign-off',   sub: 'Kavitha R. awaiting approval', time: '1 hr ago',  color: 'bg-amber-100 text-amber-600',  dot: 'bg-amber-500' },
    { id: 4, title: 'Model Retrain Complete',           sub: 'GraphSAGE v2.4.1 F1: 0.9622', time: '3 hr ago',  color: 'bg-indigo-100 text-indigo-600',dot: 'bg-indigo-500' },
  ];
>>>>>>> 02022c2b6ec7e05a30b2d70f343f3cc82a783a60

  if (!isAuthenticated) {
    return <Login onLogin={() => {
      setIsAuthenticated(true);
      setUserRole(localStorage.getItem('role') || 'Fraud Analyst');
      setFirstName(localStorage.getItem('first_name') || 'User');
    }} />;
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('Overview');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('first_name');
  };

  const renderOverviewForRole = () => {
    switch (userRole) {
      case 'Admin':
        return <AdminOverview />;
      case 'Senior Investigator':
        return <InvestigatorOverview />;
      case 'Risk Manager':
        return <RiskManagerOverview />;
      case 'Fraud Analyst':
      default:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">Real-Time Analyst Monitoring</h1>
              <p className="text-slate-500 font-medium">GNN Model v2.4 inference metrics across national UPI network.</p>
            </div>

            <div className="mb-8">
              <KPICards />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 flex-1 min-h-[400px]">
              <div className="xl:col-span-2 shadow-sm rounded-2xl bg-white">
                <TransactionGrid searchTerm={searchTerm} />
              </div>
<<<<<<< HEAD

              <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold mb-4 text-slate-900 border-b border-slate-100 pb-4">Top Suspicious Clusters</h3>

                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-indigo-200 border-dashed animate-[spin_10s_linear_infinite] mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-50" />
                  </div>
                  <p className="text-sm text-slate-800 font-bold">Rendering Graph Topology...</p>
                  <p className="text-xs text-slate-500 mt-2 max-w-[200px] font-medium">Awaiting neo4j subgraph traversal metrics.</p>
                </div>
              </div>
=======
              
              <SuspiciousClusters />
>>>>>>> 02022c2b6ec7e05a30b2d70f343f3cc82a783a60
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} role={userRole} />

      <main className="flex-1 flex flex-col relative z-10 w-full min-w-0">
        <header className="h-20 px-8 flex flex-shrink-0 items-center justify-between border-b border-slate-200 bg-white shadow-sm z-10">
          <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
            <span>{userRole} Gateway</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span className="text-indigo-600 font-bold tracking-wide">{activeTab}</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search globals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-72 bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-400 text-slate-900 font-medium shadow-sm"
              />
            </div>
<<<<<<< HEAD

            <button className="relative p-2.5 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900 group">
              <Bell size={20} className="group-hover:animate-swing" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border-2 border-white animate-pulse" />
            </button>

=======
            
            <div className="relative">
              <button onClick={() => { setShowNotifs(p => !p); setNotifCount(0); }}
                className="relative p-2.5 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900">
                <Bell size={20}/>
                {notifCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-red-500 border-2 border-white text-white text-[9px] font-black flex items-center justify-center animate-bounce">{notifCount}</span>
                )}
              </button>
              {showNotifs && (
                <div className="absolute right-0 top-12 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-4">
                  <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">Notifications</span>
                    <button onClick={() => setShowNotifs(false)} className="text-slate-400 hover:text-slate-700 text-xs font-semibold">Close</button>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-80 overflow-auto">
                    {NOTIFS.map(n => (
                      <div key={n.id} className="flex gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors cursor-pointer">
                        <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.dot} animate-pulse`}/>
                        <div>
                          <p className="text-sm font-bold text-slate-900 leading-tight">{n.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{n.sub}</p>
                          <p className="text-[10px] text-slate-400 mt-1 font-semibold">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 py-3 border-t border-slate-100">
                    <button onClick={() => { setActiveTab('Fraud Alerts'); setShowNotifs(false); }}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">View all alerts →</button>
                  </div>
                </div>
              )}
            </div>
            
>>>>>>> 02022c2b6ec7e05a30b2d70f343f3cc82a783a60
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white shadow-md flex items-center justify-center text-sm font-bold border-2 border-indigo-100">
                {firstName ? firstName.charAt(0).toUpperCase() : userRole.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 leading-tight">{firstName}</span>
                <span className="text-xs text-emerald-500 font-bold tracking-wide">{userRole}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 bg-slate-50/50">
          {activeTab === 'Overview' && renderOverviewForRole()}

          {activeTab === 'System Health' && <div className="animate-in fade-in slide-in-from-bottom-4"><AdminOverview /></div>}
          {activeTab === 'User Management' && <div className="animate-in fade-in slide-in-from-bottom-4"><UserManagement /></div>}
          {activeTab === 'Fraud Overview' && <div className="animate-in fade-in slide-in-from-bottom-4"><RiskManagerOverview /></div>}
          {activeTab === 'ML Model Status' && <div className="animate-in fade-in slide-in-from-bottom-4"><MLModelStatus /></div>}
          {activeTab === 'Audit Logs' && <div className="animate-in fade-in slide-in-from-bottom-4 h-full"><AuditLogs /></div>}

          {activeTab === 'Live Transactions' && <div className="animate-in fade-in slide-in-from-bottom-4 h-full"><TransactionGrid searchTerm={searchTerm} /></div>}
          {activeTab === 'Fraud Alerts' && <div className="animate-in fade-in slide-in-from-bottom-4 h-full"><AlertCenter searchTerm={searchTerm} /></div>}
          {activeTab === 'Transaction Risk Analysis' && <div className="animate-in fade-in slide-in-from-bottom-4 h-full"><TransactionRisk /></div>}
          {activeTab === 'Account Investigation' && <div className="animate-in fade-in slide-in-from-bottom-4"><Investigations searchTerm={searchTerm} /></div>}
          {activeTab === 'Fraud Trends' && <div className="animate-in fade-in slide-in-from-bottom-4 h-full"><FraudTrends /></div>}

<<<<<<< HEAD
          {['Case Management', 'Deep Case Management'].includes(activeTab) && <div className="animate-in fade-in slide-in-from-bottom-4"><Investigations searchTerm={searchTerm} /></div>}
          {['Graph Visualizer', 'Graph Visualization Sandbox'].includes(activeTab) && <div className="animate-in fade-in slide-in-from-bottom-4 h-full"><GraphVisualizer /></div>}
          {activeTab === 'Fraud Ring Topology' && <div className="animate-in fade-in slide-in-from-bottom-4"><FraudRingTopology /></div>}
          {['Fraud Intelligence', 'Fraud Intelligence Dashboard'].includes(activeTab) && <div className="animate-in fade-in slide-in-from-bottom-4"><FraudIntelligenceDashboard /></div>}
          {activeTab === 'Pattern Analytics' && <div className="animate-in fade-in slide-in-from-bottom-4"><PatternAnalytics /></div>}
          {activeTab === 'Automated Reporting' && <div className="animate-in fade-in slide-in-from-bottom-4"><AutomatedReporting /></div>}

=======
          {/* Risk Manager Specific Workflows */}
          {activeTab === 'Fraud Intelligence' && <div className="animate-in fade-in slide-in-from-bottom-4"><FraudIntelligence /></div>}
          {activeTab === 'Pattern Analytics' && <div className="animate-in fade-in slide-in-from-bottom-4"><PatternAnalytics /></div>}
          {activeTab === 'Risk Alerts' && <div className="animate-in fade-in slide-in-from-bottom-4 h-full"><AlertCenter searchTerm={searchTerm} /></div>}
          {activeTab === 'Compliance' && <div className="animate-in fade-in slide-in-from-bottom-4"><RiskManagerOverview /></div>}

          {/* Investigator Specific Workflows */}
          {activeTab === 'Case Management' && <div className="animate-in fade-in slide-in-from-bottom-4"><Investigations searchTerm={searchTerm} /></div>}
          {activeTab === 'Graph Visualizer' && <div className="animate-in fade-in slide-in-from-bottom-4 h-full"><GraphVisualizer /></div>}
          {activeTab === 'Evidence Chain' && <div className="animate-in fade-in slide-in-from-bottom-4"><InvestigatorOverview /></div>}
          {activeTab === 'Forensic Timeline' && <div className="animate-in fade-in slide-in-from-bottom-4"><InvestigatorOverview /></div>}
          
          {/* Universal System Settings */}
>>>>>>> 02022c2b6ec7e05a30b2d70f343f3cc82a783a60
          {activeTab === 'Settings' && <div className="animate-in fade-in slide-in-from-bottom-4"><SettingsModule /></div>}
          {activeTab === 'Logout' && <div className="animate-in fade-in slide-in-from-bottom-4"><LogoutConfirm setActiveTab={setActiveTab} onLogout={handleLogout} /></div>}
        </div>
      </main>
    </div>
  );
}

export default App;
