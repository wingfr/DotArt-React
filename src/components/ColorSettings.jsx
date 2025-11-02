import './ColorSettings.css';

export function ColorSettings({ onColorSelect, onClear }) {
    // 色リストを定義（必要に応じて増やせる）
    const colors = [
        'black', 'white', 'red', 'blue', 'rgba(0, 255, 0, 1)', 'yellow', 'rgba(255, 0, 255, 1)',
        '#4d4d4dff', '#bdbdbdff', 'rgba(133, 0, 0, 1)', 'rgba(0, 0, 172, 1)', 'rgba(0, 185, 0, 1)', 'rgba(185, 185, 0, 1)', 'rgba(196, 0, 196, 1)',
        '#838383ff', '#4e4e4eff', 'rgba(83, 0, 0, 1)', 'rgba(0, 0, 90, 1)', 'rgba(0, 116, 0, 1)', 'rgba(124, 124, 0, 1)', 'rgba(114, 0, 114, 1)',
        '#bbbbbbff', '#2c2c2cff', 'rgba(53, 0, 0, 1)', 'rgba(0, 0, 37, 1)', 'rgba(0, 66, 0, 1)', 'rgba(70, 70, 0, 1)', 'rgba(66, 0, 66, 1)',
    ];

    return (
        <div className="colorContainer">
            <div className="colors">
                {colors.map((color, i) => (
                    <div
                        key={i}
                        className="color"
                        style={{ backgroundColor: color }}
                        onClick={() => onColorSelect(color)}
                    />
                ))}
            </div>

            <div className="clearBtns">
                <button
                    className="eraser"
                    onClick={() => onColorSelect('erase')}
                >
                    消しゴム
                </button>

                <button
                    className="clearAll"
                    onClick={onClear}
                >
                    全消し
                </button>
            </div>
        </div>
    );
}
