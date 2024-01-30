import Header from "./components/Header";
import Main from "./components/Main";
import WelcomeSplash from "./components/WelcomeSplash";
import { useState } from "react";

const App = () => {
  const [welcomeSplash, setWelcomeSplash] = useState(true);

  const startGame = () => {
    setWelcomeSplash(false);
  };

  const showRules = () => {
    setWelcomeSplash(true);
  };

  return (
    <div className="min-h-screen w-full bg-indigo-950">
      <Header />
      {welcomeSplash ? (
        <WelcomeSplash startGame={startGame} />
      ) : (
        <Main showRules={showRules} />
      )}
    </div>
  );
};

export default App;
