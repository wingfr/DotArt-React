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
            <input
                className="inputSearch"
                type="text"
                placeholder="タイトル・作者・キーワードで検索"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="searchPage">
                <div className="postList">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            //  post.id がない場合に備えて代替キーを設定
                            <div key={post.id || `${post.name}-${post.postedAt}`} className="postItem">
                                <p className="author">作者: {post.author || "不明"}</p>
                                <p className="searchTitle">{post.name || "（タイトルなし）"}</p>
                                {post.image && (
                                    <img
                                        src={post.image}
                                        alt="投稿された絵"
                                        className="postImage"
                                    />
                                )}
                                <p className="tags">
                                    #{post.tags?.split(",").join(" #") || "タグなし"}
                                </p>

                                <button
                                    onClick={() => handleLoad(post)}
                                    className="SearchLoadBtn"
                                >
                                    読み込む
                                </button>
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



