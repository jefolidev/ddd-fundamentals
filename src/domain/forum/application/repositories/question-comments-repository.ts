import type { QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionsCommentRepository {
  create(questionComment: QuestionComment): Promise<void>
}
