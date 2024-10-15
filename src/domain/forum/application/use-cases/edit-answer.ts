import type { Answer } from "../../enterprise/entities/answer";
import type { AnswerRepository } from "../repositories/answers-repository"

interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) { }

  async execute({ authorId, content, answerId }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findAnswerById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString) {
      throw new Error('Not Allowed')
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return {
      answer
    }
  }
}