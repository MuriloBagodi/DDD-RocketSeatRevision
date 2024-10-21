import type { Optional } from "@/core/@types/optional";
import { Entity } from "@/core/entities/entity";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";


export interface CommentQuestionProps {
	authorId: UniqueEntityId;
	questionId: UniqueEntityId;
	content: string;
	createdAt: Date;
	updatedAt?: Date;
}

export class CommentQuestion extends Entity<CommentQuestionProps> {
	get content() {
		return this.props.content;
	}
	get questionId() {
		return this.props.questionId;
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
