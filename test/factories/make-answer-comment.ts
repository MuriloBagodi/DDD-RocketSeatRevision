import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { CommentAnswer, type CommentAnswerProps } from '@/domain/forum/enterprise/entities/comment-answer';
import { faker } from "@faker-js/faker/.";

export function makeAnswerComment(override?: Partial<CommentAnswerProps>, id?: UniqueEntityId) {
  const answerComment = CommentAnswer.create({
    authorId: new UniqueEntityId(),
    answerId: new UniqueEntityId(),
    content: faker.lorem.text(),
    ...override
  }, id);

  return answerComment
}