/**
 * TODO: Remove this from core
 * Eat - reduce hunger
 */
function EatAction() { }
EatAction.prototype.execute = function(agent) {
    console.log("Decided to eat");
    navigateTo(220, 70);
    bManager.add(new EatBehavior());
};

/**
 * Sleep - increase energy
 */
function SleepAction() {}
SleepAction.prototype.execute = function(agent) {
    console.log("Decided to sleep");
    bManager.add(new SleepBehavior());
};

/**
 * Do nothing
 */
function WanderAroundAction() {}
WanderAroundAction.prototype.execute = function(agent) {
    console.log("Wandering around...");
    goToRandomPoint();
};
