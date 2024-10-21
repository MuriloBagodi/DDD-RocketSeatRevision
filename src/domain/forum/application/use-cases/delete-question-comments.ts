import type { CommentQuestion } from '../../enterprise/entities/comment-question';
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import type { QuestionCommentRepository } from "../repositories/question-comments-repository"

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

interface DeleteQuestionCommentUseCaseResponse {
  questionComment: CommentQuestion
}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) { }

  async execute({ authorId, questionCommentId }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error("Question not found.")
    }

    if (questionComment.authorId.toString !== authorId) {
      throw new Error("Not allowed.")
    }

    await this.questionCommentRepository.delete(questionComment)

    return { questionComment }
  }
}