import Link from 'next/link'
type ETF = any
export default function ScreenerTable({ items, sortBy, sortDir, setSortBy, setSortDir }:{
  items: ETF[],
  sortBy: string,
  sortDir: 'asc'|'desc',
  setSortBy: (v: string)=>void,
  setSortDir: (v: 'asc'|'desc')=>void
}){
  const cols = [
    ['ticker','Ticker'],
    ['name','Nome'],
    ['issuer','Emissor'],
    ['domicile','Domicílio'],
    ['exchange','Bolsa'],
    ['assetClass','Classe'],
    ['category','Categoria'],
    ['ter','TER (%)'],
    ['aumMM','PL (mi)'],
    ['avgVolMM','Vol. méd.'],
    ['price','Preço'],
    ['dividendYield','Yield (%)'],
  ]
  return (
    <div className="overflow-auto rounded-2xl border bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 sticky top-0">
          <tr className="text-left">
            {cols.map(([key, label]) => (
              <th key={key} className="py-3 px-3 font-semibold select-none">
                <button
                  className={`flex items-center gap-1 ${sortBy===key?'text-black':'text-gray-700'}`}
                  onClick={() => {
                    if (sortBy === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                    else { setSortBy(key!); setSortDir('desc'); }
                  }}
                >
                  <span>{label}</span>
                  <span className="text-xs">{sortBy===key ? (sortDir==='asc'?'▲':'▼') : ''}</span>
                </button>
              </th>
            ))}
            <th className="py-3 px-3 font-semibold">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {items.map((etf:any)=> (
            <tr key={etf.ticker} className="border-t hover:bg-gray-50">
              <td className="py-2 px-3 font-mono font-semibold"><Link href={`/etf/${etf.ticker}`}>{etf.ticker}</Link></td>
              <td className="py-2 px-3">{etf.name}</td>
              <td className="py-2 px-3">{etf.issuer}</td>
              <td className="py-2 px-3">{etf.domicile}</td>
              <td className="py-2 px-3">{etf.exchange}</td>
              <td className="py-2 px-3">{etf.assetClass}</td>
              <td className="py-2 px-3">{etf.category}</td>
              <td className="py-2 px-3 tabular-nums">{etf.ter.toFixed(2)}</td>
              <td className="py-2 px-3 tabular-nums">{Math.round(etf.aumMM)}</td>
              <td className="py-2 px-3 tabular-nums">{etf.avgVolMM.toFixed(2)}</td>
              <td className="py-2 px-3 tabular-nums">{etf.price.toFixed(2)}</td>
              <td className="py-2 px-3 tabular-nums">{etf.dividendYield.toFixed(2)}</td>
              <td className="py-2 px-3"><Link href={`/etf/${etf.ticker}`} className="text-blue-700 hover:underline">Detalhes</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
