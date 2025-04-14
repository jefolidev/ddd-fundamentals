import type { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswersCommentRepository {
  create(answerComment: AnswerComment): Promise<void>
}
