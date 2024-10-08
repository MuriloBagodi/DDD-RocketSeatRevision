import type { QuestionRepository } from '../repositories/questions-repository'
import { expect, test } from 'vitest'
import { CreateQuestionUseCase } from './create-question'
import type { Question } from '../../enterprise/entities/question'

const fakeQuestionRepository: QuestionRepository = {
  create: async (question: Question) => {},
}

test('create an question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository)

  const {question} = await createQuestion.execute({
    title: 'Teste de titulo',
    content: 'test content',
    authorId: "1"
  })

  expect(question.slug).toEqual('teste-de-titulo')
})