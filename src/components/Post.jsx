import './Post.css';
import { useState } from 'react';

export function Post({ gridSize, author, name, getPixels, getImage }) {
    const [tags, setTags] = useState("");

    // 投稿処理
    const handlePost = async () => {
        if (!gridSize || !name.trim() || !author.trim()) {
            alert("作品名・作者名・グリッドを設定してください！");
            return;
        }

        const pixels = getPixels();
        const imageData = await getImage();

        const postData = {
            id: Date.now(), // 🔑 一意なID
            name,
            author,
            tags: tags.trim().toLowerCase(), // 🔍 検索のために小文字化
            rows: gridSize.rows,
            cols: gridSize.cols,
            pixels,
            image: imageData,
            postedAt: Date.now(),
        };

        // ローカルストレージに保存
        const posts = JSON.parse(localStorage.getItem("posts") || "[]");
        posts.push(postData);
        localStorage.setItem("posts", JSON.stringify(posts));

        alert("投稿しました！");
        setTags(""); // 入力欄をリセット
    };

    return (
        <div className="postContainer">
            <input
                className='keyword'
                type="text"
                placeholder="キーワード（例：青, 猫, 夜）"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />
            <button
                onClick={handlePost}
                className='PostBtn'
            >
                投稿する
            </button>
        </div>
    );
}
