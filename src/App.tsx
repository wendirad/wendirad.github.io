import "./App.css";

import ScrollIndicator from "./components/ui/scroll-indicator";
import ThemeToggle from "./components/ui/theme-toggle";
import SchemeOrg from "./components/ui/scheme-org";
import NavigationBar from "./components/ui/navigation-bar";
import CookieConsent from "./components/ui/cookie-consent";

import DataProvider from "./data_provider/data_provider";
import rawUserData from "./assets/data/data.json";

import Home from "./components/sections/home";
import AIInteraction from "./components/sections/ai-interaction/ai-interaction";
import SkillsSummary from "./components/sections/skills/skills";
import ReachOut from "./components/sections/reach-out/reach-out";
import WorkHistory from "./components/sections/work-history/work-history";
import Projects from "./components/sections/projects/projects";

const NAV_ITEMS: Array<{
  id: string;
  label: string;
  href: string;
}> = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "work", label: "Work History", href: "#work" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "more", label: "More", href: "#more" },
  { id: "contact", label: "Contact", href: "#contact" },
];

function App() {
  const userData = new DataProvider(rawUserData);

  return (
    <>
      <ThemeToggle />
      <NavigationBar navItems={NAV_ITEMS} />
      <ScrollIndicator />

      <Home pi={userData.personalInformation} />
      <AIInteraction userData={userData} />
      <SkillsSummary
        skills={userData.skills}
        educations={userData.educations}
      />
      <ReachOut pi={userData.personalInformation} />
      <WorkHistory experiences={userData.experiences} />
      <Projects projects={userData.projects} />

      <SchemeOrg userData={userData} />
      <CookieConsent />
    </>
  );
}

export default App;

