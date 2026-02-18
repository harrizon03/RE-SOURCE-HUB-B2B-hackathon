import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Store, ArrowRight, Lock, KeyRound } from 'lucide-react';

export function Login() {
  const [userType, setUserType] = useState<'buyer' | 'seller'>('buyer');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - for now just redirect to dashboard
    console.log(`Logging in as ${userType}:`, { username, password });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-700">
        
        {/* Header */}
        <div className="p-8 text-center bg-gradient-to-b from-slate-800 to-slate-900 border-b border-slate-700">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-500/10 rounded-full">
              {userType === 'buyer' ? (
                <User className="w-8 h-8 text-blue-400" />
              ) : (
                <Store className="w-8 h-8 text-emerald-400" />
              )}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-slate-400 text-sm">Sign in to your account to continue</p>
        </div>

        {/* User Type Toggle */}
        <div className="flex p-2 bg-slate-900/50 m-6 rounded-lg border border-slate-700">
          <button
            onClick={() => setUserType('buyer')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
              userType === 'buyer'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            Buyer
          </button>
          <button
            onClick={() => setUserType('seller')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
              userType === 'seller'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Store className="w-4 h-4" />
            Seller
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Username</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className={`w-5 h-5 transition-colors ${userType === 'buyer' ? 'group-focus-within:text-blue-500' : 'group-focus-within:text-emerald-500'} text-slate-500`} />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-all duration-200"
                style={{
                    '--tw-ring-color': userType === 'buyer' ? 'rgb(37 99 235)' : 'rgb(5 150 105)'
                } as React.CSSProperties}
                placeholder="Enter your username"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className={`w-5 h-5 transition-colors ${userType === 'buyer' ? 'group-focus-within:text-blue-500' : 'group-focus-within:text-emerald-500'} text-slate-500`} />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-all duration-200"
                style={{
                  '--tw-ring-color': userType === 'buyer' ? 'rgb(37 99 235)' : 'rgb(5 150 105)'
                } as React.CSSProperties}
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg font-bold text-white shadow-lg transform transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 ${
              userType === 'buyer'
                ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20 focus:ring-blue-500'
                : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20 focus:ring-emerald-500'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              Sign In to {userType === 'buyer' ? 'Buy' : 'Sell'}
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
