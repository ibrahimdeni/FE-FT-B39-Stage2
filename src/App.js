import { Routes, Route } from "react-router-dom";
// import Layout from "./widget/layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Detail from "./pages/DetailJourney";
import NewJourney from "./pages/NewJourney";
import BookMark from "./pages/Bookmark";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Routes>
        <Route path="/detail" element={<Detail />} />
      </Routes>
      <Routes>
        <Route path="/newjourney" element={<NewJourney />} />
      </Routes>
      <Routes>
        <Route path="/bookmark" element={<BookMark />} />
      </Routes>
    </>
  );
}

export default App;
