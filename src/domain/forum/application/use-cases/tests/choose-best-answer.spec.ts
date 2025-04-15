/* eslint-disable @typescript-eslint/no-unused-vars */
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from '../../../../../../test/factories/make-answer'
import { makeQuestion } from '../../../../../../test/factories/make-question'
import { InMemoryAnswersRepository } from '../../../../../../test/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from '../../../../../../test/repositories/in-memory-questions-repository'
import { ChooseBestQuestionUseCase } from '../choose-best-answer'
import { NotAllowedError } from '../errors/not-allowed-error'

let inMemoryQuestionRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository

let sut: ChooseBestQuestionUseCase // System Under Test

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new ChooseBestQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryAnswersRepository
    )
  })

  it('should be able to choose the question best answer', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose another user question best answer', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID('author-2'),
    })

    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
