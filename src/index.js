import angular from 'angular';
import pages from './pages/index';
import components from './components/index';
import html2canvas from 'html2canvas';
import { downloadFile } from './utils';
import { MAX_COL_SIZE } from './constants';
import ngSanitize from  'angular-sanitize';
import 'normalize.css';
import styles from './index.less';

console.log(styles);

var app = angular.module('app', [components, pages, ngSanitize]);

app.run(['$rootScope',  '$sce', function($rootScope, $sce) {
    HTMLElement.prototype.__defineGetter__("currentStyle", function() {
        if (this.ownerDocument && this.ownerDocument.defaultView) {
            return this.ownerDocument.defaultView.getComputedStyle(this, null);
        }
        return null;
    });

    $rootScope.trustAsHtml = $sce.trustAsHtml;

    $rootScope.MAX_COL_SIZE = MAX_COL_SIZE;
    // 所有抽奖人员名单
    $rootScope.ALL_USERS = window.ALL_USERS;

    $rootScope.pageLoaded = true;

    // 屏幕截图
    $rootScope.downloadScreen = function(filename) {
        var targetElement = document.body;
        html2canvas(targetElement, {
            onrendered: function(canvas) {
                // 图片导出为 png 格式
                downloadFile(canvas, filename, 'png');
            },
            background: targetElement.currentStyle ? targetElement.currentStyle.backgroundColor : '#FFF'
        });
    }
}]);

app.bootstrap = function() {
    angular.element(window.document).ready(function() {
        angular.bootstrap(window.document, [app.name]);
    });
};

app.bootstrap();

export default app;
