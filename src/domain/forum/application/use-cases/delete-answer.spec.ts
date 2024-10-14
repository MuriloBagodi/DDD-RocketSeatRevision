import { describe, beforeEach, it, expect } from "vitest"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { DeleteAnswerUseCase } from "./delete-answer"
import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer.repository"
import { makeAnswer } from "test/factories/make-answer"


let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: DeleteAnswerUseCase

describe("Delete Answer Use Case", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)

  })
  it('Should be able to delete a answer', async () => {
    const newAnswer = makeAnswer({ authorId: new UniqueEntityId("author1") }, new UniqueEntityId("answer1"))

    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      answerId: "answer1",
      authorId: "author1",

    })

    expect(inMemoryAnswerRepository).toHaveLength(0)
  })

  it('Should not be able to delete a answer that you are not the author of it', async () => {

    const newAnswer = makeAnswer({ authorId: new UniqueEntityId("author1") }, new UniqueEntityId("answer1"))

    await inMemoryAnswerRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        answerId: "answer1",
        authorId: "author2",
      })
    }).rejects.toBeInstanceOf(Error)

    expect(inMemoryAnswerRepository).toHaveLength(1)
  })

})

