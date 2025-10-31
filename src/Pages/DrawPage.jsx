import { useRef, useState, useEffect } from 'react'
import html2canvas from 'html2canvas';
import { Settings } from '../components/Settings';
import { Grid } from '../components/Grid';
import { ColorSettings } from '../components/ColorSettings';
import { Header } from '../components/Header';
import { SetName } from '../components/Name';
import "./DrawPage.css"

export function DrawPage({ loadData, setLoadData }) {
    const [gridSize, setGridSize] = useState(null);
    const [currentColor, setCurrentColor] = useState('black');
    const [clearSignal, setClearSignal] = useState(0);
    const [loadedPixels, setLoadedPixels] = useState(null);
    const displayRef = useRef(null);
    const [name, setName] = useState('');

    const handleSave = () => {
        if (!displayRef.current) return;

        const grid = displayRef.current.querySelector('.grid');
        const pixels = displayRef.current.querySelectorAll('.pixel');


        if (!grid) return;

        const prevGridBorder = grid.style.border;
        const prevPixelBorders = [];

        pixels.forEach((pixel, i) => {
            prevPixelBorders[i] = pixel.style.border;
            pixel.style.border = 'none';
        });

        grid.style.border = 'none';

        html2canvas(displayRef.current, { backgroundColor: null, scale: 16 / 240 })
            .then(canvas => {
                const link = document.createElement('a');
                link.download = `${name}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            })
            .finally(() => {
                grid.style.border = prevGridBorder;
                pixels.forEach((pixel, i) => {
                    pixel.style.border = prevPixelBorders[i];
                });
            });
    };

    const handleClearAll = () => setClearSignal(prev => prev + 1);

    const handleSaveToGallery = () => {
        const grid = displayRef.current.querySelector('.grid');
        const pixels = displayRef.current.querySelectorAll('.pixel');

        if (!grid || pixels.length === 0) return;

        const pixelColors = Array.from(pixels).map(pixel =>
            pixel.style.backgroundColor || null
        );

        const data = {
            name: name || "unknown",
            rows: gridSize.rows,
            cols: gridSize.cols,
            pixels: pixelColors,
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
        setLoadedPixels(loadData.pixels); // ✅ pixels 値を渡す
        setLoadData(null);
    }, [loadData, setLoadData]);

    return (
        <>
            <Header />
            <div className='drawPage'>

                <div className="setting">
                    <SetName
                        name={name}
                        setName={setName}
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
                            initialPixels={loadedPixels} // ✅ 正しく設定
                        />
                    )}
                </div>
            </div>
        </>
    );
}
