import { Trash2, BookOpen } from 'lucide-react';

export default function SubjectList({ subjects, setSubjects, setDailySchedule }) {
  const remove = (id) => {
    setSubjects(subjects.filter(s => s.id !== id));
    setDailySchedule(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="font-bold mb-4">Subjects (Priority Order)</h3>

      {subjects.map((s, i) => (
        <div key={s.id} className="flex justify-between items-center border p-3 rounded-lg mb-2">
          <div className="flex gap-2 items-center">
            <span className="font-bold">#{i + 1}</span>
            <BookOpen />
            <span>{s.name}</span>
            <span className="text-xs uppercase">{s.priority}</span>
          </div>
          <button onClick={() => remove(s.id)}>
            <Trash2 />
          </button>
        </div>
      ))}

      {subjects.length === 0 && (
        <p className="text-gray-500 text-center">No subjects added</p>
      )}
    </div>
  );
}
