"use client";

import { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

// --- Mock AI Helper Functions (Conceptual) ---
const generateSmartSummary = (experience: string, skills: string[]): string => {
  if (!experience && skills.length === 0) return "";
  const experienceHighlights = experience.substring(0, 100) + "...";
  const skillsList = skills.slice(0, 3).join(", ");
  return `A highly motivated professional with experience in ${experienceHighlights} and a strong skillset in ${skillsList}. Eager to contribute to a dynamic team and leverage expertise to achieve organizational goals.`;
};

const suggestSkills = (experience: string): string[] => {
  const keywords = experience.toLowerCase().split(/\s+/);
  const suggested = new Set<string>();
  if (keywords.includes("react")) suggested.add("React.js");
  if (keywords.includes("node") || keywords.includes("javascript")) suggested.add("JavaScript");
  if (keywords.includes("python")) suggested.add("Python");
  if (keywords.includes("database")) suggested.add("Database Management");
  return Array.from(suggested);
};

const enhanceExperienceVerbs = (experience: string): string => {
  return experience.replace(/\b(worked on|responsible for|involved in)\b/gi, (match) => {
    if (match.toLowerCase().includes("worked on")) return "Developed";
    if (match.toLowerCase().includes("responsible for")) return "Led";
    if (match.toLowerCase().includes("involved in")) return "Contributed to";
    return match;
  });
};
// --- End of Mock AI Helper Functions ---

export default function ResumeBuilder() {
  const resumeRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [summary, setSummary] = useState("");
  const [experience, setExperience] = useState("");

  const [graduationCourse, setGraduationCourse] = useState("");
  const [graduationSchool, setGraduationSchool] = useState("");
  const [graduationTime, setGraduationTime] = useState("");
  const [graduationCGPA, setGraduationCGPA] = useState("");

  const [intermediateCourse, setIntermediateCourse] = useState("");
  const [intermediateSchool, setIntermediateSchool] = useState("");
  const [intermediateTime, setIntermediateTime] = useState("");
  const [intermediateCGPA, setIntermediateCGPA] = useState("");

  const [highschoolCourse, setHighschoolCourse] = useState("");
  const [highschoolSchool, setHighschoolSchool] = useState("");
  const [highschoolTime, setHighschoolTime] = useState("");
  const [highschoolCGPA, setHighschoolCGPA] = useState("");

  // Initialize these as empty arrays
  const [skills, setSkills] = useState<string[]>([]);
  const [projects, setProjects] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeOklchColors = (element: HTMLElement) => {
    const allElements = element.querySelectorAll("*");
    allElements.forEach((el) => {
      const style = getComputedStyle(el);
      if ((style.backgroundColor.includes("oklch") || style.backgroundColor.includes("color(")) && !el.hasAttribute("data-oklch-processed")) {
        (el as HTMLElement).style.backgroundColor = "#ffffff";
        el.setAttribute("data-oklch-processed", "true");
      }
      if ((style.color.includes("oklch") || style.color.includes("color(")) && !el.hasAttribute("data-oklch-processed")) {
        (el as HTMLElement).style.color = "#000000";
        el.setAttribute("data-oklch-processed", "true");
      }
    });
    const elStyle = getComputedStyle(element);
    if (elStyle.backgroundColor.includes("oklch") || elStyle.backgroundColor.includes("color(")) {
      element.style.backgroundColor = "#ffffff";
    }
    if (elStyle.color.includes("oklch") || elStyle.color.includes("color(")) {
      element.style.color = "#000000";
    }
  };

  const handleDownload = async () => {
    const element = resumeRef.current;
    if (!element) return;

    removeOklchColors(element);
    document.body.offsetHeight;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      ignoreElements: (el) =>
        el instanceof HTMLButtonElement || el instanceof HTMLInputElement,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
  };

  // --- AI Feature Integrations ---
  const handleGenerateSummary = () => {
    setSummary(generateSmartSummary(experience, skills));
  };

  const handleSuggestSkills = () => {
    setSkills(suggestSkills(experience));
  };

  const handleEnhanceExperience = () => {
    setExperience(enhanceExperienceVerbs(experience));
  };
  // --- End of AI Feature Integrations ---

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6">Resume Builder</h1>

      <div className="mb-6 text-gray-700 italic text-sm">
        Fill in the fields below and click "Download PDF" to generate your resume.
        <br />
        <span className="font-bold">AI Assistance:</span> Try the buttons next to the text areas for smart suggestions!
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input placeholder="Full Name" className="w-full p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Phone" className="w-full p-2 border rounded" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input placeholder="LinkedIn URL" className="w-full p-2 border rounded" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
        <input placeholder="GitHub URL" className="w-full p-2 border rounded" value={github} onChange={(e) => setGithub(e.target.value)} />
        <input type="file" accept="image/*" className="w-full border rounded" onChange={handleImageUpload} />
        <div className="md:col-span-2 relative">
          <textarea placeholder="Summary" className="w-full p-2 border rounded" value={summary} onChange={(e) => setSummary(e.target.value)} />
          <Button size="sm" className="absolute top-1 right-1" onClick={handleGenerateSummary}>✨ Smart Summary</Button>
        </div>
        <div className="md:col-span-2 relative">
          <textarea placeholder="Experience" className="w-full p-2 border rounded" value={experience} onChange={(e) => setExperience(e.target.value)} />
          <div className="absolute top-1 right-1 space-x-2">
            <Button size="sm" onClick={handleSuggestSkills}>💡 Suggest Skills</Button>
            <Button size="sm" onClick={handleEnhanceExperience}>💪 Enhance Verbs</Button>
          </div>
        </div>

        <input placeholder="Graduation Course" className="w-full p-2 border rounded" value={graduationCourse} onChange={(e) => setGraduationCourse(e.target.value)} />
        <input placeholder="Graduation School" className="w-full p-2 border rounded" value={graduationSchool} onChange={(e) => setGraduationSchool(e.target.value)} />
        <input placeholder="Graduation Time" className="w-full p-2 border rounded" value={graduationTime} onChange={(e) => setGraduationTime(e.target.value)} />
        <input placeholder="Graduation CGPA" className="w-full p-2 border rounded" value={graduationCGPA} onChange={(e) => setGraduationCGPA(e.target.value)} />

        <input placeholder="Intermediate Course" className="w-full p-2 border rounded" value={intermediateCourse} onChange={(e) => setIntermediateCourse(e.target.value)} />
        <input placeholder="Intermediate School" className="w-full p-2 border rounded" value={intermediateSchool} onChange={(e) => setIntermediateSchool(e.target.value)} />
        <input placeholder="Intermediate Time" className="w-full p-2 border rounded" value={intermediateTime} onChange={(e) => setIntermediateTime(e.target.value)} />
        <input placeholder="Intermediate CGPA" className="w-full p-2 border rounded" value={intermediateCGPA} onChange={(e) => setIntermediateCGPA(e.target.value)} />

        <input placeholder="High School Course" className="w-full p-2 border rounded" value={highschoolCourse} onChange={(e) => setHighschoolCourse(e.target.value)} />
        <input placeholder="High School Name" className="w-full p-2 border rounded" value={highschoolSchool} onChange={(e) => setHighschoolSchool(e.target.value)} />
        <input placeholder="High School Time" className="w-full p-2 border rounded" value={highschoolTime} onChange={(e) => setHighschoolTime(e.target.value)} />
        <input placeholder="High School CGPA" className="w-full p-2 border rounded" value={highschoolCGPA} onChange={(e) => setHighschoolCGPA(e.target.value)} />

        <textarea placeholder="Skills" className="w-full p-2 border rounded" value={skills.join(", ")} onChange={(e) => setSkills(e.target.value.split(",").map(s => s.trim()))} />
        <textarea placeholder="Projects" className="w-full p-2 border rounded md:col-span-2" value={projects.join("\n")} onChange={(e) => setProjects(e.target.value.split("\n").map(p => p.trim()))} />
        <textarea placeholder="Certifications" className="w-full p-2 border rounded md:col-span-2" value={certifications.join("\n")} onChange={(e) => setCertifications(e.target.value.split("\n").map(c => c.trim()))} />
        <textarea placeholder="Languages" className="w-full p-2 border rounded" value={languages.join(", ")} onChange={(e) => setLanguages(e.target.value.split(",").map(l => l.trim()))} />
        <textarea placeholder="Interests" className="w-full p-2 border rounded" value={interests.join(", ")} onChange={(e) => setInterests(e.target.value.split(",").map(i => i.trim()))} />
        <textarea placeholder="Links" className="w-full p-2 border rounded md:col-span-2" value={links.join("\n")} onChange={(e) => setLinks(e.target.value.split("\n").map(l => l.trim()))} />
      </div>

      <Button className="mt-4" onClick={handleDownload}>Download PDF</Button>

      {/* Rendered Resume */}
      <div ref={resumeRef} className="mt-10 bg-white p-6 rounded shadow text-black">
        <div className="text-center">
          {profileImage && <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4" />}
          {name && <h2 className="text-xl font-bold">{name}</h2>}
        </div>

        <div className="mt-4 space-y-2 text-sm">
          {email && <p className="text-black"><Mail className="inline-block mr-2" size={16} />{email}</p>}
          {phone && <p className="text-black"><Phone className="inline-block mr-2" size={16} />{phone}</p>}
          {linkedin && <p className="text-black"><FaLinkedin className="inline-block mr-2" size={16} />{linkedin}</p>}
          {github && <p className="text-black"><FaGithub className="inline-block mr-2" size={16} />{github}</p>}
        </div>

        {summary && <section className="mt-6"><h3 className="font-semibold">Summary</h3><p className="text-black">{summary}</p></section>}
        {experience && <section className="mt-6"><h3 className="font-semibold">Experience</h3><p className="text-black">{experience}</p></section>}

        {(graduationCourse || intermediateCourse || highschoolCourse) && (
          <section className="mt-6">
            <h3 className="font-semibold">Education</h3>
            {graduationCourse && (
              <p className="text-black"><strong>{graduationCourse}</strong> at {graduationSchool} ({graduationTime}) – <strong>CGPA:</strong> {graduationCGPA}</p>
            )}
            {intermediateCourse && (
              <p className="text-black"><strong>{intermediateCourse}</strong> at {intermediateSchool} ({intermediateTime}) – <strong>CGPA:</strong> {intermediateCGPA}</p>
            )}
            {highschoolCourse && (
              <p className="text-black"><strong>{highschoolCourse}</strong> at {highschoolSchool} ({highschoolTime}) – <strong>CGPA:</strong> {highschoolCGPA}</p>
            )}
          </section>
        )}

        {skills.length > 0 && <section className="mt-6"><h3 className="font-semibold">Skills</h3><p className="text-black">{skills.join(", ")}</p></section>}
        {projects.length > 0 && <section className="mt-6"><h3 className="font-semibold">Projects</h3><p className="text-black">{projects.join("\n")}</p></section>}
        {certifications.length > 0 && <section className="mt-6"><h3 className="font-semibold">Certifications</h3><p className="text-black">{certifications.join("\n")}</p></section>}
        {languages.length > 0 && <section className="mt-6"><h3 className="font-semibold">Languages</h3><p className="text-black">{languages.join(", ")}</p></section>}
        {interests.length > 0 && <section className="mt-6"><h3 className="font-semibold">Interests</h3><p className="text-black">{interests.join(", ")}</p></section>}
        {links.length > 0 && <section className="mt-6"><h3 className="font-semibold">Links</h3><p className="text-black">{links.join("\n")}</p></section>}
      </div>
    </div>
  );
}