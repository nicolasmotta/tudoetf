import Head from 'next/head'
import React from 'react'
import Filters from '@/components/Filters'
import ScreenerTable from '@/components/ScreenerTable'

export default function Home(){
  const [q,setQ] = React.useState('')
  const [assetClass,setAssetClass] = React.useState('')
  const [domicile,setDomicile] = React.useState('')
  const [maxTer,setMaxTer] = React.useState(1.0)
  const [minAum,setMinAum] = React.useState(0)
  const [minYield,setMinYield] = React.useState(0)
  const [sortBy,setSortBy] = React.useState('aumMM')
  const [sortDir,setSortDir] = React.useState<'asc'|'desc'>('desc')
  const [page,setPage] = React.useState(1)
  const [pageSize,setPageSize] = React.useState(20)
  const [items,setItems] = React.useState<any[]>([])
  const [total,setTotal] = React.useState(0)
  const [loading,setLoading] = React.useState(false)

  const params = new URLSearchParams({
    q, assetClass, domicile,
    maxTer: String(maxTer*100),
    minAum: String(minAum),
    minYield: String(minYield),
    sortBy, sortDir,
    page: String(page), pageSize: String(pageSize)
  })
  const fetchData = async () => {
    setLoading(true)
    const res = await fetch('/api/etfs?'+params.toString())
    const data = await res.json()
    setItems(data.items); setTotal(data.total)
    setLoading(false)
  }
  React.useEffect(()=>{ setPage(1) }, [q,assetClass,domicile,maxTer,minAum,minYield,sortBy,sortDir,pageSize])
  React.useEffect(()=>{ fetchData() }, [q,assetClass,domicile,maxTer,minAum,minYield,sortBy,sortDir,page,pageSize])

  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  return (
    <>
      <Head>
        <title>TudoETF Screener – MVP</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Filtro e comparação de ETFs do Brasil e do exterior" />
      </Head>
      <main className="min-h-screen bg-gray-50 text-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">TudoETF Screener</h1>
              <p className="text-sm text-gray-600">Filtro e comparação de ETFs do Brasil e do exterior.</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <label>Linhas:</label>
              <select className="rounded-xl border p-2" value={pageSize} onChange={e=>setPageSize(parseInt(e.target.value))}>
                {[10,20,50,100].map(n=> <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </header>

          <Filters q={q} setQ={setQ} assetClass={assetClass} setAssetClass={setAssetClass}
            domicile={domicile} setDomicile={setDomicile} maxTer={maxTer} setMaxTer={setMaxTer}
            minAum={minAum} setMinAum={setMinAum} minYield={minYield} setMinYield={setMinYield} />

          {loading ? <div className="p-6">Carregando…</div> : <ScreenerTable items={items} sortBy={sortBy} sortDir={sortDir} setSortBy={setSortBy} setSortDir={setSortDir} />}

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">Total: {total}</div>
            <div className="flex items-center gap-2">
              <button disabled={page<=1} onClick={()=>setPage(p=>p-1)} className="px-3 py-2 rounded-xl border bg-white disabled:opacity-40">Anterior</button>
              <span className="text-sm">Página {page} de {totalPages}</span>
              <button disabled={page>=totalPages} onClick={()=>setPage(p=>p+1)} className="px-3 py-2 rounded-xl border bg-white disabled:opacity-40">Próxima</button>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            * MVP com dados locais. Em produção, conectar a fontes oficiais (B3, administradores/ANBIMA, prospectos, UCITS e EUA).
          </p>
        </div>
      </main>
    </>
  )
}
