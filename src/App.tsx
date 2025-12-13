import './App.css'
import ThemeToggle from './components/ThemeToggle'
import InfoSection from './components/InfoSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
// import MaintenanceBanner from './components/MaintenanceBanner'
import TopMenu from './components/TopMenu'
import ScrollIndicator from './components/ScrollIndicator'

function App() {
  return (
    <>
      {/* <MaintenanceBanner /> */}
      <ThemeToggle />
      <InfoSection />
      <AboutSection />
      <SkillsSection />
      <TopMenu />
      <ScrollIndicator />
    </>
  )
}

export default App
