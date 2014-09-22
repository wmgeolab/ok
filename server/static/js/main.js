var app = angular.module('okpy', ['ngResource', 'ui.router', 'angular-loading-bar', 'ui.bootstrap', 'angularMoment', 'localytics.directives']);

app.directive('snippet', function() {
        "use strict";
        return {
            restrict: 'E',
            templateUrl: 'static/partials/snippet.html',
            link: function(scope, elem, attrs) {
              scope.contents = scope.contents.split('\n');
            }
        };
    });

app.directive('diff', function() {
        "use strict";
        return {
            restrict: 'E',
            templateUrl: 'static/partials/diff.html',
        };
    });

app.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/submission/");

    var submissions = {
      name: 'submission',
      abstract: true,
      url: '/submission',
      templateUrl: 'static/partials/submission.base.html',
    }

    var submissionList = {
      name: 'submission.list',
      url: '/',
      templateUrl: 'static/partials/submission.list.html',
      controller: "SubmissionListCtrl"
    }

    var submissionDetail = {
      name: 'submission.detail',
      url: '/:submissionId',
      templateUrl: 'static/partials/submission.detail.html',
      controller: "SubmissionDetailCtrl"
    }

    var submissionDiff = {
      name: 'submission.diff',
      url: '/:submissionId/diff',
      templateUrl: 'static/partials/submission.diff.html',
      controller: "SubmissionDiffCtrl"
    }

    var assignments = {
      name: 'assignment',
      abstract: true,
      url: '/assignment',
      templateUrl: 'static/partials/assignment.base.html',
    }

    var assignmentList = {
      name: 'assignment.list',
      url: '/',
      templateUrl: 'static/partials/assignment.list.html',
      controller: "AssignmentListCtrl"
    }

    var assignmentDetail = {
      name: 'assignment.detail',
      url: '/:assignmentId',
      templateUrl: 'static/partials/assignment.detail.html',
      controller: "AssignmentDetailCtrl"
    }

    var courses = {
      name: 'course',
      abstract: true,
      url: '/course',
      templateUrl: 'static/partials/course.base.html',
    }

    var courseList = {
      name: 'course.list',
      url: '/',
      templateUrl: 'static/partials/course.list.html',
      controller: "CourseListCtrl"
    }

    var courseDetail = {
      name: 'course.detail',
      url: '/:courseId',
      templateUrl: 'static/partials/course.detail.html',
      controller: "CourseDetailCtrl"
    }

    var courseNew = {
      name: 'course.new',
      url: '/new',
      templateUrl: 'static/partials/course.new.html',
      controller: "CourseNewCtrl"
    }
 
    var versions = {
      name: 'version',
      abstract: true,
      url: '/version',
      templateUrl: 'static/partials/version.base.html',
    }

    var versionList = {
      name: 'version.list',
      url: '/',
      templateUrl: 'static/partials/version.list.html',
      controller: "VersionListCtrl"
    }

    var versionDetail = {
      name: 'version.detail',
      url: '/:versionId',
      templateUrl: 'static/partials/version.detail.html',
      controller: "VersionDetailCtrl"
    }

    var versionNew = {
      name: 'version.new',
      url: '/new',
      templateUrl: 'static/partials/version.new.html',
      controller: "VersionNewCtrl"
    }

    $stateProvider.
      state(submissions).
      state(submissionList).
      state(submissionDetail).
      state(submissionDiff).
      state(assignments).
      state(assignmentList).
      state(assignmentDetail).
      state(courses).
      state(courseList).
      state(courseNew).
      state(versions).
      state(versionList).
      state(versionDetail).
      state(versionNew)
      ;
  }]);

app.factory('Submission', ['$resource',
    function($resource) {
      return $resource('api/v1/submission/:id', {format: "json"}, {
        query: {
          isArray: false
        },
        get: {
          isArray: false,
          transformResponse: function(data) {
            return JSON.parse(data).data;
          }
        },
        diff: {
          url: 'api/v1/submission/:id/diff',
          isArray: false,
          transformResponse: function(data) {
            return JSON.parse(data).data;
          }
        }
      });
    }
  ]);

app.factory('Assignment', ['$resource',
    function($resource) {
      return $resource('api/v1/assignment/:id', {format: "json"}, {
        query: {
          isArray: true,
          transformResponse: function(data) {
            return JSON.parse(data).data.results;
          }
        },
        get: {
          isArray: false,
          transformResponse: function(data) {
            return JSON.parse(data).data;
          }
        }
      });
    }
  ]);

app.factory('Course', ['$resource',
    function($resource) {
      return $resource('api/v1/course/:id', {
        format: "json",
      }, {
        query: {
          isArray: true,
          transformResponse: function(data) {
            return JSON.parse(data).data.results;
          }
        },
        get: {
          isArray: false,
          transformResponse: function(data) {
            return JSON.parse(data).data;
          }
        },
      });
    }
  ]);

app.factory('Version', ['$resource',
    function($resource) {
      return $resource('api/v1/version/:id', {
        format: "json",
      }, {
        query: {
          isArray: true,
          transformResponse: function(data) {
            return JSON.parse(data).data.results;
          }
        },
        get: {
          isArray: false,
          transformResponse: function(data) {
            return JSON.parse(data).data;
          }
        },
        update: {
          method: "PUT",
          url: "api/v1/version/:id/new",
          params: {}
        }
      });
    }
  ]);

