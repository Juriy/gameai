function EatBehavior() {
}

_p = EatBehavior.prototype;

_p.applyToAgent = function(time, agent) {
    agent.hunger -= 0.05*time;
    if (agent.hunger < 0) {
        agent.hunger = 0;
        return true;
    }
};