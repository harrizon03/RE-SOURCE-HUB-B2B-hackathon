import { useState } from 'react';
import { Save, Building, Key, MapPin, Sliders, Bell, FileCheck, CheckCircle2, Copy } from 'lucide-react';

export function Settings() {
    const [role, setRole] = useState<'BUYER' | 'SELLER'>('BUYER'); // Role toggle for demo purposes
    const [saving, setSaving] = useState(false);

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            alert('Configurations Saved Successfully!');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-900 p-6 pt-24 pl-64 text-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Enterprise Configuration</h1>
                        <p className="text-slate-400 mt-1">Manage node profile and network protocols</p>
                    </div>

                    {/* Role Toggle for Demo */}
                    <div className="bg-slate-800 p-1 rounded-lg border border-slate-700 flex">
                        <button
                            onClick={() => setRole('BUYER')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${role === 'BUYER' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            Buyer View
                        </button>
                        <button
                            onClick={() => setRole('SELLER')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${role === 'SELLER' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            Seller View
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Global Settings */}
                    <div className="space-y-6">
                        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                    <Building className="w-5 h-5 text-blue-400" />
                                </div>
                                <h2 className="text-xl font-bold">Node Profile</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Company Name</label>
                                    <input type="text" defaultValue="Re-Source Hub Industries Pvt Ltd" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5">GSTIN / Corporate ID</label>
                                    <input type="text" defaultValue="33AABCR1234H1Z5" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Ambattur Sector Address</label>
                                    <div className="flex gap-2">
                                        <div className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 flex items-center justify-center shrink-0 text-slate-400">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <input type="text" defaultValue="Plot 42, 3rd Main Rd, Industrial Estate, Ambattur, Chennai" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                                    <Key className="w-5 h-5 text-purple-400" />
                                </div>
                                <h2 className="text-xl font-bold">Developer API</h2>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">API Secret Key</label>
                                <div className="flex gap-2">
                                    <input readOnly type="text" value="sk_live_51M..." className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-400 font-mono" />
                                    <button
                                        onClick={() => alert('Copied to clipboard')}
                                        className="bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg px-4 flex items-center transition-colors"
                                    >
                                        <Copy className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500 mt-2">Used for programmatic access to the Smart Contract Ledger.</p>
                            </div>
                        </section>
                    </div>

                    {/* Role Specific Settings */}
                    <div className="space-y-6">
                        {role === 'BUYER' ? (
                            <>
                                <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                                            <Sliders className="w-5 h-5 text-orange-400" />
                                        </div>
                                        <h2 className="text-xl font-bold">Logistics Constraints</h2>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <label className="text-sm font-medium text-slate-300">Maximum Haulage Radius</label>
                                                <span className="text-sm font-bold text-blue-400">15 km</span>
                                            </div>
                                            <input type="range" min="1" max="50" defaultValue="15" className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                                            <div className="flex justify-between mt-1 text-xs text-slate-500">
                                                <span>1 km</span>
                                                <span>50 km</span>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                                            <Bell className="w-5 h-5 text-red-400" />
                                        </div>
                                        <h2 className="text-xl font-bold">Procurement Alerts</h2>
                                    </div>
                                    <div className="space-y-4">
                                        {['Copper Wire', 'Steel Offcuts', 'Plastic Pellets'].map((item) => (
                                            <div key={item} className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-700">
                                                <span className="text-sm font-medium text-slate-200">Alert me for {item}</span>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </>
                        ) : (
                            <>
                                <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                                            <FileCheck className="w-5 h-5 text-green-400" />
                                        </div>
                                        <h2 className="text-xl font-bold">Verification</h2>
                                    </div>
                                    <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-blue-500 hover:bg-slate-700/10 transition-all cursor-pointer">
                                        <FileCheck className="w-12 h-12 text-slate-500 mb-3" />
                                        <p className="text-slate-300 font-medium mb-1">Upload Phase-1 Chemical Safety Certificate</p>
                                        <p className="text-xs text-slate-500">PDF, DOCX up to 10MB</p>
                                    </div>
                                </section>

                                <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                                            <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                                        </div>
                                        <h2 className="text-xl font-bold">Auto-Approval</h2>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-slate-900 rounded-lg border border-slate-700">
                                        <div>
                                            <h3 className="text-sm font-medium text-slate-200">Instant Bid Acceptance</h3>
                                            <p className="text-xs text-slate-500 mt-1">Automatically accept bids that meet or exceed quoted price.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                        </label>
                                    </div>
                                </section>
                            </>
                        )}
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {saving ? (
                            'Saving...'
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Save Configurations
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
