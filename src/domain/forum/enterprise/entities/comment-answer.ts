import type { Optional } from "@/core/@types/optional";
import { Entity } from "@/core/entities/entity";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";


export interface CommentAnswerProps {
  authorId: UniqueEntityId;
  answerId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class CommentAnswer extends Entity<CommentAnswerProps> {
  get content() {
    return this.props.content;
  }

  get authorId() {
    return this.props.authorId;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
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
