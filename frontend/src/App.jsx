import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { SubjectCard } from './components/SubjectCard';
import { PomodoroTimer } from './components/PomodoroTimer';
import { StatsCard } from './components/StatsCard';
import { AddSubjectForm } from './components/AddSubjectForm';
import { BookOpen } from 'lucide-react';

function App() {
  const { subjects, sessions, loading } = useApp();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  const activeSubjects = subjects.filter((s) => s.status === 'active');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <StatsCard />
          </div>
          <div>
            <PomodoroTimer />
          </div>
        </div>

        <div className="mb-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Your Subjects
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Track your exam preparation progress
          </p>
        </div>

        {activeSubjects.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center animate-slide-up">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
              <BookOpen className="w-10 h-10 text-blue-600 dark:text-blue-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No subjects yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start by adding your first subject to begin your study journey!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeSubjects.map((subject, index) => (
              <div
                key={subject.id}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="animate-slide-up"
              >
                <SubjectCard subject={subject} sessions={sessions} />
              </div>
            ))}
          </div>
        )}

        {subjects.filter((s) => s.status === 'completed').length > 0 && (
          <>
            <div className="mt-12 mb-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Completed Subjects
              </h2>
              <p className="text-gray-600 dark:text-gray-400">Well done!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects
                .filter((s) => s.status === 'completed')
                .map((subject) => (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    sessions={sessions}
                  />
                ))}
            </div>
          </>
        )}
      </main>

      <AddSubjectForm />
    </div>
  );
}

export default App;
