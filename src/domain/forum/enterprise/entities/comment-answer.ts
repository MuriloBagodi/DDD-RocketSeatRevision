import type { Optional } from "@/core/@types/optional";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Comment, type CommentProps } from "./comment";

export interface CommentAnswerProps extends CommentProps {
  answerId: UniqueEntityId;
}

export class CommentAnswer extends Comment<CommentAnswerProps> {
  get answerId() {
    return this.props.answerId;
  }
  static create(
    props: Optional<CommentAnswerProps, "createdAt">,
    id?: UniqueEntityId,
  ) {
    const commentAnswer = new CommentAnswer({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }, id);

    return commentAnswer;
  }
}
