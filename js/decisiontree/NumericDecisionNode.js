/**
 * Numeric decision is based on the value of the certain agent parameter.
 * If value is lesser or equal than the threshold, the leNode is executed
 * otherwise - gNode.
 */
function NumericDecisionNode(name, threshold, leNode, gNode) {
    this._name = name;
    this._threshold = threshold;
    this._leNode = leNode;
    this._gNode = gNode;
}

extend(NumericDecisionNode, DecisionTreeNode);

NumericDecisionNode.prototype.execute = function(agent, data) {
    var node = agent[this._name] > this._threshold ? this._gNode : this._leNode;
    node.execute(agent);
};