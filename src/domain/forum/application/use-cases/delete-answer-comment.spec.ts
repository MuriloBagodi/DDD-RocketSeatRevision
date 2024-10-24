import { describe, beforeEach, it, expect } from "vitest"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { makeAnswerComment } from "test/factories/make-answer-comment"
import { InMemoryAnswerCommentRepository } from "test/repositories/in-memory-answer-comment.repository"
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment"
import { NotAllowedError } from "./errors/not-allowed.error"


let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: DeleteAnswerCommentUseCase

describe("Delete Answer comment Use Case", () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentRepository)

  })
  it('Should be able to delete a comment from answer id', async () => {
    const comment = makeAnswerComment()

    inMemoryAnswerCommentRepository.create(comment)

    await sut.execute({ authorId: comment.authorId.toString, answerCommentId: comment.id.toString })

    expect(inMemoryAnswerCommentRepository.items).toHaveLength(0)
  })

  it('Should not be able to delete a comment from an answer that you are not the author of it', async () => {
    const comment = makeAnswerComment({ authorId: new UniqueEntityId("author 1") })

    inMemoryAnswerCommentRepository.create(comment)

    const result = await sut.execute({ authorId: "diff author", answerCommentId: comment.id.toString })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})

