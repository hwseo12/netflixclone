import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { Home } from "./Routes/Home";
import { Tv } from "./Routes/Tv";
import { Search } from "./Routes/Search";
import { Header } from "./Components/Header";

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="movies/:movieId" element={<Home />} />
        </Route>
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
