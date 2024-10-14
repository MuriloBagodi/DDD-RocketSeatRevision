import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions.repository"
import { describe, beforeEach, it, expect } from "vitest"
import { makeQuestion } from "test/factories/make-question"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { EditQuestionUseCase } from "./edit-question"


let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCase

describe("Edit Question Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionRepository)

  })
  it('Should be able to edit a question', async () => {
    const newQuestion = makeQuestion({ authorId: new UniqueEntityId("author1") }, new UniqueEntityId("question1"))

    await inMemoryQuestionRepository.create(newQuestion)

    await sut.execute({
      questionId: "question1",
      content: "content 1",
      authorId: "author1",
      title: "Pergunta Test"
    })

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      content: "content 1",
      title: "Pergunta Test"
    })
  })

  it('Should not be able to edit a question that you are not the author of it', async () => {

    const newQuestion = makeQuestion({ authorId: new UniqueEntityId("author1") }, new UniqueEntityId("question1"))

    await inMemoryQuestionRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        questionId: "question1",
        content: "content 1",
        authorId: "author2",
        title: "Pergunta Test"
      })
    }).rejects.toBeInstanceOf(Error)

    expect(inMemoryQuestionRepository).toHaveLength(1)
  })

})

