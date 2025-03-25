import { Comment } from "../types";

interface CommentCardProps {
  comment: Comment;
}

const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <article className="p-3 border-2 border-border rounded-lg shadow hover:shadow-md transition-shadow">
      <h3>
        {comment.name} <span>({comment.email})</span>
      </h3>
      <p>{comment.body}</p>
    </article>
  );
};

export default CommentCard;
