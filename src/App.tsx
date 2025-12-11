import { getPersonalInfo, getExperience, getEducation, getProjects, getSkills, getAwards, getReferences } from './services/dataService';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Awards from './components/Awards';
import References from './components/References';

function App() {
  const personalInfo = getPersonalInfo();
  const experience = getExperience();
  const education = getEducation();
  const projects = getProjects();
  const skills = getSkills();
  const awards = getAwards();
  const references = getReferences();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header personalInfo={personalInfo} />
      <main>
        <Hero personalInfo={personalInfo} />
        <About personalInfo={personalInfo} />
        <Experience experience={experience} />
        <Education education={education} />
        <Projects projects={projects} />
        <Skills skills={skills} />
        <Awards awards={awards} />
        <References references={references} />
      </main>
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container-custom text-center">
          <p>&copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

