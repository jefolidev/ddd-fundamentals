import { Either, left, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resourse-not-found-error'

interface EditAnswerUseCaseRequest {
  content: string
  answerId: string
  authorId: string
}
type EditAnswerUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    content,
    answerId,
    authorId,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString())
      return left(new NotAllowedError())

    answer.content = content

    await this.answerRepository.save(answer)

    return right({
      answer,
    })
  }
}
