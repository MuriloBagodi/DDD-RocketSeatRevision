import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions.repository"
import { describe, beforeEach, it, expect } from "vitest"
import { makeQuestion } from "test/factories/make-question"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions"


let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: FetchRecentQuestionsUseCase

describe("Fetch Recent Questions Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionRepository)
  })

  it('Should be able to fetch recent questions', async () => {
    await inMemoryQuestionRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 1) }))
    await inMemoryQuestionRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 18) }))
    await inMemoryQuestionRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 23) }))

    const { questions } = await sut.execute({ page: 1 })

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 1) })
    ])

  })

  it('Should to fetch paginated recent question', async () => {
    for (let i = 0; i <= 22; i++) {
      await inMemoryQuestionRepository.create(makeQuestion())
    }

    const { questions } = await sut.execute({
      page: 2
    })

    expect(questions).toHaveLength(2)
  })

})

