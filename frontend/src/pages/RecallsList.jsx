// src/pages/RecallsList.jsx
import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function RecallsList() {
  const [q, setQ] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const limit = 10;

  async function load() {
    setLoading(true);
    try {
      const query = new URLSearchParams({ q, skip: String(skip), limit: String(limit) });
      const rows = await api.request(`/recalls/?${query.toString()}`);
      setData(rows || []);
    } catch (e) {
      console.error(e);
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{ load(); }, [q, skip]);

  async function enrichNow(id) {
    try {
      const res = await api.request(`/recalls/${id}/enrich?sync=true`, { method: "POST" });
      // update list item in place
      setData(d=>d.map(r => r.id === res.id ? res : r));
    } catch (err) {
      alert("Enrich failed");
    }
  }

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="search" className="flex-1 p-2 border rounded" />
        <Link to="/ingest" className="px-3 py-2 bg-indigo-600 text-white rounded">Ingest FDA</Link>
      </div>

      {loading ? <div>Loading…</div> : (
        <div className="space-y-4">
          {data.map(r => (
            <div key={r.id} className="bg-white p-4 rounded shadow flex justify-between items-start">
              <div>
                <Link to={`/recalls/${r.id}`} className="text-lg font-medium text-sky-700">{r.product_name}</Link>
                <div className="text-sm text-slate-600">{r.reason}</div>
                <div className="mt-2 text-sm">
                  {r.severity && <span className="px-2 py-1 mr-2 rounded bg-red-100 text-red-800">{r.severity}</span>}
                  {r.categories?.map(c=> <span key={c} className="px-2 py-1 mr-1 rounded bg-slate-100 text-slate-700">{c}</span>)}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={()=>enrichNow(r.id)} className="px-3 py-1 bg-yellow-500 text-white rounded">Enrich</button>
                <Link to={`/recalls/${r.id}`} className="px-3 py-1 bg-slate-200 rounded">View</Link>
              </div>
            </div>
          ))}
          <div className="flex justify-between">
            <button onClick={()=>setSkip(s => Math.max(0, s - limit))} className="p-2 bg-slate-200 rounded">Prev</button>
            <button onClick={()=>setSkip(s => s + limit)} className="p-2 bg-slate-200 rounded">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
