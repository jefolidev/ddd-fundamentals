/* eslint-disable @typescript-eslint/no-unused-vars */
import type { AnswersRepository } from '../../../repositories/answers-repository'
import type { Answer } from '../../entities/answer'
import { AnswerQuestionUseCase } from '../answer-question'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {},
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.exectue({
    questionId: '1',
    instructorId: '1',
    content: 'nova resposta',
  })

  expect(answer.content).toEqual('nova resposta')
})
