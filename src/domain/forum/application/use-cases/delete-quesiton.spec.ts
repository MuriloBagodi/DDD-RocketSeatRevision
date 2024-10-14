import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions.repository"
import { describe, beforeEach, it, expect } from "vitest"
import { makeQuestion } from "test/factories/make-question"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { DeleteQuestionUseCase } from "./delete-question."


let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: DeleteQuestionUseCase

describe("Delete Question Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionRepository)

  })
  it('Should be able to delete a question', async () => {
    const newQuestion = makeQuestion({ authorId: new UniqueEntityId("author1") }, new UniqueEntityId("question1"))

    await inMemoryQuestionRepository.create(newQuestion)

    await sut.execute({
      questionId: "question1",
      authorId: "author1",

    })

    expect(inMemoryQuestionRepository).toHaveLength(0)
  })

  it('Should not be able to delete a question that you are not the author of it', async () => {

    const newQuestion = makeQuestion({ authorId: new UniqueEntityId("author1") }, new UniqueEntityId("question1"))

    await inMemoryQuestionRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        questionId: "question1",
        authorId: "author2",
      })
    }).rejects.toBeInstanceOf(Error)

    expect(inMemoryQuestionRepository).toHaveLength(1)

  })

})

