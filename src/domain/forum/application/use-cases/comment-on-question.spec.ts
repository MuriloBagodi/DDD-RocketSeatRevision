import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions.repository"
import { describe, beforeEach, it, expect } from "vitest"
import { makeQuestion } from "test/factories/make-question"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { makeAnswer } from "test/factories/make-answer"
import { InMemoryQuestionCommentRepository } from "test/repositories/in-memory-question-comments.repository"
import { CommentOnQuestionUseCase } from "./comment-on-question"

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentRepository
let sut: CommentOnQuestionUseCase

describe("Comment on question Use Case.", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentRepository()
    sut = new CommentOnQuestionUseCase(inMemoryQuestionRepository, inMemoryQuestionCommentsRepository)
  })

  it('Should be able to create a comment for a question', async () => {
    const question = makeQuestion()

    await sut.execute({
      questionId: question.id.toString,
      authorId: question.authorId.toString,
      content: "comment"
    })

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual("comment")
  })
})

