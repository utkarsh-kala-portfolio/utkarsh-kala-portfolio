import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { ScrollProgress } from "./components/ScrollProgress";
import { Loader } from "./components/Loader";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Journey } from "./pages/Journey";
import { Clients } from "./pages/Clients";
import { SaaSToolkit } from "./pages/SaaSToolkit";
import { WhyMe } from "./pages/WhyMe";
import { LinkedInAuth } from "./pages/LinkedInAuth";

import { NotFound } from "./pages/NotFound";
import { ContactModalProvider } from "./context/ContactModalContext";
import { ContactModal } from "./components/ContactModal";
import { LinkedInToast } from "./components/LinkedInToast";
import { usePageTracking } from "./analytics/usePageTracking";

/** Must live inside <Router> to access useLocation */
function PageTracker() {
  usePageTracking();
  return null;
}

function App() {
  return (
    <ContactModalProvider>
      <Router>
        <PageTracker />
        <Loader />
        <ScrollToTop />
        <ScrollProgress />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/customers" element={<Clients />} />
          <Route path="/saas-toolkit" element={<SaaSToolkit />} />
          <Route path="/stack" element={<SaaSToolkit />} />
          <Route path="/why-me" element={<WhyMe />} />
          <Route path="/systems" element={<WhyMe />} />
          <Route path="/linked-in-auth" element={<LinkedInAuth />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ContactModal />
        <LinkedInToast />
      </Router>
    </ContactModalProvider>
  );
}

export default App;
