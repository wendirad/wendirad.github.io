import "./App.css";

import ScrollIndicator from "./components/ui/scroll-indicator";
import ThemeToggle from "./components/ui/theme-toggle";

import DataProvider from "./data_provider/data_provider";
import rawUserData from "./assets/data/data.json";

import SchemeOrg from "./components/ui/scheme-org";
import NavigationBar from "./components/ui/navigation-bar";
import Home from "./components/sections/home";

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

      <SchemeOrg userData={userData} />
    </>
  );
}

export default App;
