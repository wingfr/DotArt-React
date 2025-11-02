import './Name.css';

export function SetName({ name, setName, author, setAuthor }) {

    return (
        <div className='setNameContainer'>
            <input
                className='setName'
                placeholder="作品名を入力"
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className='setAuthor'
                placeholder="作者名を入力"
                type='text'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
        </div>
    );
}