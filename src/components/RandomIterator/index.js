import { AWARD_STATUS, ALL_USERS_ORIGINAL } from '../../constants';

var _Collection = require('lodash/collection');
var _Number = require('lodash/number');
var _Array = require('lodash/array');


var RandomIterator = {};

var ALL_EMP_IDS = Object.keys(ALL_USERS_ORIGINAL);

/**
 * 具体随机人员方法
 * @param  {Boolean} isNormal 是否需要排除已中奖人员
 * @param  {Number} size   随机中奖人数
 * @return {Array}           中奖人员列表
 */
RandomIterator.randomEmployees = function(size, isNormal) {
        if (!size) {
            return;
        }
        
        var empIds = _Collection.shuffle(ALL_EMP_IDS);
        
        var selectedEmpIds = new Set();
        var randomId = null;

        while (selectedEmpIds.size < size) {
            randomId = empIds[_Number.random(0, empIds.length - 1)];

            if (isNormal) {
                if (ALL_USERS_ORIGINAL[randomId].qualification) {
                    selectedEmpIds.add(randomId);
                }
            } else {
                selectedEmpIds.add(randomId);
            }
        }
        return [...selectedEmpIds];
    }
/**
 * 找到正在进行中的奖项
 * @param  {Array} awards 所有奖项信息
 */
RandomIterator.getCurrentRandom = function(awards) {
    if (!awards || !awards.length) {
        return null;
    }
    // 将第一个奖项设置为Ready状态
    if (awards[0].status === AWARD_STATUS.NOT_START) {
        awards[0].status = AWARD_STATUS.READY;
    }
    // 找到正在进行中的奖项
    for (let i = 0, len = awards.length; i < len; i++) {
        let award = awards[i];
        if (award.status === AWARD_STATUS.PAUSE || award.status === AWARD_STATUS.RANDOM || award.status === AWARD_STATUS.READY) {
            return award;
        }
    }

    for (let len = awards.length, i = len - 1; i >= 0; i--) {
        if (awards[i].status === AWARD_STATUS.END) {
            return awards[i];
        }
    }
}

export default RandomIterator;
