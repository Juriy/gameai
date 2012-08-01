function SleepBehavior() {
}

_p = SleepBehavior.prototype;

_p.applyToAgent = function(time, agent) {
    agent.energy += 0.05*time;
    if (agent.energy >= 100) {
        agent.energy = 100;
        return true;
    }
};