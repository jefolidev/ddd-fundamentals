/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Question } from '@/domain/forum/enterprise/entities/question'
import type { QuestionsRepository } from '../../repositories/questions-repository'
import { CreateQuestionUseCase } from '../create-question'

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (question: Question) => {},
}

test('create a question', async () => {
  const questionQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

  const { question } = await questionQuestion.exectue({
    authorId: '1',
    title: 'Nova Pergunta',
    content: 'Conteudo da Pergunta',
  })

  expect(question.id).toBeTruthy()
})
