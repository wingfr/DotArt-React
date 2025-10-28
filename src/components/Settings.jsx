import { useState } from 'react';
import './Settings.css';

export function Settings({ onCreate, onSave, onSaveToGallery }) {
    const [rows, setRows] = useState('');
    const [cols, setCols] = useState('');

    function handleCreate() {
        if (!rows || !cols) return;
        onCreate({ rows: Number(rows), cols: Number(cols) });
    }

    return (

        <div className="createSetting">
            <input
                className="rows"
                type="number"
                placeholder="縦の数"
                value={rows}
                onChange={(e) => setRows(e.target.value)}
            />
            <input
                className="cols"
                type="number"
                placeholder="横の数"
                value={cols}
                onChange={(e) => setCols(e.target.value)}
            />

            <button className="createBtn" onClick={handleCreate}>
                生成
            </button>

            <div className='saveBtns'>
                <button className="pngBtn" onClick={onSave}>
                    PNG透過
                </button>
                <button className="gallery" onClick={onSaveToGallery}>
                    ギャラリー
                </button>
            </div>
        </div>


    );
}



