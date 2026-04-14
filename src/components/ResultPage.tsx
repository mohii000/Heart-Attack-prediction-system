import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Heart, ArrowLeft, Activity } from 'lucide-react';
import { PredictionResult } from '../types';

interface ResultPageProps {
  result: PredictionResult;
  onBack: () => void;
  onNewPrediction: () => void;
}

export default function ResultPage({ result, onBack, onNewPrediction }: ResultPageProps) {
  const isRisk = result.risk;

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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block mb-6"
          >
            {isRisk ? (
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative"
              >
                <AlertTriangle className="w-32 h-32 text-red-500" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-red-500/20"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <CheckCircle className="w-32 h-32 text-green-500" />
              </motion.div>
            )}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-5xl font-bold mb-4 ${
              isRisk
                ? 'text-red-500'
                : 'bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent'
            }`}
          >
            {isRisk ? 'High Risk Detected' : 'Low Risk'}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300"
          >
            {result.message}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl mb-8"
        >
          <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
            <Activity className="w-6 h-6 text-cyan-400" />
            Risk Assessment
          </h3>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-300 font-medium">Risk Percentage</span>
              <span className={`text-2xl font-bold ${isRisk ? 'text-red-500' : 'text-green-500'}`}>
                {result.riskPercentage}%
              </span>
            </div>

            <div className="relative h-6 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.riskPercentage}%` }}
                transition={{ duration: 1, delay: 0.6 }}
                className={`h-full rounded-full ${
                  isRisk
                    ? 'bg-gradient-to-r from-red-600 to-red-400'
                    : 'bg-gradient-to-r from-green-600 to-green-400'
                }`}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </div>
          </div>

          {isRisk && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30"
            >
              <div className="flex gap-4">
                <Heart className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold text-red-400 mb-2">
                    Immediate Action Required
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Consult a cardiologist immediately</li>
                    <li>• Avoid strenuous physical activities</li>
                    <li>• Monitor vital signs regularly</li>
                    <li>• Keep emergency medications accessible</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {!isRisk && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="p-6 rounded-2xl bg-green-500/10 border border-green-500/30"
            >
              <div className="flex gap-4">
                <Heart className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold text-green-400 mb-2">
                    Healthy Heart Status
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Maintain regular exercise routine</li>
                    <li>• Continue balanced diet</li>
                    <li>• Schedule annual checkups</li>
                    <li>• Stay hydrated and manage stress</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex gap-4"
        >
          <motion.button
            onClick={onNewPrediction}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl text-white text-lg font-semibold shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all"
          >
            New Prediction
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
