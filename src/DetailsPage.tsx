import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./App.css";

type detailsType = {
  id: number;
  createdAt: string;
    thumbnailUrl: any;
  categories: string[];
  title: string;
  content: string;
};

type ApiResponse = {
  post: detailsType;
}

const DetailsPage = () => {
  const { id } = useParams();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return date.toLocaleDateString("ja-JP", options);
  };

  const [detailsData, setDetailsData] = useState<detailsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // ローディング状態を追加

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(
          `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
        );
        const result = await response.json() as ApiResponse;

        setDetailsData(result.post);
      } finally {
        setLoading(false); // データ取得が完了したらローディングを終了
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // ローディング中の表示
  }

  if (!detailsData) return <div>投稿が見つかりません</div>;

  return (
    <div className="App">
      <header className="header-App">
        <Link to="/" className="link">
          Blog
        </Link>
        <Link to="/inquiry" className="link">
          お問い合わせ
        </Link>
      </header>

      <div style={{ border: "none" }} className="posts-info">
        <ul className="post-list">
          <li key={detailsData.id} className="post-item">
            <div className="img">
              <img src={detailsData.thumbnailUrl} alt="img" />
            </div>
            <div className="date">{formatDate(detailsData.createdAt)}</div>
            <div className="programming-language">
              {detailsData.categories.map((category, idx) => (
                <span key={idx} className="category-box">
                  {category}
                </span>
              ))}
            </div>
            <div className="title">{detailsData.title}</div>
            <div
              style={{ display: "block" }}
              className="content"
              dangerouslySetInnerHTML={{ __html: detailsData.content }}
            ></div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DetailsPage;
