function isToday(timestamp: string): boolean {
  const date = new Date(timestamp);
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export default function getStrDate(date?: string) {
  if (!date) return "";

  const date_obj = new Date(date);

  const year = date_obj.getFullYear();
  const month = String(date_obj.getMonth() + 1).padStart(2, "0");
  const day = String(date_obj.getDate()).padStart(2, "0");
  const hour = String(date_obj.getHours()).padStart(2, "0");
  const minute = String(date_obj.getMinutes()).padStart(2, "0");

  if (isToday(date)) return `${hour}:${minute}`;
  else return `${year}/${month}/${day}`;
}
