import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { CommentQuestion, type CommentQuestionProps } from '@/domain/forum/enterprise/entities/comment-question';
import { faker } from "@faker-js/faker/.";

export function makeQuestionComment(override?: Partial<CommentQuestionProps>, id?: UniqueEntityId) {
  const questionComment = CommentQuestion.create({
    authorId: new UniqueEntityId(),
    questionId: new UniqueEntityId(),
    content: faker.lorem.text(),
    ...override
  }, id);

  return questionComment
}