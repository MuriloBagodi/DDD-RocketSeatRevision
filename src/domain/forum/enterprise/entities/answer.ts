import type { Optional } from "@/core/@types/optional";
import { Entity } from "@/core/entities/entity";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";


export interface AnswerProps {
	authorId: UniqueEntityId;
	questionId: UniqueEntityId;
	content: string;
	createdAt: Date;
	updatedAt?: Date;
}

export class Answer extends Entity<AnswerProps> {
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
	get excerpt() {
		return this.content.substring(0, 120).trimEnd().concat("...");
	}

	set content(content: string) {
		this.props.content = content;
		this.touch();
	}

	private touch() {
		this.props.updatedAt = new Date();
	}

	static create(
		props: Optional<AnswerProps, "createdAt">,
		id?: UniqueEntityId,
	) {
		const answer = new Answer({
			...props,
			createdAt: props.createdAt ?? new Date(),
		}, id);

		return answer;
	}
}
