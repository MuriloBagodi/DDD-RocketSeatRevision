import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions.repository"
import { describe, beforeEach, it, expect } from "vitest"
import { GetQuestionBySlugUseCase } from "./get-question-by-slug"
import { makeQuestion } from "test/factories/make-question"
import { Slug } from "../../enterprise/entities/value-objects/slug"


let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe("Get Question by slug", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)

  })
  it('Should be able to get a question  by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create("example-question"),
    })

    await inMemoryQuestionRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: "example-question"
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toBe(newQuestion.title)

  })

})

