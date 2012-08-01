/**
 * Probabilistic decision is executed depending on the chance value
 * 0 - never
 * 1 - always
 * between 0-1 with the
 */
function ProbabilisticDecisionNode(chance, trueNode, falseNode) {
    this._chance = chance;
    this._trueNode = trueNode;
    this._falseNode = falseNode;
}

extend(ProbabilisticDecisionNode, DecisionTreeNode);

ProbabilisticDecisionNode.prototype.execute = function(agent, data) {
    var node = Math.random() < this._chance ? this._trueNode : this._falseNode;
    node.execute(agent);
};
