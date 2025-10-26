import { Routes, Route } from 'react-router';
import { DrawPage } from './Pages/DrawPage';
import { HomePage } from './Pages/HomePage';
import { GalleryPage } from './Pages/GalleryPage';
import { SerachPage } from './Pages/SearchPage';
import './App.css'

export default function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="draw" element={<DrawPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="search" element={<SerachPage />} />
      </Routes>
    </>
  );
}


