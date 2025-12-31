

export default function GeneratePlanButton({ subjects, setDailySchedule }) {

  const generate = () => {
    if (!subjects.length) return;

    const schedule = {};
    const today = new Date();

    // find the LAST exam date
    const lastExamDate = new Date(
      Math.max(...subjects.map(s => new Date(s.exam_date).getTime()))
    );

    // total days to plan
    const totalDays =
      Math.ceil((lastExamDate - today) / (1000 * 60 * 60 * 24));

    for (let d = 0; d <= totalDays; d++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + d);

      const dateKey = currentDate.toDateString();

      // subjects whose exam is NOT passed
      const activeSubjectsForDay = subjects.filter(subject => {
        const examDate = new Date(subject.exam_date);
        return currentDate <= examDate;
      });

      if (activeSubjectsForDay.length === 0) continue;

      schedule[dateKey] = {
        date: currentDate,
        sessions: activeSubjectsForDay.map(subject => ({
          type: 'study',
          subject: subject.name,
          priority: subject.priority,
          examDate: subject.exam_date,
          duration: 1
        }))
      };
    }

    setDailySchedule(schedule);
  };

  return (
    <button
      onClick={generate}
      disabled={!subjects.length}
      className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition"
    >
      Generate Subject-wise Study Plan
    </button>
  );
}
