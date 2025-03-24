import React from "react";
import { Post } from "../types";
import { Link } from "react-router";

interface PostCardProps {
  post: Post;
  isSingle?: boolean;
}

const PostCard = ({ post, isSingle = false }: PostCardProps) => {
  return (
    <article
      key={post.id}
      className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
    >
      <h3 className="text-lg font-medium text-gray-900 mb-2">{post.title}</h3>
      <p className="text-gray-600 line-clamp-3">{post.body}</p>
      <div className="mt-4 flex justify-between items-center">
        {!isSingle && (
          <>
            <span className="text-sm text-gray-500">Пост #{post.id}</span>
            <Link
              to={`/post/${post.id}`}
              className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm hover:bg-violet-200 transition-colors"
            >
              Комментарии
            </Link>
          </>
        )}
      </div>
    </article>
  );
};

export default PostCard;
