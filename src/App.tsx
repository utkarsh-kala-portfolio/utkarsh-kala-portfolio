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

import { NotFound } from "./pages/NotFound";
import { ContactModalProvider } from "./context/ContactModalContext";
import { ContactModal } from "./components/ContactModal";

function App() {
  return (
    <ContactModalProvider>
      <Router>
        <Loader />
        <ScrollToTop />
        <ScrollProgress />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/stack" element={<Stack />} />
          <Route path="/why-me" element={<WhyMe />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ContactModal />
      </Router>
    </ContactModalProvider>
  );
}

export default App;
