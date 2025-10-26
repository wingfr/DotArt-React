import { Link } from 'react-router';
import "./SelectBtns.css";

export function SelectBtns() {
    return (
        <>
            <div className="SelectBtns">
                <Link to="/draw" className=''>
                    <button className='HomeBtn drawBtn'>
                        ドット絵を描く
                    </button>
                </Link>
                <Link to="/gallery">
                    <button className='HomeBtn galleryBtn'>
                        マイギャラリー
                    </button>
                </Link>
                <Link to="/search">
                    <button className='HomeBtn searchBtn'>
                        素材を探す
                    </button>
                </Link>
            </div>
        </>
    );
}