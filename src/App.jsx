import { Routes, Route } from 'react-router';
import { useState } from 'react';
import { DrawPage } from './Pages/DrawPage';
import { HomePage } from './Pages/HomePage';
import { GalleryPage } from './Pages/GalleryPage';
import { SearchPage } from './Pages/SearchPage';
import { HelpPage } from './Pages/HelpPage';
import './App.css'

export default function App() {

  const [loadData, setLoadData] = useState(null);

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route
          path="draw"
          element={<DrawPage loadData={loadData} setLoadData={setLoadData} />}
        />
        <Route
          path="gallery"
          element={<GalleryPage setLoadData={setLoadData} />}
        />
        <Route
          path="/search"
          element={<SearchPage setLoadData={setLoadData} />}
        />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </>
  );
}


