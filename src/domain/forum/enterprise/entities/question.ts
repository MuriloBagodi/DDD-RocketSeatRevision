import type { Optional } from "@/core/@types/optional";
import { Entity } from "@/core/entities/entity";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import dayjs from "dayjs";
import { Slug } from "./value-objects/slug";

interface QuestionProps {
	authorId: UniqueEntityId;
	bestAnswerId?: UniqueEntityId;
	title: string;
	content: string;
	slug: Slug;
	createdAt: Date;
	updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
	get content() {
		return this.props.content;
	}
	get slug() {
		return this.props.slug;
	}
	get bestAnswerId() {
		return this.props.bestAnswerId;
	}
	get title() {
		return this.props.title;
	}
	get updatedAt() {
		return this.props.updatedAt;
	}
	get createdAt() {
		return this.props.createdAt;
	}
	get authorId() {
		return this.props.authorId;
	}
	get isNew(): boolean {
		return dayjs().diff(this.createdAt) <= 3;
	}
	get excerpt() {
		return this.content.substring(0, 120).trimEnd().concat("...");
	}

	set content(content: string) {
		this.props.content = content;
		this.touch();
	}
	set title(title: string) {
		this.props.title = title;
		this.props.slug = Slug.createFromText(title);

		this.touch();
	}
	set bestAnswerId(bestAnswerId: UniqueEntityId | undefined) {
		this.props.bestAnswerId = bestAnswerId;
		this.touch();
	}

	private touch() {
		this.props.updatedAt = new Date();
	}
	// não crie nenhum setter no começo da classe -> crie conforme for precisando.

	static create(
		props: Optional<QuestionProps, "createdAt" | "slug">,
		id?: UniqueEntityId,
	) {
		const question = new Question(
			{
				...props,
				slug: props.slug ?? Slug.createFromText(props.title),
				createdAt: new Date(),
			},
			id,
		);

		return question;
	}
}
