import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastProvider } from "./components/Toast/ToastContext";
import ToastContainer from "./components/Toast/ToastContainer";
function App() {
  return (
    <ToastProvider>
      <div className="bg-black">
        <Header />
        <main>
          <Outlet />
          <ToastContainer />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}

export default App;
