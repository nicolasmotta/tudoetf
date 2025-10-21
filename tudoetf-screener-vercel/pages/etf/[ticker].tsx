import { useRouter } from 'next/router'
import Link from 'next/link'
import React from 'react'

export default function ETFDetail(){
  const router = useRouter()
  const { ticker } = router.query
  const [item,setItem] = React.useState<any>(null)

  React.useEffect(()=>{
    if(!ticker) return
    fetch('/api/etfs?ticker='+ticker).then(r=>r.json()).then(d=>{
      if(d.items && d.items.length) setItem(d.items[0])
    })
  },[ticker])

  if(!item) return <div className="p-6">Carregando…</div>

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-700 hover:underline">← Voltar</Link>
        <h1 className="text-3xl font-bold mt-2">{item.ticker} — {item.name}</h1>
        <p className="text-gray-600 mb-4">{item.assetClass} · {item.category} · {item.exchange}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border bg-white p-4">
            <h2 className="font-semibold mb-2">Informações</h2>
            <ul className="text-sm space-y-1">
              <li><b>Emissor:</b> {item.issuer}</li>
              <li><b>Domicílio:</b> {item.domicile}</li>
              <li><b>Moeda:</b> {item.currency}</li>
              <li><b>TER:</b> {item.ter}%</li>
              <li><b>PL (mi):</b> {Math.round(item.aumMM)}</li>
              <li><b>Preço:</b> {item.price}</li>
              <li><b>Yield:</b> {item.dividendYield}%</li>
              <li><b>Replicação:</b> {item.replication}</li>
              <li><b>BDR:</b> {item.isBDR ? 'Sim' : 'Não'}</li>
              <li><b>Início:</b> {item.inception}</li>
            </ul>
          </div>
          <div className="rounded-2xl border bg-white p-4">
            <h2 className="font-semibold mb-2">Notas</h2>
            <p className="text-sm text-gray-700">Aqui entram histórico de cota, dividendos, holdings principais e tracking difference. Podemos embutir gráficos reais assim que a API estiver conectada.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
