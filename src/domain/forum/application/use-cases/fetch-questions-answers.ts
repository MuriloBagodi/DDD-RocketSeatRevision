import type { Answer } from "../../enterprise/entities/answer"
import type { AnswerRepository } from "../repositories/answers-repository"
import type { QuestionRepository } from "../repositories/questions-repository"

interface FetchRecentAnswersUseCaseRequest {
  page: number
  questionId: string
}

interface FetchRecentAnswersUseCaseResponse {
  answers: Answer[]
}

export class FetchRecentAnswersUseCase {
  constructor(private answerRepository: AnswerRepository, private questionRepository: QuestionRepository) { }

  async execute({ page, questionId }: FetchRecentAnswersUseCaseRequest): Promise<FetchRecentAnswersUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)
    if (!question) {
      throw new Error('Question not found')
    }

    const answers = await this.answerRepository.findManyByQuestionId({ page }, questionId)
    const index = answers.findIndex(answer => answer.id === question.bestAnswerId)

    if (index !== -1) {
      const [removedObject] = answers.splice(index, 1)

      answers.unshift(removedObject)
    }

    return {
      answers
    }
  }
}