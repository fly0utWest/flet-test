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
      className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border"
    >
      <h3 className="text-lg font-medium text-secondary mb-2">{post.title}</h3>
      <p className="text-secondary600 line-clamp-3">{post.body}</p>
      <div className="mt-4 flex justify-between items-center">
        {!isSingle && (
          <>
            <span className="text-sm text-secondary500">Post #{post.id}</span>
            <Link
              to={`/post/${post.id}`}
              className="px-3 py-1 bg-violet-100 text-primary rounded-full text-sm hover:bg-violet-200 transition-colors"
            >
              Comments
            </Link>
          </>
        )}
      </div>
    </article>
  );
};

export default PostCard;
