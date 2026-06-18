'use client';
import React, { useState } from 'react';

const mockFlights = [
  { id: 'f1', type: 'aereo', provider: 'LATAM', code: 'LA3450', route: 'GRU ➔ FOR', time: '08:00 - 11:15', price: 850.00, family: 'Top' },
  { id: 'f2', type: 'aereo', provider: 'GOL', code: 'G31642', route: 'GRU ➔ FOR', time: '09:30 - 12:45', price: 720.00, family: 'Plus' }
];

const mockHotels = [
  { id: 'h1', type: 'hotel', provider: 'Seara Praia Hotel', location: 'Fortaleza (Beira Mar)', rating: '⭐ 4.5', price: 420.00, room: 'Luxo Vista Mar' },
  { id: 'h2', type: 'hotel', provider: 'Gran Marquise', location: 'Fortaleza (Mucuripe)', rating: '⭐ 5.0', price: 680.00, room: 'Superior Casal' }
];

export default function AeroCanvasPortal() {
  const [activeTab, setActiveTab] = useState('aereo');
  const [drawerData, setDrawerData] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openPopUp = (item, contextType) => {
    setDrawerData({ ...item, contextType });
    setIsDrawerOpen(true);
    console.log(`Supabase Log: Usuário auditou ${contextType} do produto ${item.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-6">
      <header className="max-w-5xl mx-auto mb-6 bg-white rounded-xl p-4 flex justify-between items-center border border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Sandbox Lab</span>
          <h1 className="text-xl font-bold text-slate-900">AeroLayer Canvas</h1>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('aereo')} 
            className={`px-4 py-1.5 rounded-md text-xs font-bold ${activeTab === 'aereo' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}>
            ✈️ Passagens
          </button>
          <button 
            onClick={() => setActiveTab('hotel')} 
            className={`px-4 py-1.5 rounded-md text-xs font-bold ${activeTab === 'hotel' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}>
            🏨 Hotéis
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto space-y-3">
        {activeTab === 'aereo' && mockFlights.map((flight) => (
          <div key={flight.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{flight.provider}</span>
              <p className="text-sm font-semibold mt-1">{flight.code} • {flight.family}</p>
            </div>
            <div className="text-center">
              <span className="text-base font-bold block">{flight.route}</span>
              <span className="text-xs text-slate-400">{flight.time}</span>
            </div>
            <div className="flex gap-2 text-xs">
              <button onClick={() => openPopUp(flight, 'bagagem')} className="text-indigo-600 border border-slate-200 px-3 py-1.5 rounded-lg font-medium">🧳 Ver Bagagem</button>
              <button onClick={() => openPopUp(flight, 'regras_tarifa')} className="text-indigo-600 border border-slate-200 px-3 py-1.5 rounded-lg font-medium">📋 Regras</button>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Tarifa Net</span>
              <span className="text-lg font-extrabold text-slate-900">R$ {flight.price.toFixed(2)}</span>
            </div>
          </div>
        ))}

        {activeTab === 'hotel' && mockHotels.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base">{hotel.provider}</h3>
                <span className="text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">{hotel.rating}</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{hotel.location} • {hotel.room}</p>
            </div>
            <div className="flex gap-2 text-xs">
              <button onClick={() => openPopUp(hotel, 'fotos_quarto')} className="text-indigo-600 border border-slate-200 px-3 py-1.5 rounded-lg font-medium">📸 Ver Fotos</button>
              <button onClick={() => openPopUp(hotel, 'politica_cancelamento')} className="text-indigo-600 border border-slate-200 px-3 py-1.5 rounded-lg font-medium">❌ Cancelamento</button>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Diária Média</span>
              <span className="text-lg font-extrabold text-slate-900">R$ {hotel.price.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </main>

      {isDrawerOpen && drawerData && (
        <div className="fixed inset-0 bg-slate-950/20 z-50 flex justify-end" onClick={() => setIsDrawerOpen(false)}>
          <div className="bg-white w-full max-w-sm h-full p-6 flex flex-col justify-between border-l border-slate-200" onClick={(e) => e.stopPropagation()}>
            <div>
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">{drawerData.contextType.replace('_', ' ')}</h3>
                <button onClick={() => setIsDrawerOpen(false)} className="text-slate-400 font-bold p-1">✕</button>
              </div>
              <div className="text-sm text-slate-600 space-y-3">
                <p className="font-bold text-slate-800">{drawerData.provider}</p>
                {drawerData.contextType === 'bagagem' && <p>🎒 Mochila de mão + 🧳 Mala de cabine 10kg inclusas.</p>}
                {drawerData.contextType === 'regras_tarifa' && <p>🔄 Alteração mediante taxa de R$ 350. Non-refundable.</p>}
                {drawerData.contextType === 'fotos_quarto' && <p className="italic text-slate-400">[Galeria de fotos simulada]</p>}
                {drawerData.contextType === 'politica_cancelamento' && <p className="text-emerald-700 font-semibold">✓ Cancelamento gratuito disponível.</p>}
              </div>
            </div>
            <button onClick={() => setIsDrawerOpen(false)} className="w-full bg-slate-900 text-white py-2.5 rounded-lg text-xs font-medium">Fechar e Voltar</button>
          </div>
        </div>
      )}
    </div>
  );
}
