import { CommentQuestion } from './../../enterprise/entities/comment-question';
import type { QuestionRepository } from "../repositories/questions-repository"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import type { QuestionCommentRepository } from "../repositories/question-comments-repository"

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: CommentQuestion
}

export class CommentOnQuestionUseCase {
  constructor(private questionRepository: QuestionRepository, private questionCommentRepository: QuestionCommentRepository) { }

  async execute({ authorId, content, questionId }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error("Question not found.")
    }

    const questionComment = CommentQuestion.create({
      authorId: new UniqueEntityId(authorId),
      content,
      questionId: new UniqueEntityId(questionId)
    })

    await this.questionCommentRepository.create(questionComment)

    return { questionComment }
  }
}