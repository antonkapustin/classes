export class EventEmiter{
    constructor(){
        this.event = {}
    }
    subscribe(eventName, callback){
        if (typeof this.event[eventName] === "undefined") {
            this.event = {
                eventName: []
            }
            this.events[eventName].push(callback);
            }else{
                this.events[eventName].push(callback);
            }
    }
    unsubscribe(eventName, callback){
        let index = this.event[eventName].indexOf(callback);
        return this.event[eventName].splice(index,1);
    }
    emit(eventName, arg){}
}