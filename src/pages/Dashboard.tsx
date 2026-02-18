import { useEffect, useState } from 'react';
import { TrendingUp, Package, DollarSign, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { supabase, Byproduct } from '../lib/supabase';
import { ErrorBoundary } from '../components/ErrorBoundary';

/*
// Fix for default Leaflet icons in React/Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});
*/

const chartData = [
  { name: 'Week 1', value: 1200 },
  { name: 'Week 2', value: 1900 },
  { name: 'Week 3', value: 1500 },
  { name: 'This Week', value: 2200 },
];

const dummyData: Byproduct[] = [
  {
    id: 1,
    material: 'High-Grade Copper Wire',
    routing: 'Ambattur Node → Match Engine',
    distance: '3.2 km',
    rawVolume: 15.5,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    material: 'Industrial Cotton Offcuts',
    routing: 'Ambattur Node → Match Engine',
    distance: '5.8 km',
    rawVolume: 22.3,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    material: 'PET Plastic Scrap',
    routing: 'Ambattur Node → Match Engine',
    distance: '2.1 km',
    rawVolume: 18.7,
    created_at: new Date().toISOString(),
  },
];

export function Dashboard() {
  const [byproducts, setByproducts] = useState<Byproduct[]>(dummyData);
  const [totalDiverted, setTotalDiverted] = useState(104.2);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchByproducts();

    // Fix for default Leaflet icons in React/Vite
    // Running this in useEffect ensures window is defined and hydration complete
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  async function fetchByproducts() {
    try {
      const { data, error } = await supabase
        .from('byproducts')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setByproducts(data);
        const total = data.reduce((sum, item) => sum + Number(item.rawVolume), 0);
        setTotalDiverted(Number(total.toFixed(1)));
      }
    } catch (error) {
      console.error('Error fetching byproducts:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Active Nodes"
          value="42"
          icon={Package}
          iconColor="text-emerald-500"
          bgColor="from-emerald-500/10 to-emerald-500/5"
          badge={
            <span className="flex items-center gap-1 text-sm text-emerald-500">
              <TrendingUp className="w-4 h-4" />
              +3
            </span>
          }
        />
        <KPICard
          title="Tonnes Diverted"
          value={totalDiverted.toString()}
          icon={TrendingUp}
          iconColor="text-blue-500"
          bgColor="from-blue-500/10 to-blue-500/5"
        />
        <KPICard
          title="OPEX Saved"
          value="₹42,500"
          icon={DollarSign}
          iconColor="text-green-600"
          bgColor="from-green-500/10 to-green-500/5"
          valueColor="text-green-600"
        />
        <KPICard
          title="DB Latency"
          value="14ms"
          icon={Zap}
          iconColor="text-blue-600"
          bgColor="from-blue-500/10 to-blue-500/5"
          valueColor="text-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6">CO2-e Mitigation (kg)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-xl overflow-hidden h-[400px]">
          <ErrorBoundary>
            <MapContainer center={[13.0983, 80.1622]} zoom={12} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {byproducts.map((item) => (
                // Randomize coordinates around Ambattur, Chennai (13.0983, 80.1622)
                <Marker
                  key={item.id}
                  position={[
                    13.0983 + (Math.random() - 0.5) * 0.04,
                    80.1622 + (Math.random() - 0.5) * 0.04
                  ]}
                >
                  <Popup>
                    <div className="text-slate-900">
                      <strong>{item.custom_material || item.material}</strong><br />
                      {item.rawVolume} Tonnes<br />
                      {item.routing}
                    </div>
                  </Popup>
                </Marker>
              ))}
              <Marker position={[13.0983, 80.1622]}>
                <Popup>
                  <div className="text-slate-900">
                    <strong>Ambattur Industrial Estate</strong><br />
                    Central Hub
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </ErrorBoundary>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Hyper-Local Smart Matches</h2>
          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded-full border border-green-500/30">
            Live SQL Sync
          </span>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-4 text-slate-300 font-semibold">Asset</th>
                  <th className="text-left py-4 px-4 text-slate-300 font-semibold">Trajectory</th>
                  <th className="text-left py-4 px-4 text-slate-300 font-semibold">Haulage</th>
                  <th className="text-left py-4 px-4 text-slate-300 font-semibold">Volume</th>
                  <th className="text-left py-4 px-4 text-slate-300 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {byproducts.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <td className="py-4 px-4">
                      <span className="text-white font-medium">{item.material}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-slate-300">{item.routing}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-cyan-400 font-medium">{item.distance}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-slate-300">{item.rawVolume} T</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/30">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

interface KPICardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
  valueColor?: string;
  badge?: React.ReactNode;
}

function KPICard({ title, value, icon: Icon, iconColor, bgColor, valueColor, badge }: KPICardProps) {
  return (
    <div className={`bg-gradient-to-br ${bgColor} backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${iconColor} bg-slate-800/50 rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
        {badge}
      </div>
      <h3 className="text-slate-400 text-sm font-medium mb-2">{title}</h3>
      <p className={`text-3xl font-bold ${valueColor || 'text-white'}`}>{value}</p>
    </div>
  );
}
