import type { QuestionRepository } from "../repositories/questions-repository"

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

// biome-ignore lint/complexity/noBannedTypes: <explanation>
type EditQuestionUseCaseResponse = {}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) { }

  async execute({ authorId, title, content, questionId }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString) {
      throw new Error('Not Allowed')
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return {}
  }
}