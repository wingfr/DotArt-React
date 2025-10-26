import { useRef, useState } from 'react'
import html2canvas from 'html2canvas';
import { Settings } from '../components/Settings';
import { Grid } from '../components/Grid';
import { ColorSettings } from '../components/ColorSettings';
import { Header } from '../components/Header';
import "./DrawPage.css"

export function DrawPage() {
    const [gridSize, setGridSize] = useState(null);
    const [currentColor, setCurrentColor] = useState('black');
    const [clearSignal, setClearSignal] = useState(0);
    const displayRef = useRef(null);

    const handleSave = () => {
        if (!displayRef.current) return;

        const grid = displayRef.current.querySelector('.grid');
        const pixels = displayRef.current.querySelectorAll('.pixel');

        if (!grid) return;

        // ✅ 現在の border を保存
        const prevGridBorder = grid.style.border;
        const prevPixelBorders = [];

        // ✅ 全ピクセルの border を保存して消す
        pixels.forEach((pixel, i) => {
            prevPixelBorders[i] = pixel.style.border;
            pixel.style.border = 'none';
        });

        // ✅ grid の border も消す
        grid.style.border = 'none';

        html2canvas(displayRef.current, { backgroundColor: null, scale: 16 / 240 })
            .then(canvas => {
                const link = document.createElement('a');
                link.download = 'dot-art.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            })
            .finally(() => {
                // ✅ 元に戻す
                grid.style.border = prevGridBorder;
                pixels.forEach((pixel, i) => {
                    pixel.style.border = prevPixelBorders[i];
                });
            });
    };

    const handleClearAll = () => {
        setClearSignal(prev => prev + 1); // ✅ 数字を更新して通知
    };

    return (
        <>
            <Header />
            <div className='drawPage'>
                <div className="setting">
                    <Settings onCreate={setGridSize} onSave={handleSave} />
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
                            clearSignal={clearSignal} // ✅ Grid に通知
                        />
                    )}
                </div>
            </div>
        </>
    );
}
