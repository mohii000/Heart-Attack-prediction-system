export interface PredictionData {
  age: number;
  gender: 'male' | 'female';
  heartRate: number;
  systolicBP: number;
  diastolicBP: number;
  bloodSugar: number;
  ckMB: number;
  troponin: number;
}

export interface PredictionResult {
  risk: boolean;
  riskPercentage: number;
  message: string;
}
