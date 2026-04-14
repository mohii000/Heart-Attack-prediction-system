import { PredictionData, PredictionResult } from '../types';

export async function predictHeartAttack(data: PredictionData): Promise<PredictionResult> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  let riskScore = 0;

  if (data.age > 60) riskScore += 20;
  else if (data.age > 45) riskScore += 10;

  if (data.heartRate > 100 || data.heartRate < 60) riskScore += 15;

  if (data.systolicBP > 140) riskScore += 15;
  if (data.diastolicBP > 90) riskScore += 10;

  if (data.bloodSugar > 126) riskScore += 15;

  if (data.ckMB > 25) riskScore += 15;
  if (data.troponin > 0.04) riskScore += 20;

  const riskPercentage = Math.min(Math.round(riskScore), 99);
  const isRisk = riskPercentage >= 50;

  return {
    risk: isRisk,
    riskPercentage,
    message: isRisk
      ? 'Based on the provided data, there is a significant risk of heart attack. Please consult a healthcare professional immediately.'
      : 'Based on the provided data, your heart attack risk is low. Continue maintaining a healthy lifestyle.',
  };
}
