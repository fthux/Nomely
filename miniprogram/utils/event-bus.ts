type EventCallback = (...args: any[]) => void;

class EventBus {
  private events: { [eventName: string]: EventCallback[] };

  constructor() {
    this.events = {};
  }

  on(eventName: string, callback: EventCallback): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  emit(eventName: string, ...args: any[]): void {
    const callbacks = this.events[eventName];
    if (callbacks) {
      callbacks.forEach((callback) => callback(...args));
    }
  }

  off(eventName: string, callback: EventCallback): void {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (cb) => cb !== callback
      );
    }
  }
}

const eventBus = new EventBus();

export default eventBus;