import { Link, Route, Routes } from 'react-router-dom';
import { About } from './pages/About.tsx';
import { Home } from './pages/Home.tsx';

function App() {
  return (
    <div>
      <nav className="flex flex-row gap-2">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
