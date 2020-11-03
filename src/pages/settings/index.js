import template from './template.html';
import style from './style.scss';
import {AWARD_STATUS} from '../../constants'

var controller = ['$scope', 'AwardSvc', function($scope, AwardSvc) {
    $scope.style = style;
    $scope.awards = AwardSvc.getAll();
    $scope.isNotContain = true;
    $scope.AWARD_STATUS = AWARD_STATUS;

    //第一个未抽奖项需要隐藏交换操作符
    $scope.hideSwitch = function (awards) {

        var firstNotStart = awards.find(award => award.status === AWARD_STATUS.NOT_START || award.status === AWARD_STATUS.READY);
        if (firstNotStart){
            firstNotStart.switchHide = true;
            return firstNotStart;
        }
    };

    //调用hideSwitch()函数使交换顺序后的第一个未抽奖的隐藏，第二个显示
    $scope.swapHideClickSwitch = function (awards) {
        var award = $scope.hideSwitch(awards);
        var nextIndex = awards.indexOf(award) + 1;
        awards[nextIndex].switchHide = false;
    };

    $scope.disableModify = function (awards) {
        for(var award of awards) {
            if (award.status === AWARD_STATUS.END) {
                award.nameHide = true;
                award.amountHide = true;
                award.unitHide = true;
                award.switchIconHide = true;
                award.deleteHide = true;
            }

            if(award.status === AWARD_STATUS.PAUSE ||
                award.status === AWARD_STATUS.RANDOM){
                award.nameHide = true;
                award.amountHide = false;
                award.unitHide = true;
                award.switchIconHide = true;
                award.deleteHide = true;
            }
        }
    };

    //每次触发点击事件之前遍历所有奖项的所有输入框visible属性，是否为true，如果找到，则把当前点击的输入框visible属性置为false
    $scope.showModify = function($event, award, attribute) {
        var attributes = ['nameVisible', 'totalVisible', 'unitVisible'];
        var exist = $scope.awards.find(award => {
            return attributes.find(attribute => award[attribute] === true)
        });
        award[attribute] = !exist;
    };

    $scope.confirmModify = function($event, award) {
        if (!(isNaN(award.total) || award.total === '' || award.name === '' || isNaN(award.unit) || award.unit === '')) {
            award.nameVisible = false;
            award.totalVisible = false;
            award.unitVisible = false;
            $scope.awards = AwardSvc.update(award);
        }
    };

    //增加奖项
    $scope.addAward = function (awardName, awardAmount, awardUnit, isNotContain) {
        if(!awardAmount) {
            alert('奖项个数输入不能为空');
            return;
        }

        if(!(/^\d+$/.test(awardAmount))){
            alert('奖项个数必须为数字');
            return;
        }

        if(!awardName){
            alert('奖项名称输入不能为空');
            return;
        }

        if(!awardUnit){
            alert('每次抽奖个数输入不能为空');
            return;
        }

        if((awardUnit > 10) || !(/^\d+$/.test(awardUnit))){

            alert('每次抽奖个数需为数字且不能大于10');
            return;
        }

            var award = {
                name: awardName,
                total: awardAmount,
                unit: awardUnit,
                isNormal: !!isNotContain
            };

            $scope.awards = AwardSvc.add(award);
            alert('添加奖项成功');
            $scope.awardAmount = '';
            $scope.awardName = '';
            $scope.awardUnit = '';
            $scope.isNotContain = true;
        };

    $scope.clearError = function () {
        $scope.amountError = undefined;
        $scope.unitError = undefined;
        $scope.nameError = undefined;
        $scope.isDisabled = false;

    };

    //删除奖项
    $scope.deleteAward = function(award) {
        var answer = window.confirm(`确定需要移除该奖项[${award.name}]吗？`);
        if (answer === true) {
            $scope.awards = AwardSvc.remove(award.id);
        }
    };

    //鼠标点击一行，颜色着重显示
    $scope.handleClick = function(award) {
        $scope.currentAwardId = award.id;
    };

    //交换奖项的上下顺序
    $scope.switchOrder = function($event, award) {
        $scope.awards = AwardSvc.switch(award.id);
        $scope.swapHideClickSwitch($scope.awards);
        $scope.handleClick(award);
        $event.stopPropagation();
    };

    $scope.disableModify($scope.awards);
    $scope.hideSwitch($scope.awards);
}];

var page = {
    path: '/settings',
    template: template,
    controller: controller
};

export default page;
/*
 {
 id: string,
 name: string, //奖项名称
 winn: [employeeId: string] //已抽人数
 absent: [employeeId: string] //已抽未到人数
 total： number //应抽总人数
 }
 */
