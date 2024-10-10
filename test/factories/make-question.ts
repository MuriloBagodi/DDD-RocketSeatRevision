import { Slug } from './../../src/domain/forum/enterprise/entities/value-objects/slug';
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question, type QuestionProps } from "@/domain/forum/enterprise/entities/question";
import { faker } from "@faker-js/faker/.";

export function makeQuestion(override: Partial<QuestionProps>) {
  const question = Question.create({
    authorId: new UniqueEntityId(),
    title: "example title",
    content: faker.lorem.paragraph(2),
    slug: Slug.create("example-slug"),
    ...override
  });

  return question
}