import { describe, beforeEach, it, expect } from "vitest"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { makeAnswerComment } from "test/factories/make-answer-comment"
import { FetchRecentAnswersCommentsUseCase } from "./fetch-answer-comments"
import { InMemoryAnswerCommentRepository } from "test/repositories/in-memory-answer-comment.repository"


let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: FetchRecentAnswersCommentsUseCase

describe("Fetch Answer Comments Use Case", () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new FetchRecentAnswersCommentsUseCase(inMemoryAnswerCommentRepository)
  })

  it('Should be able to fetch answer comments', async () => {
    await inMemoryAnswerCommentRepository.create(makeAnswerComment({ answerId: new UniqueEntityId("answer 1") }))
    await inMemoryAnswerCommentRepository.create(makeAnswerComment({ answerId: new UniqueEntityId("answer 1") }))
    await inMemoryAnswerCommentRepository.create(makeAnswerComment({ answerId: new UniqueEntityId("answer 1") }))
    await inMemoryAnswerCommentRepository.create(makeAnswerComment({ answerId: new UniqueEntityId("answer 1") }))
    await inMemoryAnswerCommentRepository.create(makeAnswerComment({ answerId: new UniqueEntityId("answer 12") }))
    await inMemoryAnswerCommentRepository.create(makeAnswerComment({ answerId: new UniqueEntityId("answer 12") }))

    const { answerComments } = await sut.execute({ page: 1, answerId: "answer 1" })

    expect(answerComments.length).toEqual(4)
  })

  it('Should be able to fetch answer comments', async () => {
    for (let i = 0; i <= 22; i++) {
      await inMemoryAnswerCommentRepository.create(makeAnswerComment({ answerId: new UniqueEntityId("answer-1") }))
    }

    const { answerComments } = await sut.execute({
      page: 2,
      answerId: "answer-1",
    })

    expect(answerComments).toHaveLength(2)
  })

})

