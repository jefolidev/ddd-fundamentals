/* eslint-disable @typescript-eslint/no-unused-vars */
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from '../../../../../../test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from '../create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase // System Under Test

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'Nova Pergunta',
      content: 'Conteudo da Pergunta',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)

    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)

    expect(inMemoryQuestionsRepository.items[0].attachments).toHaveLength(2)

    expect(inMemoryQuestionsRepository.items[0].attachments).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })
})
