import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions.repository"
import { describe, beforeEach, it, expect } from "vitest"
import { CreateQuestionUseCase } from "./create-question"


let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe("Create Question", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)

  })
  it('Should be able to  create a new question', async () => {
    const { question } = await sut.execute({
      title: 'Teste de titulo',
      content: 'test content',
      authorId: "1"
    })

    expect(question.slug).toEqual('teste-de-titulo')
  })
})

