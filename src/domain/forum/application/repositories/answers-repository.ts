import type { Answer } from '../../enterprise/entities/answer'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
  findById(answerId: string): Promise<Answer | null>
  save(question: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
}
