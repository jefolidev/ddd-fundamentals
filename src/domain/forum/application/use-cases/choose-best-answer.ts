import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Question } from '../../enterprise/entities/question'
import type { QuestionsRepository } from '../repositories/questions-repository'

interface ChooseBestQuestionUseCaseRequest {
  answerId: string
  authorId: string
}

interface ChooseBestQuestionUseCaseResponse {
  question: Question
}

export class ChooseBestQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async exectue({
    answerId,
    authorId,
  }: ChooseBestQuestionUseCaseRequest): Promise<ChooseBestQuestionUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) throw new Error('Answer not found.')

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) throw new Error('Question not found.')

    if (authorId !== question.authorId.toString())
      throw new Error('Not allowed.')

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)
    return { question }
  }
}
