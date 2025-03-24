import { useQuery } from "@tanstack/react-query";
import jsonLoader from "../utils/jsonLoader";
import { useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function Dashboard() {
  const [displayCount, setDisplayCount] = useState(10);

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery<Post[]>({
    queryFn: () => jsonLoader("posts"),
    queryKey: ["posts"],
  });

  const hasMorePosts = posts && posts.length > displayCount;

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 10); // Show 10 more posts
  };

  return (
    <div className="w-full max-w-4xl">
      <h1 className="text-4xl uppercase font-bold text-violet-400 mb-8">
        Flet test comments
      </h1>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Посты</h2>

        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
          </div>
        )}

        {isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>
              Ошибка при загрузке данных:{" "}
              {(error as Error)?.message || "Неизвестная ошибка"}
            </p>
          </div>
        )}

        {posts && posts.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">Посты не найдены</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts?.slice(0, displayCount).map((post) => (
            <div
              key={post.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 line-clamp-3">{post.body}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">Пост #{post.id}</span>
                <button className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm hover:bg-violet-200 transition-colors">
                  Подробнее
                </button>
              </div>
            </div>
          ))}
        </div>

        {hasMorePosts && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleShowMore}
              className="px-6 py-2 cursor-pointer bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors"
            >
              Показать еще
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
