import './App.css'
import ThemeToggle from './components/ThemeToggle'
import InfoSection from './components/InfoSection'
// import MaintenanceBanner from './components/MaintenanceBanner'
import TopMenu from './components/TopMenu'

function App() {
  return (
    <>
      {/* <MaintenanceBanner /> */}
      <ThemeToggle />
      <InfoSection />
      <TopMenu />
    </>
  )
}

export default App
