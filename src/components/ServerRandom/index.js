import template from './template.html';
import { AWARD_STATUS, ALL_USERS_ORIGINAL, STORAGE_RANDOM_KEY, RANDOM_FLAG, NO_EMP_ID_KEY, CONNECTION_SIGN } from '../../constants';
import RandomIterator from '../RandomIterator/index';

/**
 *  该页面显示给管理员
 */
var previousRecievedTime = 0;
var newScope = null;
var connection = null;

function createPromise($q, callback) {
    if (connection) {
        console.log('waiting for connection...');
        return;
    }
    connection = $q.defer();
    window.localStorage.setItem(STORAGE_RANDOM_KEY.CONNECTION_SIGN, CONNECTION_SIGN.REQUEST + '' + new Date().getTime());
    connection.promise.then(function() {
        connection = null;
        callback();
    }, function() {
        connection = null;
        alert('请点击页面顶部菜单中的【观众入口】链接【以新窗口】打开客户端');
    });
    setTimeout(function() {
        if (connection) {
            connection.reject('Create Connection with Client Timeout');
        }
    }, CONNECTION_SIGN.TIMEOUT);
}
export default {
    name: 'serverRandom',
    fn: ['AwardSvc', '$location', '$rootScope', '$q', function(AwardSvc, $location, $rootScope, $q) {
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
                        currentScope.award = RandomIterator.getCurrentRandom(currentScope.awards);
                        if (currentScope.award) {
                            if (currentScope.award.status === AWARD_STATUS.NOT_START ||
                                currentScope.award.status === AWARD_STATUS.READY) {
                                // 准备抽奖时，只显示当前奖项信息
                                currentScope.randomEmployees = null;
                            } else if (currentScope.award.status === AWARD_STATUS.END ||
                                currentScope.award.status === AWARD_STATUS.PAUSE) {
                                // 否则，显示当前中奖人员列表
                                currentScope.randomEmployees = currentScope.award.snapshots[currentScope.award.snapshots.length - 1].value;
                            }
                            currentScope.btnText = currentScope.getBtnText(currentScope.award.status);
                        }
                    }
                }
                // 服务器端随机中的数据来自于客户端随机数据
                function recieveRandomHandler(randomArr, currentScope) {
                    try {
                        let randomList = JSON.parse(randomArr);
                        let time = window.parseFloat(randomList.time);
                        // 使用最新随机数据
                        if (previousRecievedTime < time) {
                            // 服务器端【管理员】界面显示随机中奖人员
                            currentScope.randomEmployees = randomList.value;
                            previousRecievedTime = time;
                        }
                    } catch (e) {}
                }
                $scope.NO_EMP_ID_KEY = NO_EMP_ID_KEY;

                $scope.getBtnText = function(status) {
                    switch (status) {
                        case AWARD_STATUS.NOT_START:
                        case AWARD_STATUS.READY:
                            return '开始';
                        case AWARD_STATUS.PAUSE:
                            return '接着抽';
                        case AWARD_STATUS.RANDOM:
                            return '停止';
                        case AWARD_STATUS.END:
                            return '抽奖完成';
                        default:
                            return '';
                    }
                };

                $scope.awards = AwardSvc.getAll();
                $scope.award = RandomIterator.getCurrentRandom($scope.awards);
                awardsChangeHanlder($scope);

                if (!$rootScope.serverEventBinded) {
                    window.addEventListener("storage", function(e) {
                        // console.log('storage changed....');
                        if (e.key === STORAGE_RANDOM_KEY.AWARD_STATUS) {
                            newScope.$apply(function() {
                                awardsChangeHanlder(newScope);
                            });
                        } else if (e.key === STORAGE_RANDOM_KEY.RANDOM_LIST_CHANNEL &&
                            newScope.award &&
                            newScope.award.status === AWARD_STATUS.RANDOM) {
                            newScope.$apply(function() {
                                recieveRandomHandler(e.newValue, newScope);
                            });
                        } else if (e.key === STORAGE_RANDOM_KEY.CONNECTION_SIGN) {
                            if (e.newValue && e.newValue.indexOf(CONNECTION_SIGN.RESPONSE) === 0) {
                                connection.resolve();
                            }
                        }
                    });
                    $rootScope.serverEventBinded = true;
                }

                // 显示下一奖项信息
                $scope.showNextAward = function() {
                    if ($scope.isAllDone()) {
                        $location.url('/award');
                        return;
                    }
                    var award = null;

                    for (let len = $scope.awards.length, i = len - 1; i >= 0; i--) {
                        if ($scope.awards[i].status === AWARD_STATUS.NOT_START) {
                            award = $scope.awards[i];
                        }
                    }
                    if (award) {
                        $scope.randomEmployees = null;
                        award.status = AWARD_STATUS.READY;
                        $scope.awards = AwardSvc.update(award);
                        $scope.award = $scope.awards.filter(element => {
                            return element.id === award.id;
                        })[0];
                    }
                };
                $scope.isAllDone = function() {
                        return $scope.awards.every(award => {
                            return award.status === AWARD_STATUS.END;
                        });
                    }
                    // 管理员按钮操作:
                $scope.clickAction = function() {
                    if ($scope.isAllDone()) {
                        $location.url('/award');
                        return;
                    }
                    if (!$scope.award || !$scope.award.status) {
                        return '';
                    }
                    switch ($scope.award.status) {
                        case AWARD_STATUS.NOT_START:
                        case AWARD_STATUS.READY:
                        case AWARD_STATUS.PAUSE:
                            $scope.startRandom();
                            break;
                        case AWARD_STATUS.RANDOM:
                            $scope.stopRandom();
                            break;
                        case AWARD_STATUS.END:
                            $scope.showNextAward();
                            break;
                        default:
                            ;
                    }
                }

                $scope.$watch('award', function() {
                    if (!$scope.award || !$scope.award.status) {
                        return '';
                    }
                    $scope.btnText = $scope.getBtnText($scope.award.status);
                });

                // 开始抽奖
                $scope.startRandom = function() {
                    createPromise($q, function() {
                        window.localStorage.setItem(STORAGE_RANDOM_KEY.RANDOM_FLAG, RANDOM_FLAG.START + '' + new Date().getTime());
                    });
                };
                // 结束抽奖
                $scope.stopRandom = function() {
                    createPromise($q, function() {
                        window.localStorage.setItem(STORAGE_RANDOM_KEY.RANDOM_FLAG, RANDOM_FLAG.END + '' + new Date().getTime());
                    });
                };
                // 中奖名单中移除中奖人员
                $scope.removeAwardEmployee = function(empId) {
                    var confirmDelete = window.confirm("确定需要从中奖名单中移除该员工吗？");
                    if (confirmDelete) {
                        $scope.awards = AwardSvc.markAsUnReachable($scope.award.id, [empId]);
                        $scope.randomEmployees = $scope.award.snapshots[$scope.award.snapshots.length - 1].value;
                        setTimeout(function() {
                            $scope.$apply();
                        }, 0);
                    }
                };

                $scope.ALL_USERS_ORIGINAL = ALL_USERS_ORIGINAL;
                $scope.MAX_COL_SIZE = $rootScope.MAX_COL_SIZE;
                $scope.randomStatus = AWARD_STATUS.RANDOM;
            }
        };
    }]
};
