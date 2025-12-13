import './App.css'
import ThemeToggle from './components/ThemeToggle'
import InfoSection from './components/InfoSection'
import MaintenanceBanner from './components/MaintenanceBanner'

function App() {
  return (
    <>
      <MaintenanceBanner />
      <ThemeToggle />
      <InfoSection />
    </>
  )
}

export default App
