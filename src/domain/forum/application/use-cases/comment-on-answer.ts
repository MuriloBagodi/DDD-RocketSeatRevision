import { CommentAnswer } from './../../enterprise/entities/comment-answer';
import type { AnswerRepository } from "../repositories/answers-repository"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import type { AnswerCommentRepository } from "../repositories/answer-comments-repository"

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: CommentAnswer
}

export class CommentOnAnswerUseCase {
  constructor(private answerRepository: AnswerRepository, private answerCommentRepository: AnswerCommentRepository) { }

  async execute({ authorId, content, answerId }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findAnswerById(answerId)

    if (!answer) {
      throw new Error("Answer not found.")
    }

    const answerComment = CommentAnswer.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.answerCommentRepository.create(answerComment)

    return { answerComment }
  }
}