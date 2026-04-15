<<<<<<< HEAD
import { useState } from 'react';
import { Network, ScanSearch, SlidersHorizontal, ZoomIn, ZoomOut } from 'lucide-react';

const NODES = [
  { id: 'TXN498', label: 'TXN498', pos: { top: '50%', left: '50%' }, type: 'suspect', score: '98.4', detail: 'High-confidence mule payout edge. Linked to 3 frozen accounts, 2 devices, and 1 beneficiary ladder reused in CASE-412.' },
  { id: 'UPI921', label: 'UPI*921', pos: { top: '20%', left: '30%' }, type: 'handle', score: '74.1', detail: 'Linked UPI handle — part of beneficiary ladder in CASE-412.' },
  { id: 'DEV01', label: 'DEV01', pos: { top: '30%', left: '70%' }, type: 'device', score: '61.2', detail: 'Shared device fingerprint linked to 2 mule accounts.' },
  { id: 'UPI444', label: 'UPI*444', pos: { top: '80%', left: '40%' }, type: 'handle', score: '55.8', detail: 'Dormant handle reactivated during promo abuse window.' },
  { id: 'UPI999', label: 'UPI*999', pos: { top: '70%', left: '75%' }, type: 'suspect', score: '91.3', detail: 'Secondary mule wallet — final payout destination in the ring.' },
];

