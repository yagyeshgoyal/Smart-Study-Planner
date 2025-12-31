import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function SubjectManager({
  subjects,
  setSubjects,
  remainingDays,
  setRemainingDays,
  setDailySchedule
}) {
  const [name, setName] = useState('');
  const [priority, setPriority] = useState('medium');

  const addSubject = () => {
    if (!name.trim()) return;

    setSubjects([...subjects, {
      id: Date.now(),
      name,
      priority
    }]);

    setName('');
    setDailySchedule(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 grid md:grid-cols-2 gap-6">
      <div>
        <label className="font-semibold text-sm">Add Subject</label>
        <div className="flex gap-2 mt-2">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg"
            placeholder="Subject name"
          />
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            className="px-3 border rounded-lg"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button onClick={addSubject} className="bg-indigo-600 text-white px-4 rounded-lg">
            <Plus />
          </button>
        </div>
      </div>

      <div>
        <label className="font-semibold text-sm">Days Until Exam</label>
        <input
          type="number"
          min="1"
          value={remainingDays}
          onChange={e => {
            setRemainingDays(+e.target.value || 1);
            setDailySchedule(null);
          }}
          className="w-full mt-2 px-4 py-2 border rounded-lg"
        />
      </div>
    </div>
  );
}
