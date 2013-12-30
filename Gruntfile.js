module.exports = function(grunt) {

  var files = [
    // Core
    "js/utils.js",
    "js/EventEmitter.js",
    
    // Input
    "js/input/InputHandlerBase.js",
    "js/input/MouseInputHandler.js",
    "js/input/TouchInputHandler.js",
    "js/input/InputHandler.js",

    "js/util/Bootstrap.js",

    // Math
    "js/gl-matrix.js",
    "js/Rect.js",
    "js/MathUtils.js",
    "js/Graph.js",

    "js/Map.js",
    "js/Agent.js",
    "js/Obstacle.js",
    "js/v2/Agent.js",
    "js/v2/Steerings.js",
    "js/v2/Kinematics.js",

    "js/ui/Grid.js",
    "js/ui/Shapes.js",
    "js/ui/Marker.js",

    // Behavior
    "js/behavior/BehaviorManager.js",
    "js/behavior/SteeringMoveToBehavior.js",
    "js/behavior/SteeringLookAtBehavior.js",
    "js/behavior/WanderBehavior.js",
    "js/behavior/EatBehavior.js",
    "js/behavior/SleepBehavior.js",

    // Decisions
    "js/decisiontree/DecisionTreeNode.js",
    "js/decisiontree/NumericDecisionNode.js",
    "js/decisiontree/ProbabilisticDecisionNode.js",
    "js/decisiontree/SampleActions.js"
  ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: false,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },

      target_1: {
        files: {
          'build/<%= pkg.name %>_<%= pkg.version %>.min.js': files
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};