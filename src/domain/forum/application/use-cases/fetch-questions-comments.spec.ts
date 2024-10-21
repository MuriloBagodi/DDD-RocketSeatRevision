import { describe, beforeEach, it, expect } from "vitest"
import { makeQuestion } from "test/factories/make-question"
import { makeAnswer } from "test/factories/make-answer"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { FetchRecentCommentsUseCase } from "./fetch-questions-comments"
import { InMemoryQuestionCommentRepository } from "test/repositories/in-memory-question-comments.repository"
import { makeQuestionComment } from "test/factories/make-question-comment"


let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: FetchRecentCommentsUseCase

describe("Fetch Question Comments Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new FetchRecentCommentsUseCase(inMemoryQuestionCommentRepository)
  })

  it('Should be able to fetch question comments', async () => {
    await inMemoryQuestionCommentRepository.create(makeQuestionComment({ questionId: new UniqueEntityId("question 1") }))
    await inMemoryQuestionCommentRepository.create(makeQuestionComment({ questionId: new UniqueEntityId("question 1") }))
    await inMemoryQuestionCommentRepository.create(makeQuestionComment({ questionId: new UniqueEntityId("question 1") }))
    await inMemoryQuestionCommentRepository.create(makeQuestionComment({ questionId: new UniqueEntityId("question 1") }))
    await inMemoryQuestionCommentRepository.create(makeQuestionComment({ questionId: new UniqueEntityId("question 12") }))
    await inMemoryQuestionCommentRepository.create(makeQuestionComment({ questionId: new UniqueEntityId("question 12") }))

    const { questionComments } = await sut.execute({ page: 1, questionId: "question 1" })

    expect(questionComments.length).toEqual(4)
  })

  it('Should be able to fetch question comments', async () => {
    for (let i = 0; i <= 22; i++) {
      await inMemoryQuestionCommentRepository.create(makeQuestionComment({ questionId: new UniqueEntityId("question-1") }))
    }

    const { questionComments } = await sut.execute({
      page: 2,
      questionId: "question-1",
    })

    expect(questionComments).toHaveLength(2)
  })

})

