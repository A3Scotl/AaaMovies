import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function App() {
  
  return (
    <div className='bg-black'>
      <Header/>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App;