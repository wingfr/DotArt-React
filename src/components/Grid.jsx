import { useState, useEffect, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import './Grid.css';

export function Grid({ rows, cols, currentColor, clearSignal, initialPixels, onPixelsChange }) {
    const [isDrawing, setIsDrawing] = useState(false);
    const [pixels, setPixels] = useState([]);
    const gridRef = useRef(null);

    const exportAsImage = useCallback(async () => {
        if (!gridRef.current) return null;
        const canvas = await html2canvas(gridRef.current, {
            backgroundColor: null,
            scale: 2,
        });
        return canvas.toDataURL("image/png");
    }, []);

    useEffect(() => {
        if (initialPixels) {
            // ✅ null を '' に変換してセット
            setPixels(initialPixels.map(c => c || ''));
        } else {
            setPixels(Array(rows * cols).fill(''));
        }
    }, [rows, cols, initialPixels]);

    useEffect(() => {
        if (onPixelsChange) onPixelsChange(pixels);
    }, [onPixelsChange, pixels]);

    //  全消しは clearSignal が変わった時だけ発動！
    useEffect(() => {
        if (!clearSignal) return; //  初回読み込みで発動しないように
        setPixels(Array(rows * cols).fill(''));
    }, [clearSignal, rows, cols]);

    function handlePaint(index) {
        const newPixels = [...pixels];
        newPixels[index] = currentColor === 'erase' ? '' : currentColor;
        setPixels(newPixels);
        if (onPixelsChange) onPixelsChange(newPixels);
    }

    useEffect(() => {
        if (onPixelsChange) {
            onPixelsChange(pixels, exportAsImage);
        }
    }, [onPixelsChange, pixels, exportAsImage]);

    return (
        <div
            ref={gridRef}
            className="grid"
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 15px)`,
                gridTemplateRows: `repeat(${rows}, 15px)`
            }}
            onMouseDown={() => setIsDrawing(true)}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
        >
            {pixels.map((color, i) => (
                <div
                    key={i}
                    className="pixel"
                    style={{ backgroundColor: color || '' }}
                    onMouseDown={() => handlePaint(i)}
                    onMouseOver={() => isDrawing && handlePaint(i)}
                />
            ))}
        </div>
    );
}


