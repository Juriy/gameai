function Node(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this._connections = [];
}

var _p = Node.prototype;

_p.addConnection = function(node, weight) {
    this._connections.push({
        node: node,
        weight: weight
    });
};

_p.getConnections = function() {
    return this._connections;
};

function Graph(nodes, matrix) {
    this._nodes = nodes;
    this._drawConnectionLabels = false;

    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]) {
                nodes[i].addConnection(nodes[j], Graph.distance(nodes[i], nodes[j]));
            }
        }
    }
}

_p = Graph.prototype;

_p.setDrawDistances = function(drawConnectionLabels) {
    this._drawConnectionLabels = drawConnectionLabels;
};

_p.serialize = function() {
    var data = {};
    data.nodes = [];
    this._nodes.forEach(function(it) {
        data.nodes.push([it.x, it.y]);
    });
    return JSON.stringify(data);
};

/**
 * Simple visualization - draws as the undirected graph, add arrows
 * and bezier curves for the nice directed graph
 */
_p.draw = function(ctx, path) {
    var self = this;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";

    // Draw connections
    this._nodes.forEach(function(node) {
        node.getConnections().forEach(function(connection) {
            self._drawConnection(ctx, node, connection.node, connection.weight, "black");
        });
    });

    // Highlight the path
    if (path) {
        this._drawPath(ctx, path);
    }

    if (this._drawConnectionLabels) {
        // Draw connection labels
        this._nodes.forEach(function(node) {
            node.getConnections().forEach(function(connection) {
                self._drawConnectionLabel(ctx, Math.floor(connection.weight) + "", node, connection.node);
            });
        });
    }

    // Next draw nodes
    this._nodes.forEach(function(node) {
        self._drawNode(ctx, node);
    });
};

_p.findPath = function(startNode, endNode) {

    function updateNodeValues(node, prevNode, routeCost) {
        node.routeCost = routeCost;
        node.estimatedCost = routeCost + Graph.distance(node, endNode);
        node.prevNode = prevNode;
    }

    var openList = [];
    var closedList = [];

    startNode.routeCost = 0;
    openList.push(startNode);
    var routeFound = false;

    while (openList.length > 0) {
        // The smallest element (consider a better way of getting smallest element).
        var currentNode = openList.sort(function(a, b) {return a.estimatedCost - b.estimatedCost})[0];

        if (currentNode == endNode) {
            routeFound = true;
            break;
        }

        currentNode.getConnections().forEach(function(connection) {
            var node = connection.node;
            var newRouteCost = currentNode.routeCost + connection.weight;

            if (closedList.indexOf(node) > -1) {
                // The node is in closed list
                if (newRouteCost < node.routeCost) {
                    // Remove from closed list
                    closedList.splice(closedList.indexOf(node), 1);

                    updateNodeValues(node, currentNode, newRouteCost);
                    openList.push(node);
                }
            } else if (openList.indexOf(node) > -1) {
                // The node is in open list
                if (newRouteCost < node.routeCost) {
                    updateNodeValues(node, currentNode, newRouteCost);
                }
            } else {
                // The node is not processed
                updateNodeValues(node, currentNode, newRouteCost);
                openList.push(node);
            }
        });

        // Remove from open list
        openList.splice(openList.indexOf(currentNode), 1);
        // Add to closed list
        closedList.push(currentNode);
    }

    var route = [];
    if (routeFound) {
        var routeNode = endNode;
        while (routeNode) {
            route.push(routeNode);
            routeNode= routeNode.prevNode;
        }
        route.reverse();
    }

    // Cleanup, so that old values don't mess around
    this._nodes.forEach(function(node) {
        delete node.routeCost;
        delete node.estimatedCost;
        delete node.prevNode;
    });

    return route;
};

_p._drawNode = function(ctx, node) {
    ctx.fillStyle = "#6ba4d9";
    ctx.strokeStyle = "black";
    ctx.font = "18px Arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    ctx.beginPath();
    ctx.arc(node.x, node.y, 12, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();

    var text = "" + node.id;
    ctx.fillStyle = "black";
    ctx.fillText(text, node.x, node.y);
};

_p._drawPath = function(ctx, path) {
    ctx.save();
    ctx.lineWidth = 4;
    for (var i = 1; i < path.length; i++) {
        this._drawConnection(ctx, path[i], path[i - 1], "", "green");
    }
    ctx.restore();
};

_p._drawConnection = function(ctx, node1, node2, weight, color) {
    ctx.strokeStyle = color ? color : "black";
    ctx.beginPath();
    ctx.moveTo(node1.x, node1.y);
    ctx.lineTo(node2.x, node2.y);
    ctx.stroke();

    ctx.font = "15px Arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
};

_p._drawConnectionLabel = function(ctx, text, node1, node2) {
    var padding = 5;

    var middleX = Math.floor((node1.x + node2.x)/2);
    var middleY = Math.floor((node1.y + node2.y)/2);
    var textWidth = ctx.measureText(text).width;
    var width = textWidth + padding*2;
    var height = 20;

    ctx.fillStyle = "#DDD";
    ctx.fillRect(middleX - width/2, middleY - height/2, width, height);

    ctx.fillStyle = "black";
    ctx.fillText(text, middleX, middleY);
};

Graph.distance = function(node1, node2) {
    return Math.sqrt(
        (node1.x - node2.x)*(node1.x - node2.x) +
        (node1.y - node2.y)*(node1.y - node2.y));
};