import './Name.css';

export function SetName({ name, setName }) {

    return (
        <div className='setNameContainer'>
            <input
                className='setName'
                placeholder="名前を入力"
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>
    );
}