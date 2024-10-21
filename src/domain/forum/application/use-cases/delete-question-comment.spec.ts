import { describe, beforeEach, it, expect } from "vitest"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { InMemoryQuestionCommentRepository } from "test/repositories/in-memory-question-comments.repository"
import { DeleteQuestionCommentUseCase } from "./delete-question-comments"
import { makeQuestion } from "test/factories/make-question"
import { makeQuestionComment } from "test/factories/make-question-comment"


let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: DeleteQuestionCommentUseCase

describe("Delete Question comment Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentRepository)

  })
  it('Should be able to delete a comment from question id', async () => {
    const comment = makeQuestionComment()

    inMemoryQuestionCommentRepository.create(comment)

    await sut.execute({ authorId: comment.authorId.toString, questionCommentId: comment.id.toString })

    expect(inMemoryQuestionCommentRepository.items).toHaveLength(0)
  })

  it('Should not be able to delete a question that you are not the author of it', async () => {
    const comment = makeQuestionComment({ authorId: new UniqueEntityId("author 1") })

    inMemoryQuestionCommentRepository.create(comment)

    const { questionComment } = await sut.execute({ authorId: "diff author", questionCommentId: comment.id.toString })

    expect(questionComment).toBeInstanceOf(Error)
    expect(inMemoryQuestionCommentRepository.items).toHaveLength(1)
  })
})

