import angular from 'angular';
import ngRoute from 'angular-route';
import components from '../components/index';
import home from './home/index';
import audience from './audience/index';
import award from './award/index';
import settings from './settings/index';
import ngSanitize from  'angular-sanitize';

var pages = [
    home,
    audience,
    award,
    settings
];
var app = angular.module('app.routers', [ngRoute, components, ngSanitize]);

app.config(['$routeProvider', function($routeProvider) {
    pages.forEach(function(page) {
        $routeProvider
            .when(page.path, {
                template: page.template,
                controller: page.controller
            });
    });
    $routeProvider.otherwise('/home');
}]);

app.run(['$location', '$rootScope', function($location, $rootScope) {

    $rootScope.$on('$routeChangeSuccess', function(event, routeData) {
        $rootScope.isAudiencePage = ($location.path() === '/audience');
        $rootScope.isNoMenu = $rootScope.isAudiencePage || ($location.path() === '/home');
    });

}]);

export default app.name;
