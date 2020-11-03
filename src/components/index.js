import angular from 'angular';
import AwardSettings from './AwardSettings/index';
import ClientRandom from './ClientRandom/index';
import Header from './Header/index';
import ServerRandom from './ServerRandom/index';
import ngSanitize from  'angular-sanitize';

var app = angular.module('app.components', [ngSanitize]);

var components = [
    Header,
    AwardSettings,
    ServerRandom,
    ClientRandom
];

components.forEach(function (component) {
    if(component.fn){
        app.directive(component.name, component.fn);
    }else if(component.svc){
        app.service(component.name, component.svc);
    }
});

export default app.name;
