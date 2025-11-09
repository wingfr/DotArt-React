import { useRef, useState, useEffect } from 'react'
import { Settings } from '../components/Settings';
import { Grid } from '../components/Grid';
import { ColorSettings } from '../components/ColorSettings';
import { Header } from '../components/Header';
import { SetName } from '../components/Name';
import { Post } from '../components/Post';
import "./DrawPage.css"

export function DrawPage({ loadData, setLoadData }) {
    const [gridSize, setGridSize] = useState(null);
    const [currentColor, setCurrentColor] = useState('black');
    const [clearSignal, setClearSignal] = useState(0);
    const [loadedPixels, setLoadedPixels] = useState(null);
    const displayRef = useRef(null);
    const [name, setName] = useState('');
    const [pixels, setPixels] = useState([]);
    const [author, setAuthor] = useState("");

    const getPixels = () => pixels;
    const [getImage, setGetImage] = useState(null);


    const handleSave = async () => {
        if (!displayRef.current) return;

        const grid = displayRef.current.querySelector('.grid');
        const pixels = displayRef.current.querySelectorAll('.pixel');
        if (!grid || pixels.length === 0) return;

        const rows = gridSize.rows;
        const cols = gridSize.cols;

        // ① 新しいCanvasを作る（16x16など固定サイズ）
        const canvas = document.createElement("canvas");
        canvas.width = cols;
        canvas.height = rows;
        const ctx = canvas.getContext("2d");

        // ② ピクセルごとに色を塗る
        pixels.forEach((pixel, i) => {
            const color = pixel.style.backgroundColor || "transparent";
            const x = i % cols;
            const y = Math.floor(i / cols);
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
        });

        // ③ PNGとして保存
        const link = document.createElement("a");
        link.download = `${name || "image"}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };


    const handleClearAll = () => setClearSignal(prev => prev + 1);

    const handleSaveToGallery = async () => {
        const grid = displayRef.current.querySelector('.grid');
        const pixels = displayRef.current.querySelectorAll('.pixel');

        if (!grid || pixels.length === 0) return;

        const pixelColors = Array.from(pixels).map(pixel =>
            pixel.style.backgroundColor || null
        );

        const imageData = await getImage();

        const data = {
            name: name || "untitled",
            author: author || "unknown",
            rows: gridSize.rows,
            cols: gridSize.cols,
            pixels: pixelColors,
            image: imageData,
            savedAt: Date.now()
        };

        const gallery = JSON.parse(localStorage.getItem('gallery') || '[]');
        gallery.push(data);
        localStorage.setItem('gallery', JSON.stringify(gallery));

        alert("ギャラリーに保存しました！");
    };

    // ✅ ギャラリーデータの読み込み処理
    useEffect(() => {
        if (!loadData) return;

        setGridSize({ rows: loadData.rows, cols: loadData.cols });
        setLoadedPixels(loadData.pixels);
        setAuthor(loadData.author || "");
        setName(loadData.name || "");
        setLoadData(null)
    }, [loadData, setLoadData]);



    return (
        <>
            <Header />
            <div className='drawPage'>

                <div className="setting">
                    <Post
                        gridSize={gridSize}
                        name={name}
                        author={author}
                        getPixels={getPixels}
                        getImage={getImage}
                    />
                    <SetName
                        className="setName"
                        name={name}
                        setName={setName}
                        author={author}
                        setAuthor={setAuthor}
                    />
                    <Settings
                        onCreate={setGridSize}
                        onSave={handleSave}
                        onSaveToGallery={handleSaveToGallery}
                    />
                    <ColorSettings
                        onColorSelect={setCurrentColor}
                        onClear={handleClearAll}
                    />
                </div>

                <div ref={displayRef}>
                    {gridSize && (
                        <Grid
                            rows={gridSize.rows}
                            cols={gridSize.cols}
                            currentColor={currentColor}
                            clearSignal={clearSignal}
                            initialPixels={loadedPixels}
                            onPixelsChange={(pixels, exportAsImage) => {
                                setPixels(pixels);
                                setGetImage(() => exportAsImage); //関数として保存
                            }}
                        />
                    )}
                </div>

            </div>
        </>
    );
}
