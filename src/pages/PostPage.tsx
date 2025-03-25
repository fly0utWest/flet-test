import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router";
import jsonLoader from "../utils/jsonLoader";
import PostCard from "../components/PostCard";
import CommentCard from "../components/CommentCard";
import { Post, Comment } from "../types";
import Loading from "../components/Loading";

const PostPage = () => {
  const { slug } = useParams();
  const [displayCount, setDisplayCount] = useState(10);

  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostLoadingFailed,
  } = useQuery<Post>({
    queryFn: () => jsonLoader(`/posts/${slug}`),
    queryKey: ["post", slug],
  });

  const {
    data: comments,
    isLoading: areCommentsLoading,
    isError: isCommentsLoadingFailed,
  } = useQuery<Comment[]>({
    queryFn: () => jsonLoader(`/comments?postId=${slug}`),
    queryKey: ["comments", slug],
    enabled: !!post,
  });

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 10);
  };

  const hasMoreComments = comments && comments.length > displayCount;

  return (
    <div className="w-full max-w-4xl">
      <h1 className="text-4xl uppercase font-bold text-violet-400 mb-8">
        Post #{slug}
      </h1>

      {isPostLoading && <Loading />}

      {isPostLoadingFailed && (
        <div className="bg-red-100 border border-destructive text-destructive px-4 py-3 rounded">
          <p>Error loading post</p>
        </div>
      )}

      {!isPostLoading && !isPostLoadingFailed && post && (
        <PostCard isSingle post={post} />
      )}

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>

        {areCommentsLoading && !isPostLoading && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}

        {isCommentsLoadingFailed && (
          <div className="bg-red-100 border border-destructive text-destructive px-4 py-3 rounded">
            <p>Error loading comments</p>
          </div>
        )}

        {comments && comments.length === 0 && (
          <div className="text-center py-4 text-secondary500">
            No comments yet
          </div>
        )}

        <div className="space-y-4">
          {comments?.slice(0, displayCount).map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>

        {hasMoreComments && (
          <button
            onClick={handleShowMore}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-violet-600 transition-colors"
          >
            Show more comment
          </button>
        )}
      </section>
    </div>
  );
};

export default PostPage;
