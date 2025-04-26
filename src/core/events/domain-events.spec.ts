import { AggregateRoot } from '../entities/aggregate-root'
import type { UniqueEntityID } from '../entities/unique-entity-id'
import type { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'

// * Evento desejado que aconteca, ex: Ler notificacao.
class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate

  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date()
    this.aggregate = aggregate
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }
}

// * Classe que registrara o evento, mas nao o executara
class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('Domain Events', () => {
  it('should be able to dispatch and listen to events', () => {
    const fnSpy = vi.fn()
    
    // * Registrando o evento, mas ainda nao fazendo dispatch
    DomainEvents.register(fnSpy, CustomAggregateCreated.name)

    // * Instanciando o evendo
    const aggregate = CustomAggregate.create()

    // * Assegura que foi criado
    expect(aggregate.domainEvents).toHaveLength(1)

    // * Realmente dispara o evento, liberando a acao
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    expect(fnSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
