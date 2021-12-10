export class EventEmiter {
  event: {
    [key: string]: ((args?: string) => void)[];
  };

  constructor() {
    this.event = {};
  }

  subscribe(eventName: string, callback: (arg?: string) => void): void {
    if (typeof this.event[eventName] === "undefined") {
      this.event[eventName] = [];
      this.event[eventName].push(callback);
    } else {
      this.event[eventName].push(callback);
    }
  }

  unsubscribe(eventName: string, callback: () => void) {
    let index = this.event[eventName].indexOf(callback);
    return this.event[eventName].splice(index, 1);
  }

  emit(eventName: string, arg?: string): void {
    const event = this.event[eventName];
    if (typeof this.event[eventName] === "undefined") {
      return;
    } else {
      event.forEach((element) => {
        element.call(null, arg);
      });
    }
  }
}
