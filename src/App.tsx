import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainThreadApp from "./MainThread";
import WebWorkerApp from "./WebWorker";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/main-thread" element={<MainThreadApp />} />
          <Route path="/web-worker" element={<WebWorkerApp />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/main-thread">Main Thread Calculation</Link>
            </li>
            <li>
              <Link to="/web-worker">Web Worker Calculation</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
}

function Home() {
  return <h1>Welcome to the React Performance Test Application</h1>;
}

export default App;
