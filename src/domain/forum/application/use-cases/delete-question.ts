import type { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionUseCaseRequest {
  questionId: string
  authorId: string
}
interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async exectue({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString())
      throw new Error('Not Allowed.')

    await this.questionRepository.delete(question)

    return {}
  }
}
