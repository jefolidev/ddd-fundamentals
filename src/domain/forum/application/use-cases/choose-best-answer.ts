import { left, right, type Either } from '@/core/either'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Question } from '../../enterprise/entities/question'
import type { QuestionsRepository } from '../repositories/questions-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resourse-not-found-error'

interface ChooseBestQuestionUseCaseRequest {
  answerId: string
  authorId: string
}

type ChooseBestQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class ChooseBestQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private answersRepository: AnswersRepository
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseBestQuestionUseCaseRequest): Promise<ChooseBestQuestionUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) return left(new ResourceNotFoundError())

    const question = await this.questionRepository.findById(
      answer.questionId.toString()
    )

    if (!question) return left(new ResourceNotFoundError())

    if (authorId !== question.authorId.toString())
      return left(new NotAllowedError())

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)
    return right({ question })
  }
}
