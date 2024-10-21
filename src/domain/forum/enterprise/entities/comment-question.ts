import type { Optional } from "@/core/@types/optional";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Comment, type CommentProps } from "./comment";


export interface CommentQuestionProps extends CommentProps {
	questionId: UniqueEntityId;
}

export class CommentQuestion extends Comment<CommentQuestionProps> {
	get questionId() {
		return this.props.questionId
	}

	static create(
		props: Optional<CommentQuestionProps, "createdAt">,
		id?: UniqueEntityId,
	) {
		const commentQuestion = new CommentQuestion({
			...props,
			createdAt: props.createdAt ?? new Date(),
		}, id);

		return commentQuestion;
	}
}