export const GraphVisualizer = () => {
  const [zoom, setZoom] = useState(1);
  const [pinnedNodes, setPinnedNodes] = useState<string[]>(['TXN498']);
  const [visibleNodes, setVisibleNodes] = useState(44);
  const [selectedNode, setSelectedNode] = useState(NODES[0]);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handlePinEvidence = () => {
    if (!pinnedNodes.includes(selectedNode.id)) {
      setPinnedNodes([...pinnedNodes, selectedNode.id]);
      showToast(`${selectedNode.label} pinned as evidence.`);
    } else {
      showToast(`${selectedNode.label} is already pinned as evidence.`);
    }
  };

  const handleExpand = () => {
    const added = Math.floor(Math.random() * 6) + 3;
    setVisibleNodes(v => v + added);
    showToast(`Expanded 2 hops — ${added} new nodes loaded.`);
  };

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.2, 2));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.2, 0.4));

  const handleNodeClick = (node: typeof NODES[0]) => {
    setSelectedNode(node);
  };

  const isPinned = pinnedNodes.includes(selectedNode.id);

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl flex flex-col h-full w-full overflow-hidden relative">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-700 text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          {toast}
        </div>
      )}

      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/90 z-10 absolute top-0 w-full backdrop-blur-md">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Network className="text-indigo-400" />
          Graph Visualization Sandbox
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePinEvidence}
            className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-bold text-slate-200 transition-colors hover:bg-indigo-700 active:scale-95"
          >
            Pin evidence
          </button>
          <button
            onClick={handleExpand}
            className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-bold text-slate-200 transition-colors hover:bg-slate-700 active:scale-95"
          >
            Expand 2 hops
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 bg-slate-800 hover:bg-slate-700 active:scale-95 rounded-lg text-slate-300 transition-all"
          >
            <ZoomIn size={18} />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 bg-slate-800 hover:bg-slate-700 active:scale-95 rounded-lg text-slate-300 transition-all"
          >
            <ZoomOut size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 relative bg-slate-950 w-full h-full pt-16 flex items-center justify-center overflow-hidden">
        <div className="absolute left-5 top-20 z-10 w-72 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 text-slate-200 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-300">
              <SlidersHorizontal size={18} />
            </div>
            <div>
              <p className="text-sm font-bold">Neo4j controls</p>
              <p className="text-xs text-slate-400">Case-linked entities only</p>
            </div>
          </div>
          <div className="mt-4 space-y-3 text-xs font-medium text-slate-400">
            <div className="flex items-center justify-between rounded-xl bg-slate-800/70 px-3 py-2">
              <span>Visible nodes</span>
              <span className="font-bold text-white">{visibleNodes}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-800/70 px-3 py-2">
              <span>Shortest path</span>
              <span className="font-bold text-white">4 hops</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-800/70 px-3 py-2">
              <span>Evidence pins</span>
              <span className="font-bold text-white">{pinnedNodes.length}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-800/70 px-3 py-2">
              <span>Zoom level</span>
              <span className="font-bold text-white">{Math.round(zoom * 100)}%</span>
            </div>
          </div>
        </div>

        <div className="absolute right-5 top-20 z-10 w-80 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 text-slate-200 backdrop-blur">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-rose-500/10 p-2 text-rose-300">
              <ScanSearch size={18} />
            </div>
            <div>
              <p className="text-sm font-bold">Selected entity: {selectedNode.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">{selectedNode.detail}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-bold">
            <div className="rounded-xl bg-slate-800/70 px-3 py-3">
              <p className="text-slate-400">GNN score</p>
              <p className="mt-1 text-rose-300">{selectedNode.score} / 100</p>
            </div>
            <div className="rounded-xl bg-slate-800/70 px-3 py-3">
              <p className="text-slate-400">Legal tag</p>
              <p className={`mt-1 ${isPinned ? 'text-emerald-300' : 'text-slate-400'}`}>
                {isPinned ? 'Evidence pinned' : 'Not pinned'}
              </p>
            </div>
          </div>
        </div>

        {/* Graph canvas with zoom transform */}
        <div
          className="absolute w-full h-full"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center', transition: 'transform 0.2s ease' }}
        >
          <svg className="absolute w-full h-full pointer-events-none opacity-40">
            <line x1="50%" y1="50%" x2="30%" y2="20%" stroke="#6366f1" strokeWidth="2" strokeDasharray="4" className="animate-pulse" />
            <line x1="50%" y1="50%" x2="70%" y2="30%" stroke="#64748b" strokeWidth="2" />
            <line x1="50%" y1="50%" x2="40%" y2="80%" stroke="#64748b" strokeWidth="2" />
            <line x1="50%" y1="50%" x2="75%" y2="70%" stroke="#ef4444" strokeWidth="3" />
            <line x1="75%" y1="70%" x2="85%" y2="90%" stroke="#ef4444" strokeWidth="3" />
          </svg>

          {/* TXN498 - central suspect */}
          <div
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            onClick={() => handleNodeClick(NODES[0])}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all ${selectedNode.id === 'TXN498' ? 'bg-red-500/40 border-4 border-red-400' : 'bg-red-500/20 border-4 border-red-500'} ${pinnedNodes.includes('TXN498') ? 'ring-2 ring-emerald-400' : ''}`}>
              <span className="text-white font-bold text-xs">TXN498</span>
            </div>
            <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-slate-800 text-slate-200 text-xs py-1 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              GNN Score: 98.4 (Mule)
            </div>
          </div>

          {/* UPI*921 */}
          <div
            className="absolute top-[20%] left-[30%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            onClick={() => handleNodeClick(NODES[1])}
          >
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${selectedNode.id === 'UPI921' ? 'bg-indigo-500/40 border-indigo-400' : 'bg-indigo-500/20 border-indigo-500 hover:bg-indigo-500/40'} ${pinnedNodes.includes('UPI921') ? 'ring-2 ring-emerald-400' : ''}`}>
              <span className="text-indigo-200 font-bold text-[10px]">UPI*921</span>
            </div>
          </div>

          {/* DEV01 */}
          <div
            className="absolute top-[30%] left-[70%] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => handleNodeClick(NODES[2])}
          >
            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${selectedNode.id === 'DEV01' ? 'bg-slate-500 border-slate-300' : 'bg-slate-700 border-slate-500 hover:bg-slate-600'} ${pinnedNodes.includes('DEV01') ? 'ring-2 ring-emerald-400' : ''}`}>
              <span className="text-slate-300 font-bold text-[8px]">DEV01</span>
            </div>
          </div>

          {/* UPI*444 */}
          <div
            className="absolute top-[80%] left-[40%] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => handleNodeClick(NODES[3])}
          >
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${selectedNode.id === 'UPI444' ? 'bg-slate-500 border-slate-300' : 'bg-slate-700 border-slate-500 hover:bg-slate-600'} ${pinnedNodes.includes('UPI444') ? 'ring-2 ring-emerald-400' : ''}`}>
              <span className="text-slate-300 font-bold text-[10px]">UPI*444</span>
            </div>
          </div>

          {/* UPI*999 */}
          <div
            className="absolute top-[70%] left-[75%] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => handleNodeClick(NODES[4])}
          >
            <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-colors ${selectedNode.id === 'UPI999' ? 'bg-red-500/40 border-red-400' : 'bg-red-500/20 border-red-500 hover:bg-red-500/30'} ${pinnedNodes.includes('UPI999') ? 'ring-2 ring-emerald-400' : ''}`}>
              <span className="text-red-200 font-bold text-[10px]">UPI*999</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full border border-slate-800 bg-slate-900/90 px-4 py-2 text-xs font-bold text-slate-300 backdrop-blur">
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-rose-500" /> Suspect nodes</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-indigo-500" /> Linked handles</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-slate-500" /> Devices</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Pinned</span>
=======
import { useState, useEffect, useRef } from 'react';
import { Network, ZoomIn, ZoomOut, RotateCcw, Info, X } from 'lucide-react';

type NodeType = 'mule' | 'suspect' | 'normal' | 'device';
interface GraphNode {
  id: string; label: string; x: number; y: number;
  type: NodeType; score?: number; txCount?: number;
}
interface GraphEdge { from: string; to: string; weight: number; flagged: boolean; }

const INITIAL_NODES: GraphNode[] = [
  { id: 'n1',  label: 'UPI*9876',  x: 50, y: 50, type: 'mule',    score: 98, txCount: 341 },
  { id: 'n2',  label: 'UPI*4421',  x: 22, y: 22, type: 'suspect', score: 88, txCount: 87  },
  { id: 'n3',  label: 'UPI*7710',  x: 72, y: 28, type: 'normal',  score: 12, txCount: 14  },
  { id: 'n4',  label: 'UPI*3318',  x: 40, y: 80, type: 'suspect', score: 83, txCount: 54  },
  { id: 'n5',  label: 'UPI*9990',  x: 75, y: 72, type: 'mule',    score: 95, txCount: 210 },
  { id: 'n6',  label: 'DEV-A1',    x: 18, y: 58, type: 'device',  score: 71, txCount: 28  },
  { id: 'n7',  label: 'UPI*1122',  x: 62, y: 10, type: 'normal',  score: 8,  txCount: 6   },
  { id: 'n8',  label: 'UPI*5544',  x: 85, y: 48, type: 'suspect', score: 79, txCount: 66  },
  { id: 'n9',  label: 'DEV-B3',    x: 30, y: 35, type: 'device',  score: 65, txCount: 33  },
  { id: 'n10', label: 'UPI*8877',  x: 58, y: 60, type: 'normal',  score: 18, txCount: 9   },
];

const INITIAL_EDGES: GraphEdge[] = [
  { from:'n1', to:'n2', weight:3, flagged:true  },
  { from:'n1', to:'n5', weight:4, flagged:true  },
  { from:'n1', to:'n4', weight:2, flagged:true  },
  { from:'n2', to:'n6', weight:2, flagged:false },
  { from:'n2', to:'n9', weight:1, flagged:false },
  { from:'n3', to:'n1', weight:1, flagged:false },
  { from:'n4', to:'n5', weight:3, flagged:true  },
  { from:'n5', to:'n8', weight:2, flagged:true  },
  { from:'n7', to:'n3', weight:1, flagged:false },
  { from:'n8', to:'n1', weight:3, flagged:true  },
  { from:'n9', to:'n1', weight:2, flagged:true  },
  { from:'n10',to:'n3', weight:1, flagged:false },
];

const NODE_COLOR: Record<NodeType, { fill: string; stroke: string; glow: string }> = {
  mule:    { fill:'#fca5a5', stroke:'#ef4444', glow:'rgba(239,68,68,0.6)' },
  suspect: { fill:'#fcd34d', stroke:'#f59e0b', glow:'rgba(245,158,11,0.5)' },
  device:  { fill:'#a5b4fc', stroke:'#6366f1', glow:'rgba(99,102,241,0.5)' },
  normal:  { fill:'#6ee7b7', stroke:'#10b981', glow:'rgba(16,185,129,0.4)' },
};

function pct(v: number, dim: number) { return (v / 100) * dim; }

export const GraphVisualizer = () => {
  const svgRef     = useRef<SVGSVGElement>(null);
  const [nodes, setNodes]   = useState(INITIAL_NODES);
  const [zoom,  setZoom]    = useState(1);
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const [pulse, setPulse]   = useState<string[]>([]);
  const [dim, setDim]       = useState({ w: 800, h: 500 });

  // Measure container
  useEffect(() => {
    const el = svgRef.current?.parentElement;
    if (!el) return;
    const ro = new ResizeObserver(e => {
      const { width, height } = e[0].contentRect;
      setDim({ w: Math.max(400, width), h: Math.max(300, height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Animate nodes: slightly jitter positions every 2s
  useEffect(() => {
    const id = setInterval(() => {
      setNodes(prev => prev.map(n => ({
        ...n,
        x: Math.max(8, Math.min(92, n.x + (Math.random() * 2 - 1))),
        y: Math.max(8, Math.min(92, n.y + (Math.random() * 2 - 1))),
        score: Math.max(5, Math.min(99, (n.score ?? 50) + Math.floor(Math.random() * 5 - 2))),
      })));
    }, 2500);
    return () => clearInterval(id);
  }, []);

  // Pulse random flagged edges
  useEffect(() => {
    const id = setInterval(() => {
      const flaggedEdge = INITIAL_EDGES.filter(e => e.flagged)[Math.floor(Math.random() * INITIAL_EDGES.filter(e=>e.flagged).length)];
      setPulse([flaggedEdge.from, flaggedEdge.to]);
      setTimeout(() => setPulse([]), 800);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));
  const W = dim.w, H = dim.h;
  const nodeR = (n: GraphNode) => n.type === 'mule' ? 22 : n.type === 'device' ? 14 : 18;

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl flex flex-col h-full w-full overflow-hidden relative">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-slate-800 flex justify-between items-center bg-slate-900/80 backdrop-blur-md z-10 flex-shrink-0">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Network className="text-indigo-400" size={18}/> Neo4j Fraud Topology — Cluster Alpha-7
          <span className="text-xs font-semibold text-slate-500 ml-2">{nodes.length} nodes · {INITIAL_EDGES.length} edges</span>
        </h2>
        <div className="flex items-center gap-2">
          {/* Legend */}
          <div className="flex items-center gap-3 mr-3 text-[11px] font-semibold">
            {[['Mule','#ef4444'],['Suspect','#f59e0b'],['Device','#6366f1'],['Normal','#10b981']].map(([l,c]) => (
              <span key={l} className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: c as string }}/>
                {l}
              </span>
            ))}
          </div>
          <button onClick={() => setZoom(z => Math.min(2.5, z + 0.2))} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors"><ZoomIn size={16}/></button>
          <button onClick={() => setZoom(z => Math.max(0.4, z - 0.2))} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors"><ZoomOut size={16}/></button>
          <button onClick={() => { setZoom(1); setSelected(null); }} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors"><RotateCcw size={16}/></button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative overflow-hidden" style={{ minHeight: 0 }}>
        <svg ref={svgRef} width="100%" height="100%" className="absolute inset-0"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center', transition: 'transform 0.3s ease' }}
        >
          <defs>
            {Object.entries(NODE_COLOR).map(([type, c]) => (
              <filter key={type} id={`glow-${type}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            ))}
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
            </marker>
            <marker id="arrow-red" markerWidth="8" markerHeight="8" refX="8" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#ef4444"/>
            </marker>
          </defs>

          {/* Background grid */}
          {Array.from({ length: Math.ceil(W/40) }).map((_, i) => (
            <line key={'gx'+i} x1={i*40} y1={0} x2={i*40} y2={H} stroke="#1e293b" strokeWidth="1"/>
          ))}
          {Array.from({ length: Math.ceil(H/40) }).map((_, i) => (
            <line key={'gy'+i} x1={0} y1={i*40} x2={W} y2={i*40} stroke="#1e293b" strokeWidth="1"/>
          ))}

          {/* Edges */}
          {INITIAL_EDGES.map((e, i) => {
            const a = nodeMap[e.from], b = nodeMap[e.to];
            if (!a || !b) return null;
            const isPulsing = pulse.includes(e.from) && pulse.includes(e.to);
            return (
              <line key={i}
                x1={pct(a.x, W)} y1={pct(a.y, H)}
                x2={pct(b.x, W)} y2={pct(b.y, H)}
                stroke={e.flagged ? (isPulsing ? '#ef4444' : '#991b1b') : '#334155'}
                strokeWidth={e.flagged ? e.weight + 1 : e.weight}
                strokeOpacity={e.flagged ? 0.8 : 0.4}
                strokeDasharray={e.flagged ? '0' : '4 3'}
                markerEnd={e.flagged ? 'url(#arrow-red)' : 'url(#arrow)'}
                style={{ transition: 'stroke 0.4s, stroke-opacity 0.4s' }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map(n => {
            const c = NODE_COLOR[n.type];
            const r = nodeR(n);
            const cx = pct(n.x, W), cy = pct(n.y, H);
            const isSelected = selected?.id === n.id;
            const isPulsing  = pulse.includes(n.id);
            return (
              <g key={n.id} onClick={() => setSelected(isSelected ? null : n)} style={{ cursor: 'pointer' }}>
                {/* Glow ring */}
                {(n.type === 'mule' || isPulsing) && (
                  <circle cx={cx} cy={cy} r={r + 8} fill={c.glow} opacity={isPulsing ? 0.7 : 0.3}
                    style={{ animation: 'ping 1.5s ease infinite' }}/>
                )}
                {/* Selection ring */}
                {isSelected && <circle cx={cx} cy={cy} r={r + 5} fill="none" stroke="white" strokeWidth="2" strokeDasharray="4 2"/>}
                {/* Node circle */}
                <circle cx={cx} cy={cy} r={r} fill={c.fill} stroke={c.stroke} strokeWidth={isSelected ? 3 : 2}
                  filter={`url(#glow-${n.type})`}
                  style={{ transition: 'cx 1s ease, cy 1s ease' }}
                />
                {/* Label */}
                <text x={cx} y={cy + r + 14} textAnchor="middle" fontSize="10" fill="#94a3b8" fontWeight="600"
                  style={{ pointerEvents: 'none' }}>{n.label}</text>
                {/* Score badge on mule/suspect */}
                {(n.type === 'mule' || n.type === 'suspect') && (
                  <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fill="#1e293b" fontWeight="900"
                    style={{ pointerEvents: 'none' }}>{n.score}</text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Node Detail Panel */}
        {selected && (
          <div className="absolute top-4 right-4 bg-slate-900/95 border border-slate-700 rounded-2xl p-5 w-60 shadow-2xl backdrop-blur-sm animate-in fade-in slide-in-from-right-4 z-20">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-white font-black text-base">{selected.label}</h4>
              <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-white transition-colors"><X size={15}/></button>
            </div>
            <div className="space-y-2.5">
              {[
                { label: 'Type',       value: selected.type.charAt(0).toUpperCase() + selected.type.slice(1) },
                { label: 'GNN Score',  value: `${selected.score ?? 'N/A'}%` },
                { label: 'Tx Count',   value: `${selected.txCount ?? '?'} transactions` },
                { label: 'In Cluster', value: 'Alpha-7' },
              ].map((f, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-slate-500 font-semibold">{f.label}</span>
                  <span className={`font-bold ${f.label === 'GNN Score' && (selected.score ?? 0) > 80 ? 'text-red-400' : 'text-slate-200'}`}>{f.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700 flex flex-col gap-2">
              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-red-500 transition-all duration-700"
                  style={{ width: `${selected.score ?? 0}%` }}/>
              </div>
              <div className="flex gap-2 mt-1">
                <button className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors">Investigate</button>
                <button className="flex-1 py-1.5 bg-red-900/50 hover:bg-red-900 text-red-300 text-xs font-bold rounded-lg transition-colors border border-red-800">Block Node</button>
              </div>
            </div>
          </div>
        )}

        {/* Watermark */}
        <div className="absolute bottom-4 left-5 text-slate-700 text-xs font-bold select-none pointer-events-none">
          GuardUPI · Neo4j v5.x · GNN v2.4
>>>>>>> 02022c2b6ec7e05a30b2d70f343f3cc82a783a60
        </div>
      </div>
    </div>
  );
};