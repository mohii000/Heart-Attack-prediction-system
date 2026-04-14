import { motion } from 'framer-motion';
import { useState } from 'react';
import { Activity, ArrowLeft } from 'lucide-react';
import { PredictionData } from '../types';

interface PredictionPageProps {
  onBack: () => void;
  onPredict: (data: PredictionData) => void;
}

export default function PredictionPage({ onBack, onPredict }: PredictionPageProps) {
  const [formData, setFormData] = useState<PredictionData>({
    age: 50,
    gender: 'male',
    heartRate: 75,
    systolicBP: 120,
    diastolicBP: 80,
    bloodSugar: 100,
    ckMB: 25,
    troponin: 0.01,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData);
  };

  const updateField = (field: keyof PredictionData, value: number | string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen p-4 py-12 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          className="mb-8 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Patient Information
          </h2>
          <p className="text-gray-400 text-lg">
            Enter the medical data for heart attack risk assessment
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <Activity className="w-6 h-6 text-cyan-400" />
              Basic Information
            </h3>

            <div className="space-y-6">
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Age: <span className="text-cyan-400 text-lg">{formData.age} years</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={(e) => updateField('age', Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 transition-all hover:accent-cyan-400"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>120</span>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Gender
                </label>
                <div className="flex gap-4">
                  {(['male', 'female'] as const).map((gender) => (
                    <motion.button
                      key={gender}
                      type="button"
                      onClick={() => updateField('gender', gender)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
                        formData.gender === gender
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <Activity className="w-6 h-6 text-cyan-400" />
              Vital Signs
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Heart Rate: <span className="text-cyan-400">{formData.heartRate} bpm</span>
                </label>
                <input
                  type="number"
                  value={formData.heartRate}
                  onChange={(e) => updateField('heartRate', Number(e.target.value))}
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Enter heart rate"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Systolic BP: <span className="text-cyan-400">{formData.systolicBP} mmHg</span>
                </label>
                <input
                  type="range"
                  min="80"
                  max="200"
                  value={formData.systolicBP}
                  onChange={(e) => updateField('systolicBP', Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>80</span>
                  <span>200</span>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Diastolic BP: <span className="text-cyan-400">{formData.diastolicBP} mmHg</span>
                </label>
                <input
                  type="range"
                  min="40"
                  max="130"
                  value={formData.diastolicBP}
                  onChange={(e) => updateField('diastolicBP', Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>40</span>
                  <span>130</span>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Blood Sugar (mg/dL)
                </label>
                <input
                  type="number"
                  value={formData.bloodSugar}
                  onChange={(e) => updateField('bloodSugar', Number(e.target.value))}
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Enter blood sugar"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <Activity className="w-6 h-6 text-cyan-400" />
              Cardiac Biomarkers
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  CK-MB (U/L)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.ckMB}
                  onChange={(e) => updateField('ckMB', Number(e.target.value))}
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Enter CK-MB level"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Troponin (ng/mL)
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={formData.troponin}
                  onChange={(e) => updateField('troponin', Number(e.target.value))}
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Enter troponin level"
                />
              </div>
            </div>
          </motion.div>

          <motion.button
            type="submit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl text-white text-xl font-semibold shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all"
          >
            Analyze Heart Attack Risk
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
