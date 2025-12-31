import DayAccordion from './DayAccordion';

export default function DailySchedule({ dailySchedule }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-4">Daily Schedule</h2>

      {Object.entries(dailySchedule).map(([date, data]) => (
        <DayAccordion key={date} date={date} sessions={data.sessions} />
      ))}
    </div>
  );
}
