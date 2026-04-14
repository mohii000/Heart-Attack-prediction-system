import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedBackground from './components/AnimatedBackground';
import HomePage from './components/HomePage';
import PredictionPage from './components/PredictionPage';
import ResultPage from './components/ResultPage';
import LoadingScreen from './components/LoadingScreen';
import { PredictionData, PredictionResult } from './types';
import { predictHeartAttack } from './utils/prediction';

type Page = 'home' | 'prediction' | 'result';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);

  const handleStartPrediction = () => {
    setCurrentPage('prediction');
  };

  const handlePredict = async (data: PredictionData) => {
    setIsLoading(true);
    const result = await predictHeartAttack(data);
    setPredictionResult(result);
    setIsLoading(false);
    setCurrentPage('result');
  };

  const handleBack = () => {
    setCurrentPage('home');
    setPredictionResult(null);
  };

  const handleNewPrediction = () => {
    setPredictionResult(null);
    setCurrentPage('prediction');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <AnimatedBackground />

      {isLoading && <LoadingScreen />}

      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
          >
            <HomePage onStartPrediction={handleStartPrediction} />
          </motion.div>
        )}

        {currentPage === 'prediction' && (
          <motion.div
            key="prediction"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
          >
            <PredictionPage onBack={handleBack} onPredict={handlePredict} />
          </motion.div>
        )}

        {currentPage === 'result' && predictionResult && (
          <motion.div
            key="result"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
          >
            <ResultPage
              result={predictionResult}
              onBack={handleBack}
              onNewPrediction={handleNewPrediction}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
