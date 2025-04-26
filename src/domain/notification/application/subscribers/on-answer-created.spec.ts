import type { MockInstance } from 'vitest'
import { makeAnswer } from '../../../../../test/factories/make-answer'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { InMemoryAnswerAttachmentRepository } from '../../../../../test/repositories/in-memory-answer-attachment-repository'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository'
import { InMemoryQuestionAttachmentRepository } from '../../../../../test/repositories/in-memory-question-attachments-repostirory'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository'
import { InMemorySendNotificationRepository } from '../../../../../test/repositories/in-memory-send-notification-repository'
import { waitFor } from '../../../../../test/utils/wait-for'
import {
  SendNotificationUseCase,
  type SendNotificationUseCaseRequest,
  type SendNotificationUseCaseResponse,
} from '../use-cases/send-notification'
import { OnAnswerCreated } from './on-answer-created'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionsAttachmentRepository: InMemoryQuestionAttachmentRepository
let inMemoryAnswersAttachmentsRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryNotificationsRepository: InMemorySendNotificationRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: MockInstance<
  (
    request: SendNotificationUseCaseRequest
  ) => Promise<SendNotificationUseCaseResponse>
>

describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryQuestionsAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttachmentRepository
    )

    inMemoryAnswersAttachmentsRepository =
      new InMemoryAnswerAttachmentRepository()

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswersAttachmentsRepository
    )

    inMemoryNotificationsRepository = new InMemorySendNotificationRepository()

    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase)
  })

  it('should send a notification when an answer is created', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    await waitFor(async () => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
