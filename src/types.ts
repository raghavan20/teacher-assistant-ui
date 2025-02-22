export interface RecordingAnalysis {
  grade: string;
  id: number;
  r_depth: number;
  r_full_response_json: {
    feedback: string;
  };
  r_overall_score: number;
  r_structure: number;
  r_style: number;
  r_suggestions_count: number;
  r_topics_covered: number;
  r_topics_required: number;
  subject: string;
  timestamp: string;
  user_id: number;
}

export interface RecordingState {
  isRecording: boolean;
  audioUrl: string | null;
  duration: number;
}

export interface RecordingDetails {
  id: number;
  state: string;
  board: string;
  district: string;
  block: string;
  subject: string;
  grade: string;
  topic: string;
  notes: string;
  audioBlob?: Blob;
  timestamp: string;
  analysis?: RecordingAnalysis;
}

export interface StarRatingProps {
  value: number;
  maxValue?: number;
}