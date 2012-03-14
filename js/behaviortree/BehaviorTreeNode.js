/**
 * Numeric decision is based on the value of the certain agent parameter.
 * If value is lesser or equal than the threshold, the leNode is executed
 * otherwise - gNode.
 */
function BehaviorTreeNode() {
}

/**
 * "Exeutes" the given node. The "decision" nodes should evaluate the conditions,
 * select the child nodes and call execute on them. The action nodes should initiate
 * the certain action of the agent
 * @param agent the agent that needs to make a decision
 * @param data any external data (for example, the information about the world)
 */
BehaviorTreeNode.prototype.execute = function(agent, data) {
    throw "Abstract method - must be overwritten";
};