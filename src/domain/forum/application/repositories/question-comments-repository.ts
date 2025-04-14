import { QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionsCommentRepository {
  findById(id: string): Promise<QuestionComment | null>
  create(questionComment: QuestionComment): Promise<void>
  delete(quetionComment: QuestionComment): Promise<void>
}
