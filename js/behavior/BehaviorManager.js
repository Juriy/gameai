function BehaviorManager(agent) {
    EventEmitter.call(this);
    this.behaviors = [];
    this.current = 0;
    this.agent = agent;
}

extend(BehaviorManager, EventEmitter);

_p = BehaviorManager.prototype;

_p.add = function (behavior) {
    this.behaviors.push(behavior);
};

_p.reset = function() {
    this.behaviors = [];
    this.current = 0;
};

_p.update = function (time) {
    /* for (var i = 0; i < this.behaviors.length; i++) {
        var behavior = this.behaviors[i];
        if (behavior) {
            if (behavior.applyToAgent(time, this.agent)) {
                this.behaviors[i] = null;
            }
        }
    }*/

    if (this.behaviors[this.current]) {
        var behavior = this.behaviors[this.current];
        if (behavior.applyToAgent(time, this.agent)) {
            this.agent.stop();
            this.current++;

            if (!this.behaviors[this.current]) {
                this.emit("sequence_end");
                this.onSequenceEnd();
            }
        }
    }

};

_p.onSequenceEnd = function() {

};

