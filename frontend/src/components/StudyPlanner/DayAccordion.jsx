import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import StudySession from './StudySession';

export default function DayAccordion({ date, sessions }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-lg mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex justify-between font-semibold"
      >
        {date}
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>

      {open && (
        <div className="p-4 space-y-2">
          {sessions.map((s, i) => (
            <StudySession key={i} session={s} />
          ))}
        </div>
      )}
    </div>
  );
}
