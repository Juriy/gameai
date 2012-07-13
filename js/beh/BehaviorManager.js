function BehaviorManager(agent) {
    this.behaviors = [];
    this.current = 0;
    this.agent = agent;
}

_p = BehaviorManager.prototype;

_p.add = function (behavior) {
    this.behaviors.push(behavior);
};

_p.update = function (time) {
    if (this.behaviors[this.current]) {
        var behavior = this.behaviors[this.current];
        if (behavior.applyToAgent(time, this.agent)) {
            this.agent.stop();
            this.current++;
        }
    }
};