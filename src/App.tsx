import './App.css'
import Footer from './components/Footer/Footer'
import Navbar from './components/Layout/Navbar'
import { Outlet } from 'react-router'

function App() {

  return (
    <div className='max-w-full mx-auto'>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default App
