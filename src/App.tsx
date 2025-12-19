import "./App.css";

import ScrollIndicator from "./components/ui/scroll-indicator";
import ThemeToggle from "./components/ui/theme-toggle";
import SchemeOrg from "./components/ui/scheme-org";
import NavigationBar from "./components/ui/navigation-bar";

import DataProvider from "./data_provider/data_provider";
import rawUserData from "./assets/data/data.json";

import Home from "./components/sections/home";
import About from "./components/sections/about/about";
import SkillsSummary from "./components/sections/skills/skills";
import WorkHistory from "./components/sections/work-history/work-history";

const NAV_ITEMS: Array<{
  id: string;
  label: string;
  href: string;
}> = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "work", label: "Work", href: "#work" },
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
      <About
        pi={userData.personalInformation}
        experiences={userData.experiences}
      />
      <SkillsSummary
        skills={userData.skills}
        educations={userData.educations}
      />
      <WorkHistory experiences={userData.experiences} />

      <SchemeOrg userData={userData} />
    </>
  );
}

export default App;

