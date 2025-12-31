import { Calendar, Clock, TrendingUp, CheckCircle, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useState } from 'react';
import { useEffect, useRef } from 'react';

export const SubjectCard = ({ subject, sessions }) => {
  const { deleteSubject, updateSubject } = useApp();
  const [showConfirm, setShowConfirm] = useState(false);

  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const subjectSessions = sessions.filter(
    (s) => s.subject_id === subject.id
  );

  const totalMinutes = subjectSessions.reduce(
    (acc, s) => acc + s.duration_minutes,
    0
  );

  const totalHours = (totalMinutes / 60).toFixed(1);

  const daysUntilExam = Math.ceil(
    (new Date(subject.exam_date).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const handleComplete = async () => {
    await updateSubject(subject.id, {
      status: subject.status === 'completed' ? 'active' : 'completed',
    });
  };

//   const handleDelete = async () => {
//     if (confirm('Are you sure you want to delete this subject?')) {
//       await deleteSubject(subject.id);
//     }
//   };

    const handleDelete = async () => {
        await deleteSubject(subject.id);
        setShowConfirm(false);
    };

  const getPriorityColor = () => {
    switch (subject.priority) {
      case 'high':
        return 'border-red-500';
      case 'medium':
        return 'border-yellow-500';
      case 'low':
        return 'border-green-500';
      default:
        return '';
    }
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 ${getPriorityColor()} transform transition-smooth hover:scale-105 hover:shadow-2xl ${
        subject.status === 'completed' ? 'opacity-60' : ''
      } ${isVisible ? 'animate-slide-up' : 'animate-slide-down'} hover:-translate-y-2`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
            style={{ backgroundColor: subject.color }}
          >
            {subject.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {subject.name}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
              {subject.priority} Priority
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleComplete}
            className={`p-2 rounded-lg transition-smooth hover:scale-110 ${
              subject.status === 'completed'
                ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
          </button>

          <button
            onClick={() => setShowConfirm(true)}
            className="p-2 rounded-lg bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition-smooth hover:scale-110"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <Calendar className="w-5 h-5" />
          <span className="text-sm">
            Exam:{' '}
            {new Date(subject.exam_date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <Clock className="w-5 h-5" />
          <span className="text-sm">
            {daysUntilExam > 0
              ? `${daysUntilExam} days remaining`
              : daysUntilExam === 0
              ? 'Exam today!'
              : 'Exam passed'}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <TrendingUp className="w-5 h-5" />
          <span className="text-sm">
            {totalHours} hours studied ({subjectSessions.length} sessions)
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Progress
          </span>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {totalHours}h
          </span>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all"
            style={{
              width: `${Math.min((parseFloat(totalHours) / 20) * 100, 100)}%`,
              backgroundColor: subject.color,
            }}
          />
        </div>
      </div>
      {showConfirm && (
  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm 
                  flex items-center justify-center animate-fade-in">

    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl 
                    p-8 max-w-md w-full text-center animate-scale-in">

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        Delete Subject?
      </h2>

      <p className="text-gray-600 dark:text-gray-400 mb-6">
        This action cannot be undone. Are you sure you want to delete
        <span className="font-semibold"> {subject.name}</span>?
      </p>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleDelete}
          className="px-6 py-2 bg-red-600 text-white rounded-lg 
                     hover:bg-red-700 transition-smooth hover:scale-105"
        >
          Yes, Delete
        </button>

        <button
          onClick={() => setShowConfirm(false)}
          className="px-6 py-2 bg-gray-200 dark:bg-gray-700 
                     text-gray-800 dark:text-gray-200 rounded-lg 
                     hover:scale-105 transition-smooth"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
    
  );
};
