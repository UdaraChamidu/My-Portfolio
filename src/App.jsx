import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { caseStudiesPublic } from "./data/caseStudies";
import { Toaster } from "@/components/ui/toaster";

const CaseStudy = lazy(() => import("./pages/CaseStudy").then((module) => ({ default: module.CaseStudy })));
const Article = lazy(() => import("./pages/Article").then((module) => ({ default: module.Article })));
const Writing = lazy(() => import("./pages/Writing").then((module) => ({ default: module.Writing })));

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-background text-foreground" role="status">Loading...</div>}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/writing/:slug" element={<Article />} />
          {caseStudiesPublic && (
            <Route path="/projects/:projectId" element={<CaseStudy />} />
          )}

          {/* Keep this LAST to prevent it from catching valid paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
import { lazy, Suspense } from "react";
