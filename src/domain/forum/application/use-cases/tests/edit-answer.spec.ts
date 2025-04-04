/* eslint-disable @typescript-eslint/no-unused-vars */
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from '../../../../../../test/factories/make-answer'
import { InMemoryAnswersRepository } from '../../../../../../test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from '../edit-anwser'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase // System Under Test

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.exectue({
      authorId: 'author-1',
      content: 'Conteudo teste',
      answerId: newAnswer.id.toValue(),
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Conteudo teste',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('auhtor-1'),
      },
      new UniqueEntityID('answer-2'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await expect(
      sut.exectue({
        authorId: 'author-2',
        content: 'Conteudo teste',
        answerId: newAnswer.id.toValue(),
      }),
    ).rejects.toThrow(Error)
  })
})
