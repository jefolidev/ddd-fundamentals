import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { AnswersCommentRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswersCommentRepository
{
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async findById(id: string) {
    const questionComment = this.items.find((item) => item.id.toString() === id)

    if (!questionComment) return null

    return questionComment
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const questionComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return questionComments
  }

  async delete(questionComment: AnswerComment): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === questionComment.id
    )

    this.items.splice(itemIndex, 1)
  }
}
