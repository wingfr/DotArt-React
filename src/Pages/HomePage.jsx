import { SelectBtns } from '../components/SelectBtns';
import { Header } from '../components/Header';
import './HomePage.css';

export function HomePage() {
    return (
        <>
            <div className='header'><Header /></div>
            <SelectBtns />
        </>
    );
}