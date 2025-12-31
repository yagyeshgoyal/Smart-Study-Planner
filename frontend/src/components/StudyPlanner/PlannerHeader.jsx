import { BookOpen } from 'lucide-react';

export default function PlannerHeader({ subjectCount }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="w-8 h-8 text-indigo-600" />
        <h1 className="text-3xl font-bold">Daily Study Plan</h1>
      </div>

      <p className="text-sm text-blue-800 bg-blue-50 border border-blue-200 rounded-lg p-4">
        Study all {subjectCount} subjects daily with smart priority scheduling.
      </p>
    </div>
  );
}
