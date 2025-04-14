/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeQuestion } from '../../../../../../test/factories/make-question'
import { InMemoryQuestionCommentsRepository } from '../../../../../../test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionsRepository } from '../../../../../../test/repositories/in-memory-questions-repository'
import { CommentOnQuestionUseCase } from '../comment-on-question'

let inMemoryQuestionRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository

let sut: CommentOnQuestionUseCase // System Under Test

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentsRepository
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionRepository.create(question)

    await sut.exectue({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comentario teste',
    })

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      'Comentario teste'
    )
  })
})
