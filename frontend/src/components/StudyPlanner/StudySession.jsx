export default function StudySession({ session }) {
  return (
    <div className="p-3 bg-gray-50 border rounded-lg">
      <strong>{session.subject}</strong>
      <div className="text-sm text-gray-600">
        {session.priority} priority • {session.duration} hour
      </div>
    </div>
  );
}
