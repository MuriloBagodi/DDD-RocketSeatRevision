import type { AnswerRepository } from "@/domain/forum/application/repositories/answers-repository"
import type { Answer } from "@/domain/forum/enterprise/entities/answer"

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = []
  async create(answer: Answer): Promise<Answer> {
    this.items.push(answer)

    return answer
  }
}