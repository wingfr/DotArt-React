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
                            {/* ✅ 削除ボタン */}
                            <button className="deleteBtn" onClick={() => handleDelete(index)}>
                                ×
                            </button>
                            <div className="galleryItemsContent">
                                <p className="projectAuthor">作者: {item.author || "unknown"}</p>
                                <p className="projectName"> {item.name || "unknown"}</p>

                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt="投稿された絵"
                                        className="galleryItemsImage"
                                    />
                                )}
                                <p className="gridSize">{item.rows} × {item.cols}</p>

                            </div>
                            <p className="date">{new Date(item.savedAt).toLocaleString()}</p>
                            {/* 読み込みボタン */}
                            <button className="loadBtn" onClick={() => handleLoad(item)}>
                                読み込む
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

