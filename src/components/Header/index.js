import template from './template.html';
import style from './style.scss';

export default {
    name: 'appHeader',
    fn: ['$location', '$rootScope', function($location, $rootScope) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                isHide: '=',
                isNoMenu: '='
            },
            template: template,
            link: function($scope) {
                $scope.style = style;
                $scope.downloadScreen = $rootScope.downloadScreen;
            }
        };
    }]
};
