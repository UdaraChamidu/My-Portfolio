import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { CaseStudy } from "./pages/CaseStudy";
import { caseStudiesPublic } from "./data/caseStudies";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          {caseStudiesPublic && (
            <Route path="/projects/:projectId" element={<CaseStudy />} />
          )}

          {/* Keep this LAST to prevent it from catching valid paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
