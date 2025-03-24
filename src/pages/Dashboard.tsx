import { useQuery } from "@tanstack/react-query";
import jsonLoader from "../utils/jsonLoader";
import { useState } from "react";
import { Post } from "../types";
import PostCard from "../components/PostCard";
import Loading from "../components/Loading";

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
    setDisplayCount((prevCount) => prevCount + 10);
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl uppercase font-bold text-violet-400 mb-8">
        Flet test comments
      </h1>

      <section className="mt-6 flex flex-col items-center gap-6">
        <h2 className="text-2xl font-semibold mb-4">Posts</h2>

        {isLoading && <Loading />}

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
            <PostCard post={post} />
          ))}
        </div>

        {hasMorePosts && (
          <button
            onClick={handleShowMore}
            className="px-6 py-2 cursor-pointer bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors"
          >
            Показать еще
          </button>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
