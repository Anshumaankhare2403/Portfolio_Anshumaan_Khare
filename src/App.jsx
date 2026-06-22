import { useState } from "react";

import SplashScreen from "./components/SplashScreen";
import HomePage from "./Pages/HomePage";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div className="min-h-screen">
      {isSignedIn ? (
        <HomePage />
      ) : (
        <SplashScreen onSignIn={() => setIsSignedIn(true)} />
      )}
    </div>
  );
}

export default App;
