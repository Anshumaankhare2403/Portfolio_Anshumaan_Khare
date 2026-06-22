import { useEffect, useState } from "react";

import SplashScreen from "./components/SplashScreen";
import HomePage from "./Pages/HomePage"

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
       {loading ? <SplashScreen /> : <HomePage />}
    </div>
  )
}

export default App
