import template from './template.html';
import { AWARD_STATUS, ALL_USERS_ORIGINAL, STORAGE_RANDOM_KEY, RANDOM_FLAG, RANDOM_DURATION, RANDOM_MAX_SIZE, NO_EMP_ID_KEY, CONNECTION_SIGN } from '../../constants';
import RandomIterator from '../RandomIterator/index';

var _Math = require('lodash/math');

/**
 *  该页面显示给观众
 */

// 随机过程
var randomInstance = null;
var newScope = null;

export default {
    name: 'clientRandom',
    fn: ['AwardSvc', '$rootScope', function(AwardSvc, $rootScope) {
        return {
            restrict: 'E',
            scope: {},
            template: template,
            link: function($scope) {
                $scope.trustAsHtml = $rootScope.trustAsHtml;
                newScope = $scope;

                function awardsChangeHanlder(currentScope) {
                    currentScope.awards = AwardSvc.getAll();
                    if (currentScope.awards) {
                        // 初始化并显示当前抽奖状态
                        currentScope.award = RandomIterator.getCurrentRandom(currentScope.awards);
                        if (currentScope.award) {
                            if (currentScope.award.status === AWARD_STATUS.RANDOM) {
                                // 如果抽奖进行中被关闭或刷新该页面，打开后显示继续抽奖
                                currentScope.startRandom(newScope);
                            } else if (currentScope.award.status === AWARD_STATUS.NOT_START ||
                                currentScope.award.status === AWARD_STATUS.READY) {
                                // 准备抽奖时，只显示当前奖项信息
                                currentScope.randomEmployees = null;
                            } else {
                                // 否则，显示当前中奖人员列表
                                currentScope.randomEmployees = currentScope.award.snapshots[currentScope.award.snapshots.length - 1].value;
                            }
                        }
                    }
                }
                $scope.NO_EMP_ID_KEY = NO_EMP_ID_KEY;

                if (!$rootScope.clientEventBinded) {
                    window.addEventListener("storage", function(e) {
                        // console.log('storage changed....');
                        if (e.key === STORAGE_RANDOM_KEY.AWARD_STATUS) {
                            newScope.$apply(function() {
                                awardsChangeHanlder(newScope);
                            });
                        } else if (e.key === STORAGE_RANDOM_KEY.RANDOM_FLAG) {
                            // 开始抽奖和结束抽奖功能开关
                            if (e.newValue && e.newValue.indexOf(RANDOM_FLAG.START) === 0) {
                                newScope.$apply(function() {
                                    newScope.startRandom(newScope);
                                });
                            } else if (e.newValue && e.newValue.indexOf(RANDOM_FLAG.END) === 0) {
                                newScope.$apply(function() {
                                    newScope.stopRandom(newScope);
                                });
                            }
                        } else if (e.key === STORAGE_RANDOM_KEY.CONNECTION_SIGN) {
                            if (e.newValue && e.newValue.indexOf(CONNECTION_SIGN.REQUEST) === 0) {
                                window.localStorage.setItem(STORAGE_RANDOM_KEY.CONNECTION_SIGN, CONNECTION_SIGN.RESPONSE + '' + new Date().getTime());
                            }
                        }
                    });
                    $rootScope.clientEventBinded = true;
                }

                $scope.random = function(currentScope, size, delay, isNormal) {
                        if (!randomInstance) {
                            return;
                        }

                        currentScope.randomEmployees = RandomIterator.randomEmployees(size, isNormal);

                        window.localStorage.setItem(STORAGE_RANDOM_KEY.RANDOM_LIST_CHANNEL, JSON.stringify({
                            time: new Date().getTime(),
                            value: currentScope.randomEmployees
                        }));

                        setTimeout(function() {
                            currentScope.$apply();
                        }, 0);

                        setTimeout(function() {
                            currentScope.random(currentScope, size, delay, isNormal);
                        }, delay);
                    }
                    // 抽奖开始
                $scope.startRandom = function(currentScope) {
                    if (!currentScope.award) {
                        return;
                    }
                    if (randomInstance) {
                        // 当前已在抽奖中
                        return;
                    }

                    var randomSize = currentScope.award.total - currentScope.award.winn.length;

                    randomSize = _Math.min([randomSize, RANDOM_MAX_SIZE, currentScope.award.unit]);


                    var availableLength = Object.keys(ALL_USERS_ORIGINAL).filter(empId => {
                        return ALL_USERS_ORIGINAL[empId].qualification;
                    }).length;
                    var msg = null;

                    if (availableLength < randomSize) {
                        msg = `本次抽取人员数量[${randomSize}]，由于奖池可用人员数量[${availableLength}]较少，无法抽奖`;
                        alert(msg);
                        throw new Error(msg);
                    }

                    randomInstance = true;
                    // 正在抽奖中
                    AwardSvc.startRandom(currentScope.award.id);

                    // console.log(currentScope.award, `开始抽奖[${currentScope.award.name}], 抽取数量[${randomSize}], 奖项总数[${currentScope.award.total}]名, 当前已抽[${currentScope.award.winn.length}]名`);

                    currentScope.random(
                        currentScope,
                        randomSize,
                        RANDOM_DURATION,
                        currentScope.award.isNormal
                    );
                };

                // 抽奖停止
                $scope.stopRandom = function(currentScope) {
                    if (randomInstance) {
                        randomInstance = null;

                        // 保存中奖名单LocalStorage
                        currentScope.award = AwardSvc.saveLucky(currentScope.award.id, currentScope.randomEmployees);
                        if (currentScope.award.total <= currentScope.award.winn.length) {
                            // 当前奖项抽取完毕，所有批次抽取结束
                            currentScope.award.status = AWARD_STATUS.END;
                            currentScope.award.endTime = new Date().getTime();
                        } else {
                            // 奖项分批抽取，当前批次抽取结束，等待下一批次抽取
                            currentScope.award.status = AWARD_STATUS.PAUSE;
                        }
                        currentScope.award = AwardSvc.update(currentScope.award).filter(award => {
                            return award.id === currentScope.award.id;
                        })[0];
                    }
                };

                $scope.awards = AwardSvc.getAll();
                $scope.award = RandomIterator.getCurrentRandom($scope.awards);
                awardsChangeHanlder($scope);

                $scope.ALL_USERS_ORIGINAL = ALL_USERS_ORIGINAL;
                $scope.MAX_COL_SIZE = $rootScope.MAX_COL_SIZE;
            }
        };
    }]
};
