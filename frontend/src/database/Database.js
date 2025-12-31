export const PRIORITIES = ['low', 'medium', 'high'];
export const SUBJECT_STATUS = ['active', 'completed', 'archived'];

export const DEFAULT_SUBJECT = {
  name: '',
  exam_date: '',
  color: '',
  priority: 'medium',
  status: 'active',
};

export const DEFAULT_SESSION = {
  subject_id: '',
  duration_minutes: 0,
  session_date: '',
  completed: false,
  notes: '',
};

export const DEFAULT_USER_SETTINGS = {
  daily_study_hours: 4,
  dark_mode: false,
  study_streak: 0,
  last_study_date: null,
};
