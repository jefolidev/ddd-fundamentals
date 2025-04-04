import type { Answer } from '../../enterprise/entities/answer'
import type { AnswersRepository } from '../repositories/answers-repository'

interface EditAnswerUseCaseRequest {
  content: string
  answerId: string
  authorId: string
}
interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async exectue({
    content,
    answerId,
    authorId,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (authorId !== answer.authorId.toString()) throw new Error('Not Allowed.')

    answer.content = content

    await this.answerRepository.save(answer)

    return {
      answer,
    }
  }
}
