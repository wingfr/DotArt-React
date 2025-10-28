import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";

export function GalleryPage({ setLoadData }) {
    const [gallery, setGallery] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('gallery') || "[]");
        setGallery(data);
    }, []);

    const handleLoad = (item) => {
        setLoadData(item);
        navigate("/draw");
    }

    return (
        <>
            <Header />
            <div className="galleryPage">
                <h2>Gallery</h2>

                <Link to="/draw">✏️ Create New</Link>

                <div className="galleryList">
                    {gallery.map((item, index) => (
                        <div key={index} className="galleryItem">
                            <p>{item.rows} × {item.cols}</p>
                            <p>{new Date(item.savedAt).toLocaleString()}</p>

                            {/* ✅ 読み込みボタン */}
                            <button onClick={() => handleLoad(item)}>
                                読み込む
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

