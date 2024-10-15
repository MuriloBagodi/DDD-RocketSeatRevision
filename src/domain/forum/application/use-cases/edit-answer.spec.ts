import { describe, beforeEach, it, expect } from "vitest"
import { makeAnswer } from "test/factories/make-answer"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { EditAnswerUseCase } from "./edit-answer"
import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer.repository"


let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCase

describe("Edit Answer Use Case", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository)

  })
  it('Should be able to edit a answer', async () => {
    const newAnswer = makeAnswer({ authorId: new UniqueEntityId("author1") }, new UniqueEntityId("answer1"))

    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      answerId: "answer1",
      content: "content 1",
      authorId: "author1",
    })

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: "content 1",
      title: "Pergunta Test"
    })
  })

  it('Should not be able to edit a answer that you are not the author of it', async () => {

    const newAnswer = makeAnswer({ authorId: new UniqueEntityId("author1") }, new UniqueEntityId("answer1"))

    await inMemoryAnswerRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        answerId: "answer1",
        content: "content 1",
        authorId: "author2",
      })
    }).rejects.toBeInstanceOf(Error)

    expect(inMemoryAnswerRepository).toHaveLength(1)
  })

})

