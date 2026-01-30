import { ThemeProvider } from './context/ThemeContext';
import GameArena from './components/game/GameArena';

const App = () => {
  return (
    <ThemeProvider>
      <GameArena />
    </ThemeProvider>
  );
};

export default App;
