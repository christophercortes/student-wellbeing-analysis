export default function dateTime() {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formatDate = currentDate.toLocaleString("en-US", options);

  return (
    <div className="flex justify-end text-sm text-gray-600">{formatDate}</div>
  );
}
