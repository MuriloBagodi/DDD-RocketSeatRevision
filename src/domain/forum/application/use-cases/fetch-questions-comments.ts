import type { CommentQuestion } from "../../enterprise/entities/comment-question"
import type { QuestionCommentRepository } from "../repositories/question-comments-repository"

interface FetchRecentCommentsUseCaseRequest {
  page: number
  questionId: string
}

interface FetchRecentCommentsUseCaseResponse {
  questionComments: CommentQuestion[]
}

export class FetchRecentCommentsUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) { }

  async execute({ page, questionId }: FetchRecentCommentsUseCaseRequest): Promise<FetchRecentCommentsUseCaseResponse> {
    const questionComments = await this.questionCommentRepository.findManyByQuestionId(questionId, { page })

    return { questionComments }
  }
}