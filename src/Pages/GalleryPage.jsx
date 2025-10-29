import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import './GalleryPage.css';

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

    //削除機能
    const handleDelete = (index) => {
        const newGallery = gallery.filter((_, i) => i !== index);
        setGallery(newGallery);
        localStorage.setItem("gallery", JSON.stringify(newGallery));
    };

    return (
        <>
            <Header />
            <div className="galleryPage">



                <div className="galleryList">
                    <Link className='toDrawingPage' to="/draw">ドット絵を描く</Link>
                    {gallery.map((item, index) => (
                        <div key={index} className="galleryItem">
                            <p>{item.rows} × {item.cols}</p>
                            <p className="date">{new Date(item.savedAt).toLocaleString()}</p>

                            {/* ✅ 読み込みボタン */}
                            <button className="loadBtn" onClick={() => handleLoad(item)}>
                                読み込む
                            </button>
                            {/* ✅ 削除ボタン */}
                            <button className="deleteBtn" onClick={() => handleDelete(index)}>
                                削除
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

