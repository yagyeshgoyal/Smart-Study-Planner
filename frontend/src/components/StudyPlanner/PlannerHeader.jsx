import { BookOpen } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function PlannerHeader({ subjectCount }) {
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

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl shadow-xl p-8 transition-smooth
        ${isVisible ? 'animate-slide-up' : 'animate-slide-down'}
      `}
    >
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
