import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions.repository"
import { describe, beforeEach, it, expect } from "vitest"
import { makeQuestion } from "test/factories/make-question"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer.repository"
import { ChoseQuestionBestAnswerUseCase } from "./chose-question-best-answer"
import { makeAnswer } from "test/factories/make-answer"

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: ChoseQuestionBestAnswerUseCase

describe("Chose Question Best Answer Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new ChoseQuestionBestAnswerUseCase(inMemoryAnswerRepository, inMemoryQuestionRepository)
  })

  it('Should be able to chose the best answer for a question', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
      authorId: question.authorId.toString,
      answerId: answer.id.toString
    })

    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('Should not be able to chose another user question best answer', async () => {
    const question = makeQuestion({ authorId: new UniqueEntityId("author1") })
    const answer = makeAnswer({ questionId: question.id })

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswerRepository.create(answer)

    expect(() => {
      return sut.execute({
        authorId: "author2",
        answerId: answer.id.toString
      })
    }).rejects.toBeInstanceOf(Error)
  })
})

