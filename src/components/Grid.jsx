import { useState, useLayoutEffect, useEffect, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import './Grid.css';

export function Grid({ rows, cols, currentColor, clearSignal, initialPixels, onPixelsChange }) {
    const [isDrawing, setIsDrawing] = useState(false);
    const [pixels, setPixels] = useState([]);
    const gridRef = useRef(null);
    const [pixelSize, setPixelSize] = useState(15);

    const exportAsImage = useCallback(async () => {
        if (!gridRef.current) return null;
        const canvas = await html2canvas(gridRef.current, {
            backgroundColor: null,
            scale: 2,
        });
        return canvas.toDataURL("image/png");
    }, []);

    // 初期化
    useEffect(() => {
        if (initialPixels) {
            setPixels(initialPixels.map(c => c || ''));
        } else {
            setPixels(Array(rows * cols).fill(''));
        }
    }, [rows, cols, initialPixels]);

    // ✅ ピクセルサイズを画面幅に合わせて自動調整
    useLayoutEffect(() => {
        const updatePixelSize = () => {
            if (!gridRef.current) return;
            const maxWidth = window.innerWidth * 0.9;
            const maxHeight = window.innerHeight * 0.7;
            const sizeX = maxWidth / cols;
            const sizeY = maxHeight / rows;
            const size = Math.min(sizeX, sizeY, 20);
            setPixelSize(size);
        };

        updatePixelSize();


        window.addEventListener('orientationchange', updatePixelSize);
        window.addEventListener('resize', updatePixelSize);
        return () => {
            window.removeEventListener('resize', updatePixelSize);
            window.removeEventListener('orientationchange', updatePixelSize);
        };
    }, [rows, cols]);

    // ピクセル更新通知


    // クリア処理
    useEffect(() => {
        if (!clearSignal) return;
        setPixels(Array(rows * cols).fill(''));
    }, [clearSignal, rows, cols]);

    // 塗る処理
    function handlePaint(index) {
        const newColor = currentColor === 'erase' ? '' : currentColor;
        if (pixels[index] === newColor) return;

        const newPixels = [...pixels];
        newPixels[index] = newColor;
        setPixels(newPixels);
    }

    // スマホ対応（タッチで描けるように）
    const handleTouchStart = (e) => {
        setIsDrawing(true);
        paintTouch(e.touches[0]);
    };

    const handleTouchMove = (e) => {
        if (!isDrawing) return;
        paintTouch(e.touches[0]);
    };

    const handleTouchEnd = () => setIsDrawing(false);

    // タッチ位置からピクセルを特定して塗る
    const paintTouch = (touch) => {
        if (!gridRef.current) return;
        const rect = gridRef.current.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        const col = Math.floor(x / pixelSize);
        const row = Math.floor(y / pixelSize);
        const index = row * cols + col;
        if (index >= 0 && index < pixels.length) {
            handlePaint(index);
        }
    };

    useEffect(() => {
        if (onPixelsChange) onPixelsChange(pixels, exportAsImage);
    }, [onPixelsChange, pixels, exportAsImage]);



    return (
        <div
            ref={gridRef}
            className="grid"
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, ${pixelSize}px)`,
                gridTemplateRows: `repeat(${rows}, ${pixelSize}px)`,
                gap: 0,
                margin: '0 auto',
                maxWidth: '100%',
                touchAction: 'none', // 👈 スマホのジェスチャー無効化（必須）
            }}
            onMouseDown={() => setIsDrawing(true)}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {pixels.map((color, i) => (
                <div
                    key={i}
                    className="pixel"
                    style={{
                        backgroundColor: color || '',
                        width: `${pixelSize}px`,
                        height: `${pixelSize}px`,
                    }}
                    onMouseDown={() => handlePaint(i)}
                    onMouseOver={() => isDrawing && handlePaint(i)}
                />
            ))}
        </div>
    );
}


