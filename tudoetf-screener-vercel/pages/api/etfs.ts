import { NextApiRequest, NextApiResponse } from 'next'
import data from '@/data/etfs.json'

type ETF = typeof data[number]

function norm(s:string){ return s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase() }

export default function handler(req: NextApiRequest, res: NextApiResponse){
  const {
    q = '', assetClass = '', domicile = '',
    maxTer = '100', minAum = '0', minYield = '0',
    sortBy = 'aumMM', sortDir = 'desc',
    page = '1', pageSize = '20', ticker = ''
  } = req.query

  let rows: ETF[] = data

  if (ticker) {
    rows = rows.filter(r => r.ticker.toLowerCase() === String(ticker).toLowerCase())
  }

  const qn = norm(String(q))
  if(qn){
    rows = rows.filter(r => norm(`${r.ticker} ${r.name} ${r.category} ${r.issuer}`).includes(qn))
  }
  if(assetClass){ rows = rows.filter(r => r.assetClass === assetClass) }
  if(domicile){ rows = rows.filter(r => r.domicile === domicile) }

  const maxTerVal = parseFloat(String(maxTer))
  const minAumVal = parseFloat(String(minAum))
  const minYieldVal = parseFloat(String(minYield))
  rows = rows.filter(r => r.ter <= maxTerVal && r.aumMM >= minAumVal && r.dividendYield >= minYieldVal)

  const sb = String(sortBy) as keyof ETF
  const sd = String(sortDir) === 'asc' ? 1 : -1
  rows = rows.sort((a:any,b:any)=>{
    const x=a[sb], y=b[sb]
    if(typeof x === 'number' && typeof y === 'number') return sd*(x-y)
    return sd*String(x).localeCompare(String(y))
  })

  const total = rows.length
  const p = Math.max(1, parseInt(String(page)))
  const ps = Math.max(1, Math.min(200, parseInt(String(pageSize))))
  const start = (p-1)*ps
  const items = rows.slice(start, start+ps)
  res.status(200).json({ items, total, page: p, pageSize: ps })
}
