import { ApiStatus } from './components/ApiStatus'
import { ProfileCard } from './components/ProfileCard'
import './App.css'

function App() {
  return (
    <main>
      <ProfileCard />
      <footer>
        <ApiStatus />
      </footer>
    </main>
  )
}

export default App
