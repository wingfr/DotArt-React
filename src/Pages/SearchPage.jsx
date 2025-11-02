import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./SearchPage.css";
import { Header } from "../components/Header";

export function SearchPage({ setLoadData }) {
    const [search, setSearch] = useState("");
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    // 投稿データを localStorage から読み込み
    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
        setPosts(savedPosts);
    }, []);

    //  nullチェック付きの安全な検索
    const filteredPosts = posts.filter((p) => {
        const searchText = search.toLowerCase();

        // name / author / tags が undefined の場合に備える
        const name = p.name?.toLowerCase() || "";
        const author = p.author?.toLowerCase() || "";
        const tags = p.tags?.toLowerCase() || "";

        return (
            name.includes(searchText) ||
            author.includes(searchText) ||
            tags.includes(searchText)
        );
    });

    // 読み込み処理
    const handleLoad = (post) => {
        setLoadData(post);
        navigate("/draw");
    };

    return (
        <>
            <Header />
            <div className="searchPage">
                <input
                    className="inputSearch"
                    type="text"
                    placeholder="タイトル・作者・タグで検索"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="postList">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            //  post.id がない場合に備えて代替キーを設定
                            <div key={post.id || `${post.name}-${post.postedAt}`} className="postItem">
                                <p className="title">{post.name || "（タイトルなし）"}</p>
                                <p className="author">by {post.author || "不明"}</p>
                                <p className="tags">
                                    #{post.tags?.split(",").join(" #") || "タグなし"}
                                </p>

                                <div
                                    className="miniGrid"
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: `repeat(${post.cols}, 8px)`,
                                    }}
                                >
                                    {post.pixels?.map((color, i) => (
                                        // key に i を指定して警告回避
                                        <div
                                            key={i}
                                            style={{
                                                width: 8,
                                                height: 8,
                                                backgroundColor: color || "transparent",
                                                border: "1px solid #ddd",
                                            }}
                                        />
                                    ))}
                                </div>

                                <button onClick={() => handleLoad(post)}>読み込む</button>
                            </div>
                        ))
                    ) : (
                        <p>検索結果がありません。</p>
                    )}
                </div>
            </div>
        </>
    );
}



