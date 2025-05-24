import Link from 'next/link';

export default function ResumeButtons() {
  return (
    <div className=" text-white flex ml-165 ">
      {/* Existing content... */}
      <Link href="/resume-builder">
        <button className="bg-primary-100 hover:bg-primary-100/80 text-dark-100 font-bold py-1.5 px-5 rounded-full cursor-pointer">
          Build Your Resume
        </button>
      </Link>
    </div>
  );
}
