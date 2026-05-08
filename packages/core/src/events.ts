import type { LifehackerEventMap } from "./types";

type EventHandler<K extends keyof LifehackerEventMap> = (
  payload: LifehackerEventMap[K],
) => void;

type AnyHandler = (payload: unknown) => void;

export class EventBusImpl {
  private listeners = new Map<string, Set<AnyHandler>>();

  on<K extends keyof LifehackerEventMap>(
    event: K,
    handler: EventHandler<K>,
  ): () => void {
    if (!this.listeners.has(event as string)) {
      this.listeners.set(event as string, new Set());
    }
    this.listeners.get(event as string)!.add(handler as AnyHandler);
    return () => {
      this.listeners.get(event as string)?.delete(handler as AnyHandler);
    };
  }

  emit<K extends keyof LifehackerEventMap>(
    event: K,
    payload: LifehackerEventMap[K],
  ): void {
    this.listeners.get(event as string)?.forEach((handler) => {
      handler(payload);
    });
  }

  once<K extends keyof LifehackerEventMap>(
    event: K,
    handler: EventHandler<K>,
  ): void {
    const unsubscribe = this.on(event, ((payload) => {
      unsubscribe();
      handler(payload);
    }) as EventHandler<K>);
  }
}
