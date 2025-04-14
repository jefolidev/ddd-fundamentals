import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswersCommentRepository {
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswerId(
    answerId: string,
    params: PaginationParams
  ): Promise<AnswerComment[]>
  create(answerComment: AnswerComment): Promise<void>
  delete(quetionComment: AnswerComment): Promise<void>
}
