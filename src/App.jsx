import { Routes, Route } from 'react-router';
import { useState } from 'react';
import { DrawPage } from './Pages/DrawPage';
import { HomePage } from './Pages/HomePage';
import { GalleryPage } from './Pages/GalleryPage';
import { SerachPage } from './Pages/SearchPage';
import { SetName } from './components/Name';
import './App.css'

export default function App() {

  const [loadData, setLoadData] = useState(null);
  const [name, setName] = useState("");

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
          element={<GalleryPage setLoadData={setLoadData} name={name} setName={setName} />}
        />
        <Route path="search" element={<SerachPage />} />
      </Routes>
    </>
  );
}


