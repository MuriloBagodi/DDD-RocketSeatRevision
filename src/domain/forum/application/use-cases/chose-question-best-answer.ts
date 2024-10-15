import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import type { AnswerRepository } from "../repositories/answers-repository"
import type { Question } from "../../enterprise/entities/question"
import type { QuestionRepository } from "../repositories/questions-repository"

interface ChoseQuestionBestAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

interface ChoseQuestionBestAnswerUseCaseResponse {
  question: Question
}


export class ChoseQuestionBestAnswerUseCase {
  constructor(
    private answersRepository: AnswerRepository,
    private questionRepository: QuestionRepository
  ) { }

  async execute({
    answerId,
    authorId
  }: ChoseQuestionBestAnswerUseCaseRequest): Promise<ChoseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findAnswerById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const question = await this.questionRepository.findById(answer.questionId.toString)

    if (!question) {
      throw new Error("Question not found")
    }

    if (authorId !== question.authorId.toString) {
      throw new Error("Not Allowed")
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return {
      question
    }
  }
}