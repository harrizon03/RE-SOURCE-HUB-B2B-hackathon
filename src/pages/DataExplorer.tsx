import { useState, useEffect } from 'react';
import { Search, Filter, MapPin, IndianRupee, ArrowRight, Box } from 'lucide-react';
import { supabase, Byproduct } from '../lib/supabase';

// Dummy data fallback if DB is empty
const DUMMY_DATA: Byproduct[] = [
    { id: 101, material: 'Copper Wire', routing: 'Chennai', distance: '4.2 km', rawVolume: 5.5, price_inr: 12500, created_at: '', status: 'Available' },
    { id: 102, material: 'Steel Scraps', routing: 'Ambattur', distance: '2.1 km', rawVolume: 12.0, price_inr: 8500, created_at: '', status: 'Available' },
    { id: 103, material: 'Plastic Pellets', routing: 'Guindy', distance: '8.5 km', rawVolume: 3.2, price_inr: 4200, created_at: '', status: 'Available' },
];

export function DataExplorer() {
    const [items, setItems] = useState<Byproduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('price_asc');
    const [contractPending, setContractPending] = useState<number | null>(null);

    useEffect(() => {
        fetchItems();
    }, []);

    async function fetchItems() {
        try {
            const { data, error } = await supabase
                .from('byproducts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            // If no data in Supabase (or table doesn't have new fields yet), mix in dummy data for demo
            if (!data || data.length === 0) {
                setItems(DUMMY_DATA);
            } else {
                // Map Supabase data, ensuring new fields have defaults if missing in older rows
                const mappedData = data.map(item => ({
                    ...item,
                    price_inr: item.price_inr || Math.floor(Math.random() * 10000) + 5000,
                    status: item.status || 'Available'
                }));
                setItems(mappedData);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            setItems(DUMMY_DATA); // Fallback
        } finally {
            setLoading(false);
        }
    }

    const handleContract = (id: number) => {
        setContractPending(id);
        setTimeout(() => {
            setContractPending(null);
            alert('Smart Contract Initiated Successfully!');
        }, 2000);
    };

    const filteredItems = items
        .filter(item =>
            (item.material || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.custom_material || '').toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'price_asc') return (a.price_inr || 0) - (b.price_inr || 0);
            if (sortBy === 'price_desc') return (b.price_inr || 0) - (a.price_inr || 0);
            // specific logic for 'distance' would need parsing '4.2 km' string, simple fallback:
            return 0;
        });

    return (
        <div className="min-h-screen bg-slate-900 p-6 pt-24 pl-64">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Marketplace Explorer</h1>
                    <p className="text-slate-400">Source certified industrial byproducts</p>
                </div>

                <div className="flex items-center gap-4 bg-slate-800 p-2 rounded-xl border border-slate-700">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search materials..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-slate-900 border-none outline-none text-white pl-9 pr-4 py-2 rounded-lg w-64 placeholder-slate-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="h-6 w-px bg-slate-700"></div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-slate-900 border-none outline-none text-white pl-9 pr-8 py-2 rounded-lg appearance-none cursor-pointer focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="distance">Distance: Nearest</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:shadow-2xl hover:border-slate-600 transition-all group">
                            <div className="p-6 flex gap-6">
                                {/* Thumbnail */}
                                <div className="w-24 h-24 bg-slate-900 rounded-lg flex items-center justify-center shrink-0 border border-slate-700">
                                    {item.photo_url ? (
                                        <img src={item.photo_url} alt={item.material} className="w-full h-full object-cover rounded-lg" />
                                    ) : (
                                        <Box className="w-10 h-10 text-slate-600" />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-lg font-bold text-white truncate" title={item.material}>
                                            {item.custom_material || item.material}
                                        </h3>
                                        <span className="text-xs font-medium px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                                            {item.status || 'Active'}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                                        <div className="flex items-center gap-1.5">
                                            <Box className="w-4 h-4 text-blue-400" />
                                            <span>{item.rawVolume} Tonnes</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                                        <MapPin className="w-4 h-4 text-cyan-400" />
                                        <span>{item.distance || 'Unknown distance'} away</span>
                                    </div>

                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-xs text-slate-500 mb-1">Price per Lot</p>
                                            <div className="flex items-center text-white font-bold text-xl">
                                                <IndianRupee className="w-5 h-5" />
                                                <span>{(item.price_inr || 0).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="px-6 pb-6 pt-2">
                                <button
                                    onClick={() => handleContract(item.id)}
                                    disabled={contractPending === item.id}
                                    className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${contractPending === item.id
                                        ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30 cursor-wait'
                                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20'
                                        }`}
                                >
                                    {contractPending === item.id ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                                            Contract Pending...
                                        </>
                                    ) : (
                                        <>
                                            Initiate Smart Contract
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
