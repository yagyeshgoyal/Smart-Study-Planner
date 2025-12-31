import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [settings, setSettings] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [subjectsRes, sessionsRes, settingsRes] = await Promise.all([
        supabase.from('subjects').select('*').order('exam_date', { ascending: true }),
        supabase.from('study_sessions').select('*').order('created_at', { ascending: false }),
        supabase.from('user_settings').select('*').limit(1).maybeSingle(),
      ]);

      if (subjectsRes.data) setSubjects(subjectsRes.data);
      if (sessionsRes.data) setSessions(sessionsRes.data);

      if (settingsRes.data) {
        setSettings(settingsRes.data);
        setDarkMode(settingsRes.data.dark_mode);
      } else {
        const defaultSettings = {
          daily_study_hours: 4,
          dark_mode: false,
          study_streak: 0,
          last_study_date: null,
        };

        const { data } = await supabase
          .from('user_settings')
          .insert(defaultSettings)
          .select()
          .single();

        if (data) {
          setSettings(data);
          setDarkMode(data.dark_mode);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addSubject = async (subject) => {
    const { data, error } = await supabase
      .from('subjects')
      .insert(subject)
      .select()
      .single();

    if (error) throw error;
    if (data) setSubjects([...subjects, data]);
  };

  const updateSubject = async (id, updates) => {
    const { error } = await supabase
      .from('subjects')
      .update(updates)
      .eq('id', id);

    if (error) throw error;

    setSubjects(
      subjects.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const deleteSubject = async (id) => {
    const { error } = await supabase
      .from('subjects')
      .delete()
      .eq('id', id);

    if (error) throw error;

    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const addSession = async (session) => {
    const { data, error } = await supabase
      .from('study_sessions')
      .insert(session)
      .select()
      .single();

    if (error) throw error;

    if (data) {
      setSessions([data, ...sessions]);
      await updateStreak();
    }
  };

  const updateStreak = async () => {
    if (!settings) return;

    const today = new Date().toISOString().split('T')[0];
    const lastStudy = settings.last_study_date;

    let newStreak = settings.study_streak;

    if (!lastStudy || lastStudy !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastStudy === yesterdayStr) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }

      await updateSettings({
        study_streak: newStreak,
        last_study_date: today,
      });
    }
  };

  const updateSettings = async (updates) => {
    if (!settings) return;

    const { data, error } = await supabase
      .from('user_settings')
      .update(updates)
      .eq('id', settings.id)
      .select()
      .single();

    if (error) throw error;
    if (data) setSettings(data);
  };

  const toggleDarkMode = async () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    await updateSettings({ dark_mode: newDarkMode });
  };

  const refreshData = async () => {
    setLoading(true);
    await fetchData();
  };

  return (
    <AppContext.Provider
      value={{
        subjects,
        sessions,
        settings,
        darkMode,
        loading,
        addSubject,
        updateSubject,
        deleteSubject,
        addSession,
        updateSettings,
        toggleDarkMode,
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
