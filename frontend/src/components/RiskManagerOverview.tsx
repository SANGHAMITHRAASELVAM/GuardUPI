<<<<<<< HEAD
import { useState } from 'react';
import { BarChart3, FileText, Globe, Gauge, ShieldCheck, TrendingDown, TrendingUp } from 'lucide-react';

const kpis = [
  { label: 'False Positive Ratio', value: '1.4%', delta: '-0.3 pts vs 7d', tone: 'text-emerald-600 bg-emerald-50' },
  { label: 'Loss Prevented', value: 'Rs 8.42 Cr', delta: '+14% day-over-day', tone: 'text-emerald-600 bg-emerald-50' },
  { label: 'Realized Fraud Loss', value: 'Rs 1.18 Cr', delta: 'Down from Rs 1.46 Cr', tone: 'text-amber-700 bg-amber-50' },
  { label: 'Rules Tuned Today', value: '12', delta: '3 awaiting sign-off', tone: 'text-indigo-700 bg-indigo-50' },
];

const regions = [
  { zone: 'North', trend: 'Stable', exposure: 'Rs 0.28 Cr', notes: 'ATM cash-out rings contained' },
  { zone: 'West', trend: 'Elevated', exposure: 'Rs 0.62 Cr', notes: 'SIM-swap assisted account takeover cluster' },
  { zone: 'South', trend: 'Improving', exposure: 'Rs 0.17 Cr', notes: 'Merchant mule suppression working' },
  { zone: 'East', trend: 'Elevated', exposure: 'Rs 0.41 Cr', notes: 'Festival promo phishing spike detected' },
];

