import type { AnswerRepository } from "../repositories/answers-repository"

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

// biome-ignore lint/complexity/noBannedTypes: <explanation>
type DeleteAnswerUseCaseResponse = {}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) { }

  async execute({ answerId, authorId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findAnswerById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString) {
      throw new Error('Not Allowed')
    }

    await this.answerRepository.delete(answer)

    return {}
  }
}