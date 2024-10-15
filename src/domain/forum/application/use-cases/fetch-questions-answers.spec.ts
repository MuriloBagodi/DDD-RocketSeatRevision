import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions.repository"
import { describe, beforeEach, it, expect } from "vitest"
import { makeQuestion } from "test/factories/make-question"
import { FetchRecentAnswersUseCase } from "./fetch-questions-answers"
import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer.repository"
import { makeAnswer } from "test/factories/make-answer"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { an } from "@faker-js/faker/dist/airline-C5Qwd7_q"


let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: FetchRecentAnswersUseCase

describe("Fetch Question Answers Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new FetchRecentAnswersUseCase(inMemoryAnswerRepository, inMemoryQuestionRepository)
  })

  it('Should be able to fetch question answers', async () => {
    const question = await inMemoryQuestionRepository.create(makeQuestion())
    for (let i = 0; i <= 22; i++) {

      if (i === 9) {
        await inMemoryAnswerRepository.create(makeAnswer({ questionId: question.id }, new UniqueEntityId("best")))
      }
      await inMemoryAnswerRepository.create(makeAnswer({ questionId: question.id }))
    }
    question.bestAnswerId = inMemoryAnswerRepository.items[9].id

    const { answers } = await sut.execute({ page: 2, questionId: question.id.toString })

    expect(answers).toHaveLength(2)
    expect(answers[0].id).toEqual("best")
  })

})

