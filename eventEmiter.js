export class EventEmiter{
    constructor(){
        this.event = {}
    }

    subscribe(eventName, callback){
        if (typeof this.event[eventName] === "undefined") {
            this.event[eventName] = []
            this.event[eventName].push(callback);
            }else{
                this.event[eventName].push(callback);
            }
    }

    unsubscribe(eventName, callback){
        let index = this.event[eventName].indexOf(callback);
        return this.event[eventName].splice(index,1);
    }

    emit(eventName, arg){
        const event = this.event[eventName];
        if (typeof this.event[eventName] === "undefined") {
            return
            }else{
                event.forEach(element => {
                    element.call(null, arg);
                })
            }
    }
}