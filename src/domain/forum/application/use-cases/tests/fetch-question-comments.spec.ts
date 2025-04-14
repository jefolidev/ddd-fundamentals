import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestionComment } from '../../../../../../test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from '../../../../../../test/repositories/in-memory-question-comments-repository'
import { FetchQuestionCommentsUseCase } from '../fetch-question-comments'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase // System Under Test

describe('Fetch Question QuestionComment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch question questioncomments', async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('question-1') })
    )

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('question-1') })
    )

    const { questionComments } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(questionComments).toHaveLength(2)
  })

  it('should be able to paginated question comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityID('question-1') })
      )
    }
    const { questionComments } = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(questionComments).toHaveLength(2)
  })
})
