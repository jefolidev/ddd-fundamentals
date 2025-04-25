/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeNotification } from '../../../../../../test/factories/make-notification'
import { InMemorySendNotificationRepository } from '../../../../../../test/repositories/in-memory-send-notification-repository'
import { ReadNotificationUseCase } from '../read-notification'

let inMemoryNotificationsRepository: InMemorySendNotificationRepository
let sut: ReadNotificationUseCase // System Under Test

describe('Read Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemorySendNotificationRepository()

    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to read a notification', async () => {
    const notification = makeNotification()

    inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })

    expect(result.isRight()).toBe(true)

    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date)
    )
  })
})
