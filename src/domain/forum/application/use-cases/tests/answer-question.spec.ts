/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryAnswersRepository } from '../../../../../../test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from '../answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase // System Under Test

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an answer ', async () => {
    const { answer } = await sut.exectue({
      questionId: '1',
      instructorId: '1',
      content: 'Conteudo da Resposta',
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})
