export interface AnalysisResult {
  delivery: number;
  structure: number;
  engagement: number;
  feedback: string;
}

export interface RecordingState {
  isRecording: boolean;
  audioUrl: string | null;
  duration: number;
}

export interface SubjectDetails {
  subject: string;
  grade: string;
  notes: string;
}

export interface StoredRecording {
  id: string;
  timestamp: number;
  audioUrl: string;
  subjectDetails: SubjectDetails;
}