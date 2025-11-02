import { useState } from 'react';
import './Header.css';
import { Link } from 'react-router';

export function Header() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className='header'>
                <Link to="/">
                    <div className='headerTitle'><span className='text-Simple'>Simple</span><span className='text-DotArt'>DotArt</span></div>
                </Link>
                <div className='middle-section'>
                    <Link to="/">
                        <div className='middle toHome'>Home</div>
                    </Link>
                    <Link to="/draw">
                        <div className='middle toCanvas'>Canvas</div>
                    </Link>
                    <Link to="/gallery">
                        <div className='middle toGallery'>Gallery</div>
                    </Link>
                    <Link to="/search">
                        <div className='middle toGallery'>Search</div>
                    </Link>
                </div>

                <div className="menu">
                    <div
                        className="menuContents"
                        onClick={() => setOpen(!open)}
                    >
                        ☰
                    </div>

                    <nav className={`nav ${open ? "show" : ""}`}>
                        <ul>
                            <li>Contact</li>
                            <li>Help</li>
                        </ul>
                    </nav>
                </div>
            </div>


        </>
    );
}