import { beforeEach, expect, it, test } from 'vitest'
import { describe } from 'node:test'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions.repository'
import { CreateQuestionUseCase } from './create-question'
import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer.repository copy'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe("Answer Question use case", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)

  })
  it('Should be able to create an answer', async () => {
    await sut.execute({
      content: "Teste content",
      instructorId: "1",
      questionId: "1"
    })

    expect(inMemoryAnswerRepository.items.length).toEqual(1)
  })
})

