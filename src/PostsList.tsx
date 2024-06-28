import { useEffect, useState } from 'react'
import './App.css';
import { Link } from 'react-router-dom';

type ArticleType = {
id: number;
createdAt: string;
categories: string[];
title: string;
content: string;
}

type PostsType = {
  posts: ArticleType[];
}

const PostsList = () => {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };

    return date.toLocaleDateString('ja-JP', options);
  };

  const [posts, setPosts] = useState<PostsType>({ posts: [] })
  const [loading, setLoading] = useState<boolean>(true); // ローディング状態を追加

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts");
        const data = await response.json() as PostsType

        setPosts(data);

      }  finally {
        setLoading(false); // データ取得が完了したらローディングを終了
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // ローディング中の表示
  }

      
  return (

    <div className="App">
      <header className="header-App">
        <Link className="link" to="/">Blog</Link>
        <Link className="link" to="/inquiry">お問い合わせ</Link>
      </header>

      {
        Array.isArray(posts.posts) && posts.posts.map(article => (
          <div key={article.id} className="posts-info">
            <ul className="post-list">
              <li className="post-item">
                <Link to={`/post/${article.id}`}>
                  <div className="date">{formatDate(article.createdAt)}</div>
                  <div className="programming-language">{article.categories.map((category, idx) => (
                    <span key={idx} className="category-box">{category}</span>
                  ))}</div>
                  <div className="title">{article.title}</div>
                  <div className="content" dangerouslySetInnerHTML={{ __html: article.content }}>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        ))}

    </div>
  );
    }

export default PostsList;