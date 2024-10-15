import { Slug } from './../../src/domain/forum/enterprise/entities/value-objects/slug';
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question, type QuestionProps } from "@/domain/forum/enterprise/entities/question";
import { faker } from "@faker-js/faker/.";

export function makeQuestion(override?: Partial<QuestionProps>, id?: UniqueEntityId) {
  const question = Question.create({
    authorId: new UniqueEntityId(),
    title: faker.lorem.sentence(3),
    content: faker.lorem.text(),
    ...override
  }, id);

  return question
}