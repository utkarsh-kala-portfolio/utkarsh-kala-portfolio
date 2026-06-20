import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { ScrollProgress } from "./components/ScrollProgress";
import { Loader } from "./components/Loader";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Journey } from "./pages/Journey";
import { Customers } from "./pages/Customers";
import { Stack } from "./pages/Stack";
import { WhyMe } from "./pages/WhyMe";
import { Connect } from "./pages/Connect";

function App() {
  return (
    <Router>
      <Loader />
      <ScrollToTop />
      <ScrollProgress />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/saas-stack" element={<Stack />} />
        <Route path="/why-me" element={<WhyMe />} />
        <Route path="/connect" element={<Connect />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
