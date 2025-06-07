import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.png"
        width={60}
        height={60}
        className="object-contain"
        alt="Student Sentiment Analysis logo"
        priority
      />
      <h1 className="text-xl font-semibold text-gray-800 hidden md:block">
        TeacherAdmin
      </h1>
    </div>
  );
}
