export interface BlandAICallData {
  c_id: string;
  batch_id: null | string;
  to: string;
  from: string;
  request_data: null | string;
  completed: boolean;
  created_at: string;
  inbound: boolean;
  queue_status: string;
  endpoint_url: null | string;
  max_duration: number;
  error_message: null | string;
  variables: {
    now: string;
    now_utc: string;
    short_from: string;
    short_to: string;
    from: string;
    to: string;
    call_id: string;
    phone_number: string;
    city: string;
    country: string;
    state: string;
  };
  answered_by: null | string;
  concatenated_transcript: string;
  transcripts: Transcript[];
  call_length: number;
  status: string;
  corrected_duration: string;
  end_at: string;
}

interface Transcript {
  id: number;
  created_at: string;
  text: string;
  user: string;
  c_id: string;
}
