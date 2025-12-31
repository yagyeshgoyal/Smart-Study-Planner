import React, { useState } from 'react';
import PlannerHeader from './PlannerHeader';
import GeneratePlanButton from './GeneratePlanButton';
import DailySchedule from './DailySchedule';
import { useApp } from '../../context/AppContext';

export default function StudyPlanner() {

    const { subjects, setSubjects } = useApp();
  const [remainingDays, setRemainingDays] = useState(30);
  const [dailySchedule, setDailySchedule] = useState(null);
  console.log(subjects);

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <PlannerHeader subjectCount={subjects.length} />


        <GeneratePlanButton
          subjects={subjects}
          
          setDailySchedule={setDailySchedule}
        />

        {dailySchedule && <DailySchedule dailySchedule={dailySchedule} />}
      </div>
    </div>
  );
}
