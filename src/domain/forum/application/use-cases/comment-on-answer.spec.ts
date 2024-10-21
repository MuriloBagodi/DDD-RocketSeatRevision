import { describe, beforeEach, it, expect } from "vitest"
import { makeAnswer } from "test/factories/make-answer"
import { CommentOnAnswerUseCase } from "./comment-on-answer"
import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer.repository"
import { InMemoryAnswerCommentRepository } from "test/repositories/in-memory-answer-comment.repository"

let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentRepository
let sut: CommentOnAnswerUseCase

describe("Comment on answer Use Case.", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentRepository()
    sut = new CommentOnAnswerUseCase(inMemoryAnswerRepository, inMemoryAnswerCommentsRepository)
  })

  it('Should be able to create a comment for a answer', async () => {
    const answer = makeAnswer()

    await sut.execute({
      answerId: answer.id.toString,
      authorId: answer.authorId.toString,
      content: "comment"
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual("comment")
  })
})

