import { makeAnswer } from '../../../../../../test/factories/make-answer'
import { InMemoryAnswerCommentsRepository } from '../../../../../../test/repositories/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from '../../../../../../test/repositories/in-memory-answers-repository'
import { CommentOnAnswerUseCase } from '../comment-on-answer'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository

let sut: CommentOnAnswerUseCase // System Under Test

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentsRepository
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeAnswer()

    await inMemoryAnswerRepository.create(question)

    await sut.execute({
      answerId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comentario teste',
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      'Comentario teste'
    )
  })
})
