import React from 'react'
type Props = {
  q: string; setQ: (v: string)=>void;
  assetClass: string; setAssetClass: (v: string)=>void;
  domicile: string; setDomicile: (v: string)=>void;
  maxTer: number; setMaxTer: (v: number)=>void;
  minAum: number; setMinAum: (v: number)=>void;
  minYield: number; setMinYield: (v: number)=>void;
}
export default function Filters(p: Props){
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-5">
      <div className="md:col-span-4">
        <label className="text-xs font-medium">Buscar (ticker, nome, emissor, categoria)</label>
        <input value={p.q} onChange={e=>p.setQ(e.target.value)} placeholder="Ex: S&P 500, BOVA11, BlackRock" className="w-full mt-1 rounded-xl border p-2 outline-none focus:ring-2 focus:ring-gray-300" />
      </div>
      <div className="md:col-span-2">
        <label className="text-xs font-medium">Classe</label>
        <select value={p.assetClass} onChange={e=>p.setAssetClass(e.target.value)} className="w-full mt-1 rounded-xl border p-2">
          <option value="">Todas</option>
          <option>Ações</option>
          <option>Renda Fixa</option>
          <option>Ouro/Commodities</option>
          <option>Multimercado</option>
          <option>Cripto</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="text-xs font-medium">Domicílio</label>
        <select value={p.domicile} onChange={e=>p.setDomicile(e.target.value)} className="w-full mt-1 rounded-xl border p-2">
          <option value="">Todos</option>
          <option>Brasil</option>
          <option>EUA</option>
          <option>Irlanda</option>
          <option>Luxemburgo</option>
          <option>Outro</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="text-xs font-medium">TER máx. (%)</label>
        <div className="flex items-center gap-3 mt-1">
          <input type="range" min={0} max={1.0} step={0.01} value={p.maxTer} onChange={e=>p.setMaxTer(parseFloat(e.target.value))} className="w-full" />
          <div className="w-16 text-right text-sm tabular-nums">{(p.maxTer*100).toFixed(0)}</div>
        </div>
      </div>
      <div className="md:col-span-1">
        <label className="text-xs font-medium">PL mín. (mi)</label>
        <input type="number" min={0} value={p.minAum} onChange={e=>p.setMinAum(parseFloat(e.target.value||'0'))} className="w-full mt-1 rounded-xl border p-2" />
      </div>
      <div className="md:col-span-1">
        <label className="text-xs font-medium">Dividend Yield mín. (%)</label>
        <input type="number" min={0} step={0.1} value={p.minYield} onChange={e=>p.setMinYield(parseFloat(e.target.value||'0'))} className="w-full mt-1 rounded-xl border p-2" />
      </div>
    </div>
  )
}
