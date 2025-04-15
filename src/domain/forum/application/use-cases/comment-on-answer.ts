import { left, right, type Either } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswersCommentRepository } from '../repositories/answer-comments-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { ResourceNotFoundError } from './errors/resourse-not-found-error'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}
type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private questionRepository: AnswersRepository,
    private questionCommnetsRepository: AnswersCommentRepository
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const question = await this.questionRepository.findById(answerId)

    if (!question) return left(new ResourceNotFoundError())

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.questionCommnetsRepository.create(answerComment)

    return right({
      answerComment,
    })
  }
}
