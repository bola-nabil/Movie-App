import {Routes, Route} from "react-router-dom";
import Movies from "./Pages/Movies";
import Series from "./Pages/Series";
import Trending from "./Pages/Trending";
import Search from "./Pages/Search";
import NotFound from "./Pages/NotFound";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <>
      <Header />
      <div className="app">
        <Container>
            <Routes>
              <Route path="/" element={<Trending />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/series" element={<Series />} />
              <Route path="/search" element={<Search />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </Container>
      </div>
      <NavBar />
    </>
  );
}

export default App;
