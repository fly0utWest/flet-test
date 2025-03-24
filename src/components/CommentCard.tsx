import React from "react";
import { Comment } from "../types";

interface CommentCardProps {
  comment: Comment;
}

const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <article>
      <h3>
        {comment.name} <span>({comment.email})</span>
      </h3>
      <p>{comment.body}</p>
    </article>
  );
};

export default CommentCard;
