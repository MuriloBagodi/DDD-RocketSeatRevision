import type { PaginationParams } from "@/core/repositories/pagination-params"
import type { AnswerRepository } from "@/domain/forum/application/repositories/answers-repository"
import type { Answer } from "@/domain/forum/enterprise/entities/answer"

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = []

  async findManyByQuestionId({ page }: PaginationParams, questionId: string) {
    const answers = this.items.filter(item => item.questionId.toString === questionId).slice((page - 1) * 20, page * 20)

    return answers
  }

  async save(answer: Answer) {
    const exitAnswerItemIndex = this.items.findIndex((item) => item.id === answer.id)

    if (exitAnswerItemIndex >= 0) {
      this.items[exitAnswerItemIndex] = answer
    } else {
      this.items.push(answer)
    }

    return answer
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(itemIndex, 1)

  }

  async findAnswerById(id: string) {
    const answer = this.items.find((item) => item.id.toString === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async create(answer: Answer) {
    this.items.push(answer)

    return answer
  }
}