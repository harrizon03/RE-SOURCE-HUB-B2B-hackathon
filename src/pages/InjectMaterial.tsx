import { useState, FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, CheckCircle2, Loader2, IndianRupee, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

const materials = [
  'High-Grade Copper Wire',
  'Industrial Cotton Offcuts',
  'PET Plastic Scrap',
  'Machined Steel Shavings',
  'Other',
];

export function InjectMaterial() {
  const navigate = useNavigate();
  const [material, setMaterial] = useState('');
  const [customMaterial, setCustomMaterial] = useState('');
  const [volume, setVolume] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [certified, setCertified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const selectedMaterial = material === 'Other' ? customMaterial : material;

    if (!selectedMaterial || !volume || !price || !certified) {
      alert('Please fill all fields and certify QA compliance');
      return;
    }

    setIsSubmitting(true);

    try {
      const randomDistance = (Math.random() * (12.0 - 1.5) + 1.5).toFixed(1);
      const routing = 'Ambattur Node → Match Engine';

      const { error } = await supabase.from('byproducts').insert([
        {
          material: selectedMaterial,
          routing,
          distance: `${randomDistance} km`,
          rawVolume: parseFloat(volume),
          // In a real app, upload the photo to storage and store the URL
          // price: parseFloat(price), // Add this if the schema supports it, otherwise log it
        },
      ]);

      console.log('Submitting Material:', {
        material: selectedMaterial,
        volume,
        price,
        photoName: photo ? photo.name : 'No photo',
        certified
      });

      if (error) throw error;

      await new Promise((resolve) => setTimeout(resolve, 1500));

      navigate('/');
    } catch (error) {
      console.error('Error inserting material:', error);
      alert('Failed to inject material. Please try again.');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Dashboard</span>
        </Link>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Upload className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Asset Injection Gateway</h1>
              <p className="text-slate-400 mt-1">
                Submit new material payloads to the distribution network
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="material" className="block text-sm font-semibold text-slate-300 mb-2">
                Material Classification
              </label>
              <select
                id="material"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Select a material type...</option>
                {materials.map((mat) => (
                  <option key={mat} value={mat}>
                    {mat}
                  </option>
                ))}
              </select>
            </div>

            {material === 'Other' && (
              <div className="animate-fade-in">
                <label htmlFor="customMaterial" className="block text-sm font-semibold text-slate-300 mb-2">
                  Specify Material
                </label>
                <input
                  type="text"
                  id="customMaterial"
                  value={customMaterial}
                  onChange={(e) => setCustomMaterial(e.target.value)}
                  placeholder="Enter custom material name"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="volume" className="block text-sm font-semibold text-slate-300 mb-2">
                  Payload Volume (Tonnes)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="volume"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    step="0.1"
                    min="0.1"
                    placeholder="0.0"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500 text-sm">
                    Tonnes
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-semibold text-slate-300 mb-2">
                  Quoted Price (per Tonne)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IndianRupee className="w-5 h-5 text-slate-500" />
                  </div>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="w-full pl-10 pr-3 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="photo" className="block text-sm font-semibold text-slate-300 mb-2">
                Material Photo
              </label>
              <div className="relative group cursor-pointer">
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className={`w-full px-4 py-3 bg-slate-900/50 border border-dashed ${photo ? 'border-green-500' : 'border-slate-600'} rounded-lg flex items-center gap-3 transition-colors group-hover:border-blue-500`}>
                  <ImageIcon className={`w-5 h-5 ${photo ? 'text-green-500' : 'text-slate-400'}`} />
                  <span className={`${photo ? 'text-green-400' : 'text-slate-400'} truncate`}>
                    {photo ? photo.name : 'Click to upload photo or drag and drop'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-slate-900/50 border border-slate-600 rounded-lg">
              <input
                type="checkbox"
                id="certified"
                checked={certified}
                onChange={(e) => setCertified(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-slate-600 bg-slate-900 text-blue-600 focus:ring-2 focus:ring-blue-500"
                required
              />
              <label htmlFor="certified" className="text-slate-300 text-sm flex-1 cursor-pointer">
                I certify this payload passes{' '}
                <span className="font-semibold text-blue-400">Phase-1 QA compliance</span> and meets
                all regulatory standards for material redistribution.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 disabled:shadow-none transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Calculating Haulage...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Inject Payload</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-300">
              <span className="font-semibold">Note:</span> All payloads are automatically routed
              through the smart matching engine for optimal distribution and sustainability metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