export const RiskManagerOverview = () => {
  const [ruleThresholds, setRuleThresholds] = useState([
    { rule: 'Velocity spike > 15 tx / 10 min', owner: 'Real-time rules', current: '15', proposed: '12', impact: 'Reduce mule burst leakage by 9%' },
    { rule: 'Dormant account reactivation risk', owner: 'Behavioral model', current: '0.74', proposed: '0.69', impact: 'Capture sleeper-account abuse earlier' },
    { rule: 'Cross-device UPI hop score', owner: 'Graph heuristics', current: '84', proposed: '81', impact: 'Improve ring detection coverage in tier-2 banks' },
  ]);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleProposedChange = (index: number, value: string) => {
    setRuleThresholds(prev => prev.map((item, i) => i === index ? { ...item, proposed: value } : item));
  };

  const handleApplyChanges = () => {
    setRuleThresholds(prev => prev.map(item => ({ ...item, current: item.proposed })));
    showToast('Queued threshold changes applied successfully.');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          {toast}
        </div>
      )}

      <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">Risk Manager Command Deck</h2>
          <p className="text-slate-500 font-medium">Monitor aggregate exposure, tune thresholds, and track loss prevented versus realized across the UPI network.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 w-fit">
          <ShieldCheck size={16} />
          Portfolio posture stable, 3 thresholds queued for action
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">{kpi.label}</p>
            <div className="mt-3 flex items-end justify-between gap-4">
              <p className="text-3xl font-black tracking-tight text-slate-900">{kpi.value}</p>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${kpi.tone}`}>{kpi.delta}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-8 text-white shadow-xl">
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-emerald-500/20 blur-[120px]" />
          <div className="relative z-10">
            <div className="mb-8 flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">Fraud Intelligence Dashboard</p>
                <h3 className="mt-3 text-3xl font-black tracking-tight">Rs 8.42 Cr prevented in the last 24 hours</h3>
                <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-300">Blocked value is outpacing realized loss 7.1 to 1, with false positives holding inside the 1.8% operating target.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Net benefit</p>
                <p className="mt-2 text-4xl font-black text-emerald-400">Rs 7.24 Cr</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-4 flex items-center gap-3 text-emerald-300">
                  <TrendingUp size={18} />
                  <span className="text-sm font-bold">Prevented vs realized</span>
                </div>
                <p className="text-2xl font-black">7.1x</p>
                <p className="mt-2 text-sm text-slate-400">Best level since the last weekly retrain.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-4 flex items-center gap-3 text-amber-300">
                  <Gauge size={18} />
                  <span className="text-sm font-bold">Threshold drift risk</span>
                </div>
                <p className="text-2xl font-black">Medium</p>
                <p className="mt-2 text-sm text-slate-400">Merchant onboarding traffic is pushing edge-case volume.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-4 flex items-center gap-3 text-sky-300">
                  <Globe size={18} />
                  <span className="text-sm font-bold">High-risk corridors</span>
                </div>
                <p className="text-2xl font-black">4</p>
                <p className="mt-2 text-sm text-slate-400">Two geographies need immediate watchlist expansion.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600">
              <BarChart3 size={22} />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Pattern Analytics Snapshot</h3>
              <p className="text-sm font-medium text-slate-500">Top anomaly signatures across the current portfolio.</p>
            </div>
          </div>

          <div className="space-y-5">
            {[
              ['Account takeover chains', 86, 'Rapid rise in device changes and overnight payee creation'],
              ['Merchant mule clustering', 71, 'Dense payout fan-out around promo abuse campaigns'],
              ['Synthetic KYC bursts', 58, 'Contained but increasing around newly linked wallets'],
            ].map(([label, width, note]) => (
              <div key={label as string}>
                <div className="mb-2 flex items-center justify-between text-sm font-bold text-slate-700">
                  <span>{label}</span>
                  <span>{width}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500" style={{ width: `${width}%` }} />
                </div>
                <p className="mt-2 text-sm text-slate-500">{note as string}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Rule-engine thresholds</h3>
              <p className="text-sm font-medium text-slate-500">Writable controls available to the Risk Manager role.</p>
            </div>
            <button
              onClick={handleApplyChanges}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-black active:scale-95"
            >
              Apply queued changes
            </button>
          </div>

          <div className="space-y-4">
            {ruleThresholds.map((item, index) => (
              <div key={item.rule} className="rounded-2xl border border-slate-200 p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-base font-bold text-slate-900">{item.rule}</p>
                    <p className="mt-1 text-sm font-medium text-slate-500">{item.owner}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm font-bold">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">Current {item.current}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-400 font-medium">Proposed</span>
                      <input
                        type="text"
                        value={item.proposed}
                        onChange={(e) => handleProposedChange(index, e.target.value)}
                        className="w-20 rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-indigo-700 text-sm font-bold text-center focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600">{item.impact}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                <TrendingDown size={22} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Regional exposure watch</h3>
                <p className="text-sm font-medium text-slate-500">Aggregate risk by operating zone.</p>
              </div>
            </div>
            <div className="space-y-4">
              {regions.map((region) => (
                <div key={region.zone} className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-bold text-slate-900">{region.zone}</p>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${region.trend === 'Elevated' ? 'bg-rose-50 text-rose-700' : region.trend === 'Improving' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>{region.trend}</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-700">{region.exposure}</p>
                  <p className="mt-1 text-sm text-slate-500">{region.notes}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-amber-50 via-white to-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
                <FileText size={22} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Automated reporting queue</h3>
                <p className="text-sm font-medium text-slate-500">Board-ready summaries generated from threshold and loss telemetry.</p>
              </div>
            </div>
            <div className="space-y-3 text-sm font-medium text-slate-600">
              <div className="rounded-2xl border border-amber-100 bg-white/80 p-4">09:30 IST board pack scheduled with realized-loss variance and false-positive trends.</div>
              <div className="rounded-2xl border border-amber-100 bg-white/80 p-4">Weekly regulator annex prepared with rule changes, model drift commentary, and exception logs.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FraudIntelligenceDashboard = () => <RiskManagerOverview />;

export const PatternAnalytics = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div>
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">Pattern Analytics</h2>
      <p className="text-slate-500 font-medium">Cluster-level fraud signatures, false-positive movement, and intervention efficiency for the Risk Manager role.</p>
    </div>

    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-extrabold text-slate-900">Signal family performance</h3>
        <div className="mt-6 space-y-5">
          {[
            ['Graph density anomalies', '91%', '2.1% false positives', 'Strongest signal for coordinated mule rings'],
            ['Velocity deviation', '83%', '3.4% false positives', 'Useful during payout bursts and smurfing attempts'],
            ['Device fingerprint novelty', '68%', '1.1% false positives', 'Stable, but lower coverage on shared phones'],
            ['Merchant payout asymmetry', '76%', '1.8% false positives', 'Meaningfully improved after merchant segmentation'],
          ].map(([name, recall, fp, note]) => (
            <div key={name as string} className="rounded-2xl border border-slate-200 p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-base font-bold text-slate-900">{name as string}</p>
                <div className="flex flex-wrap gap-2 text-xs font-bold">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">Recall {recall as string}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">{fp as string}</span>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-500">{note as string}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-300">False positive posture</p>
          <p className="mt-4 text-5xl font-black">1.4%</p>
          <p className="mt-3 text-sm font-medium text-slate-300">Down from 1.7% last week after narrowing dormancy and merchant payout thresholds.</p>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-sky-400 to-emerald-400" />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-extrabold text-slate-900">Analyst handoff pressure</h3>
          <div className="mt-5 space-y-4">
            {[
              ['Level 1 analyst queue', '142 alerts', 'text-amber-700 bg-amber-50'],
              ['Senior investigator escalations', '18 active cases', 'text-rose-700 bg-rose-50'],
              ['Auto-closed safe transactions', '2,481', 'text-emerald-700 bg-emerald-50'],
            ].map(([label, value, tone]) => (
              <div key={label as string} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-sm font-semibold text-slate-600">{label as string}</p>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${tone as string}`}>{value as string}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const AutomatedReporting = () => {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleGenerateBundle = () => {
    showToast('Reporting bundle generation initiated — estimated completion in 30 seconds.');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          {toast}
        </div>
      )}

      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">Automated Reporting</h2>
          <p className="text-slate-500 font-medium">Generate regulator packs, executive summaries, and threshold-change evidence directly from current risk telemetry.</p>
        </div>
        <button
          onClick={handleGenerateBundle}
          className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-black active:scale-95 transition-all"
        >
          Generate reporting bundle
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-extrabold text-slate-900">Scheduled report pipeline</h3>
          <div className="mt-6 space-y-4">
            {[
              ['Daily operating pack', '09:30 IST', 'Queued', 'Includes prevented loss, realized loss, and threshold exceptions'],
              ['Weekly board summary', 'Friday 18:00 IST', 'Drafted', 'Adds false-positive trajectory and top corridor movement'],
              ['Regulator annex', 'Monday 08:00 IST', 'Ready', 'Bundles signed threshold changes with approval metadata'],
            ].map(([title, eta, status, note]) => (
              <div key={title as string} className="rounded-2xl border border-slate-200 p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-base font-bold text-slate-900">{title as string}</p>
                    <p className="mt-1 text-sm text-slate-500">{note as string}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-bold">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">{eta as string}</span>
                    <span className={`rounded-full px-3 py-1 ${status === 'Ready' ? 'bg-emerald-50 text-emerald-700' : status === 'Queued' ? 'bg-amber-50 text-amber-700' : 'bg-indigo-50 text-indigo-700'}`}>{status as string}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-600 via-slate-900 to-slate-950 p-6 text-white shadow-xl">
            <h3 className="text-xl font-extrabold">Executive narrative preview</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-200">Prevented fraud value rose 14% while realized losses fell 19% week over week. Threshold tuning on dormant-account activation and merchant payout asymmetry delivered the sharpest reduction in manual review waste.</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900">Included evidence sections</h3>
            <div className="mt-5 grid gap-3">
              {['Portfolio loss summary', 'False-positive variance by rule family', 'Threshold-change approval log', 'Regional concentration heat table'].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                  {item}
=======
import { useState, useEffect } from 'react';
import { Globe, BarChart3, TrendingUp, ShieldCheck, Zap, AlertTriangle, ArrowUpRight, ArrowDownRight, Clock, Activity, Target, Shield, Eye } from 'lucide-react';

function rand(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const REGIONS = [
  { name: 'Maharashtra', fraudPct: 34, color: '#ef4444', cases: 412 },
  { name: 'Delhi NCR', fraudPct: 22, color: '#f59e0b', cases: 268 },
  { name: 'Karnataka', fraudPct: 18, color: '#6366f1', cases: 219 },
  { name: 'Tamil Nadu', fraudPct: 13, color: '#8b5cf6', cases: 158 },
  { name: 'West Bengal', fraudPct: 8, color: '#ec4899', cases: 97 },
  { name: 'Others', fraudPct: 5, color: '#64748b', cases: 61 },
];

// Anomaly timeline data
const ANOMALY_TYPES = ['Velocity Spike', 'Geo Anomaly', 'Mule Pattern', 'Device Clone', 'SIM Swap', 'Fund Drain'];
const generateAnomalies = () => Array.from({ length: 18 }, (_, i) => ({
  hour: i + 1,
  type: ANOMALY_TYPES[rand(0, ANOMALY_TYPES.length - 1)],
  severity: (['Critical', 'High', 'Medium'] as const)[rand(0, 2)],
  score: rand(72, 99),
}));

// Predictive alerts
const PREDICTIVE_ALERTS = [
  { cluster: 'Alpha-7', prediction: 'Mule cascade in 2h', confidence: 94, eta: '~2h', color: '#ef4444' },
  { cluster: 'Sigma-3', prediction: 'Velocity burst expected', confidence: 87, eta: '~4h', color: '#f59e0b' },
  { cluster: 'Delta-5', prediction: 'New node injection likely', confidence: 79, eta: '~6h', color: '#6366f1' },
  { cluster: 'Zeta-9', prediction: 'Geo-hop pattern emerging', confidence: 72, eta: '~8h', color: '#8b5cf6' },
];

// Compliance items
const COMPLIANCE = [
  { item: 'SAR filings (monthly)', status: 'On Track', progress: 92, deadline: 'Apr 30', color: 'emerald' },
  { item: 'AML audit response', status: 'Due Soon', progress: 68, deadline: 'Apr 20', color: 'amber' },
  { item: 'NPCI quarterly report', status: 'Completed', progress: 100, deadline: 'Apr 10', color: 'emerald' },
  { item: 'RBI CPIO notification', status: 'Pending', progress: 35, deadline: 'Apr 18', color: 'red' },
  { item: 'PCI DSS renewal', status: 'On Track', progress: 80, deadline: 'May 15', color: 'emerald' },
];

export const RiskManagerOverview = () => {
  const [prevented, setPrevented] = useState(8.42);
  const [fpRate, setFpRate] = useState(1.4);
  const [velocity, setVelocity] = useState(4205);
  const [threatLvl, setThreatLvl] = useState<'HIGH' | 'ELEVATED' | 'CRITICAL'>('ELEVATED');
  const [regions, setRegions] = useState(REGIONS);
  const [history, setHistory] = useState<number[]>(() => Array.from({ length: 24 }, () => rand(60, 340)));
  const [anomalies, setAnomalies] = useState(generateAnomalies);
  const [predictions, setPredictions] = useState(PREDICTIVE_ALERTS);
  const [compliance, setCompliance] = useState(COMPLIANCE);

  useEffect(() => {
    const id = setInterval(() => {
      setPrevented(v => parseFloat((v + (Math.random() * 0.08)).toFixed(2)));
      setFpRate(v => parseFloat((Math.max(0.8, Math.min(2.5, v + (Math.random() * 0.1 - 0.05))).toFixed(2))));
      setVelocity(v => Math.max(3600, Math.min(5400, v + rand(-80, 100))));
      setHistory(h => [...h.slice(1), rand(60, 400)]);
      setRegions(r => r.map(re => ({ ...re, cases: Math.max(10, re.cases + rand(-5, 8)) })));
      setPredictions(p => p.map(pr => ({ ...pr, confidence: Math.max(60, Math.min(99, pr.confidence + rand(-2, 2))) })));
      setCompliance(c => c.map(ci => ({ ...ci, progress: Math.min(100, ci.progress + (ci.progress < 100 ? rand(0, 1) : 0)) })));
      if (Math.random() < 0.1) {
        const levels: ('HIGH' | 'ELEVATED' | 'CRITICAL')[] = ['HIGH', 'ELEVATED', 'CRITICAL'];
        setThreatLvl(levels[rand(0, 2)]);
      }
    }, 2200);
    return () => clearInterval(id);
  }, []);

  // Sparkline SVG helper
  const W = 200, H = 48;
  const max = Math.max(...history);
  const pts = history.map((v, i) => `${(i / (history.length - 1)) * W},${H - (v / max) * H}`).join(' ');

  const threatColor = threatLvl === 'CRITICAL' ? { bg: 'bg-red-600', text: 'text-red-600', badge: 'bg-red-50 text-red-700 border-red-200' }
    : threatLvl === 'HIGH' ? { bg: 'bg-orange-500', text: 'text-orange-600', badge: 'bg-orange-50 text-orange-700 border-orange-200' }
      : { bg: 'bg-amber-500', text: 'text-amber-600', badge: 'bg-amber-50 text-amber-700 border-amber-200' };

  const totalCases = regions.reduce((a, r) => a + r.cases, 0);

  // Anomaly timeline SVG
  const anomalyW = 700, anomalyH = 60;
  const sevColor = (s: string) => s === 'Critical' ? '#ef4444' : s === 'High' ? '#f59e0b' : '#6366f1';

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-7">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1">Executive Risk Dashboard</h2>
        <p className="text-slate-500 font-medium">Live ML KPIs, predictive alerts, anomaly timeline, and compliance tracking.</p>
      </div>

      {/* Hero banner */}
      <div className="bg-slate-900 p-7 rounded-2xl shadow-xl flex justify-between items-center relative overflow-hidden">
        <div className="absolute right-0 top-0 w-72 h-72 bg-emerald-500 rounded-full blur-[140px] opacity-15 pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-48 h-48 bg-indigo-500 rounded-full blur-[100px] opacity-10 pointer-events-none" />
        <div className="relative z-10">
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-1">24h Fraud Prevented</p>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-black text-emerald-400 tracking-tight">₹{prevented} Cr</span>
            <span className="text-emerald-500 text-sm font-bold flex items-center gap-1 mb-2"><ArrowUpRight size={14} /> +0.8% vs yesterday</span>
          </div>
        </div>
        <div className="relative z-10">
          <p className="text-slate-500 text-xs mb-2 text-right">Transaction Velocity (24h)</p>
          <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
            <polyline points={pts} fill="none" stroke="#34d399" strokeWidth="2" strokeLinejoin="round" />
            <polyline points={`0,${H} ${pts} ${W},${H}`} fill="url(#sparkGrad)" opacity="0.3" />
            <defs>
              <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <p className="text-emerald-400 text-right text-xs font-mono font-bold">{velocity.toLocaleString()} txn/s</p>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm group hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Globe className="text-red-500" size={22} />
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${threatColor.badge} ${threatLvl === 'CRITICAL' ? 'animate-pulse' : ''}`}>
              {threatLvl}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-semibold">Global IP Threat Level</p>
          <p className={`text-xl font-black mt-1 ${threatColor.text}`}>{threatLvl === 'CRITICAL' ? 'Botnet + APT Active' : threatLvl === 'HIGH' ? 'Botnet Detected' : 'Suspicious Probing'}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm group hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <BarChart3 className="text-indigo-600" size={22} />
            </div>
            <span className={`text-xs font-bold flex items-center gap-1 ${fpRate < 1.5 ? 'text-emerald-600' : 'text-amber-600'}`}>
              {fpRate < 1.5 ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}
              {fpRate < 1.5 ? 'Within SLA' : 'Above SLA'}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-semibold">GNN False Positive Rate</p>
          <p className={`text-3xl font-black mt-1 ${fpRate < 1.5 ? 'text-emerald-600' : 'text-amber-600'}`}>{fpRate}%</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm group hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 bg-purple-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck className="text-purple-600" size={22} />
            </div>
            <span className="text-xs font-bold text-emerald-600">97.3% Detection</span>
          </div>
          <p className="text-xs text-slate-500 font-semibold">Model Accuracy (F1)</p>
          <p className="text-3xl font-black mt-1 text-purple-600">0.9622</p>
        </div>
      </div>

      {/* Anomaly Detection Timeline */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Activity size={17} className="text-rose-500" /> Anomaly Detection Timeline (24h)
        </h3>
        <svg viewBox={`0 0 ${anomalyW} ${anomalyH}`} className="w-full" style={{ height: 60 }}>
          {/* Timeline base */}
          <line x1="20" y1="30" x2={anomalyW - 20} y2="30" stroke="#e2e8f0" strokeWidth="2" />
          {/* Hour markers */}
          {[0, 6, 12, 18, 24].map(h => {
            const x = 20 + (h / 24) * (anomalyW - 40);
            return <g key={h}>
              <line x1={x} y1="25" x2={x} y2="35" stroke="#cbd5e1" strokeWidth="1" />
              <text x={x} y="50" textAnchor="middle" fontSize="9" fill="#94a3b8" fontWeight="600">{`${String(h).padStart(2, '0')}:00`}</text>
            </g>;
          })}
          {/* Anomaly markers */}
          {anomalies.map((a, i) => {
            const x = 20 + (a.hour / 24) * (anomalyW - 40) + rand(-8, 8);
            const r = a.severity === 'Critical' ? 7 : a.severity === 'High' ? 5.5 : 4;
            return (
              <g key={i}>
                {a.severity === 'Critical' && <circle cx={x} cy="30" r={r + 4} fill={sevColor(a.severity)} opacity="0.15">
                  <animate attributeName="r" values={`${r + 2};${r + 6};${r + 2}`} dur="2s" repeatCount="indefinite" />
                </circle>}
                <circle cx={x} cy="30" r={r} fill={sevColor(a.severity)} stroke="white" strokeWidth="1.5" style={{ cursor: 'pointer' }} />
              </g>
            );
          })}
        </svg>
        <div className="flex items-center gap-6 mt-2 text-[10px] font-semibold text-slate-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Critical ({anomalies.filter(a => a.severity === 'Critical').length})</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> High ({anomalies.filter(a => a.severity === 'High').length})</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" /> Medium ({anomalies.filter(a => a.severity === 'Medium').length})</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Regional breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
            <Zap size={17} className="text-indigo-500" /> Fraud Cases by Region (Live)
          </h3>
          <div className="space-y-3">
            {regions.map((r, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-xs font-semibold text-slate-600 w-28 shrink-0">{r.name}</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${r.fraudPct}%`, background: r.color, boxShadow: `0 0 8px ${r.color}55` }}
                  />
                </div>
                <span className="text-xs font-mono font-bold text-slate-700 w-16 text-right">{r.cases} cases</span>
                <span className="text-xs font-bold w-8 text-right" style={{ color: r.color }}>{r.fraudPct}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Total cases across all regions</span>
            <span className="font-black text-slate-900 text-base">{totalCases.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Predictive Alerts + Compliance */}
        <div className="flex flex-col gap-6">
          {/* ML Predictive Alerts */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Target size={16} className="text-rose-500" /> ML Predictive Alert Queue
            </h3>
            <div className="space-y-2.5">
              {predictions.map((p, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white shrink-0" style={{ background: p.color }}>
                    {p.confidence}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-slate-900">{p.cluster}</span>
                      <span className="text-[10px] font-mono text-slate-400">ETA {p.eta}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{p.prediction}</p>
                  </div>
                  <div className="w-10">
                    <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${p.confidence}%`, background: p.color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Status */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Shield size={16} className="text-emerald-500" /> RBI/NPCI Compliance
            </h3>
            <div className="space-y-2.5">
              {compliance.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-700 truncate">{c.item}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-${c.color}-50 text-${c.color}-700 border border-${c.color}-100`}>{c.status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-700 bg-${c.color}-500`} style={{ width: `${c.progress}%` }} />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 w-8 text-right">{c.progress}%</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 shrink-0 flex items-center gap-1"><Clock size={9} /> {c.deadline}</span>
>>>>>>> 02022c2b6ec7e05a30b2d70f343f3cc82a783a60
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> 02022c2b6ec7e05a30b2d70f343f3cc82a783a60
