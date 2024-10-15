import type { Question } from './../../src/domain/forum/enterprise/entities/question';
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { PaginationParams } from '@/core/repositories/pagination-params';
import type { QuestionRepository } from "@/domain/forum/application/repositories/questions-repository";

export class InMemoryQuestionRepository implements QuestionRepository {
  public items: Question[] = []

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice((page - 1) * 20, page * 20)

    return questions
  }

  async save(question: Question) {
    const existQuestionIndex = this.items.findIndex((item) => item.id === question.id)

    if (existQuestionIndex >= 0) {
      this.items[existQuestionIndex] = question
    } else {
      this.items.push(question)
    }

    return question
  }


  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }
  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString === id)

    if (!question) {
      return null
    }

    return question
  }

  async update(questionId: UniqueEntityId, question: Partial<Question>) {
    const index = this.items.findIndex((item) => item.id === questionId)

    if (question.bestAnswerId) {
      this.items[index].bestAnswerId = question.bestAnswerId
    } else if (question.content) {
      this.items[index].content = question.content
    } else if (question.title) {
      this.items[index].title = question.title
    }

    return this.items[index]
  }

  async delete(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items.splice(itemIndex, 1)
  }
}