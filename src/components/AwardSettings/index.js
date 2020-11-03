import { guid } from '../../utils';
import { ALL_USERS_ORIGINAL, STORAGE_RANDOM_KEY, AWARD_STATUS, PRESET_AWARD, RANDOM_MAX_SIZE, VERSION_NUMBER } from '../../constants';
var _Array = require('lodash/array');

// 奖项信息
function Award(award) {
    if (award.unit) {
        award.unit = window.parseInt(award.unit);
        if (award.unit > RANDOM_MAX_SIZE) {
            award.unit = RANDOM_MAX_SIZE;
        }
    } else {
        award.unit = RANDOM_MAX_SIZE;
    }
    // 每次抽取个数
    this.unit = award.unit;
    // 奖项名称
    this.name = award.name;
    // 奖项人数
    this.total = window.parseInt(award.total);
    this.id = award.id || guid();
    // 获奖名单
    this.winn = award.winn || [];
    // 获奖但未到人员名单
    this.absent = award.absent || [];
    // 当奖项需要分批抽取时，每一批次抽取中奖名单
    this.snapshots = award.snapshots || [];
    this.status = award.status || AWARD_STATUS.NOT_START;
    // 默认不包括已抽奖人员
    this.isNormal = award.isNormal !== false;
    // 奖项开始抽取时间
    this.startTime = award.startTime;
    // 奖项结束抽取时间 
    this.endTime = award.endTime;
}

// 将中奖人员标记未不能再次中奖
Award.prototype.initAwarded = function() {
    if (this.winn) {
        this.winn.forEach(empId => {
            if (ALL_USERS_ORIGINAL[empId]) {
                ALL_USERS_ORIGINAL[empId].qualification = false;
            }
        });
    }
    if (this.absent) {
        this.absent.forEach(empId => {
            if (ALL_USERS_ORIGINAL[empId]) {
                ALL_USERS_ORIGINAL[empId].qualification = false;
            }
        });
    }
};

Award.prototype.startRandom = function() {
    this.status = AWARD_STATUS.RANDOM;
    if (!this.startTime) {
        this.startTime = new Date().getTime();
    }
};
// 更新奖项信息
Award.prototype.update = function(award) {
    if (this.winn.length > award.total) {
        // 奖项数量设置失败，奖项数量需不能小于已抽人数
        return;
    }
    this.name = award.name;
    this.status = award.status;
    this.total = award.total;

    if (this.winn.length !== award.total) {
        if (this.status === AWARD_STATUS.END) {
            this.status = AWARD_STATUS.PAUSE;
        }
    }
};
// 保存中奖人员
Award.prototype.saveLuckies = function(employees) {
    var set = new Set(this.winn.concat(employees));

    this.winn = [...set];
    if (!this.snapshots) {
        this.snapshots = [];
    }
    this.snapshots.push({
        type: 'Random',
        value: employees
    });
    // 标记无抽奖资格
    if (this.isNormal) {
        this.winn.forEach(employeeId => {
            ALL_USERS_ORIGINAL[employeeId].qualification = false;
        });
    }

    if (this.winn.length >= this.total) {
        this.status = AWARD_STATUS.END;
    }
};
// 标记人员为未到
Award.prototype.markAsUnLucky = function(employees) {
    for (let i = 0, len = employees.length; i < len; i++) {
        // 标记无抽奖资格
        ALL_USERS_ORIGINAL[employees[i]].qualification = false;
        let idx = this.winn.indexOf(employees[i]);

        if (idx !== -1) {
            this.winn.splice(idx, 1);
        }
    }
    var set = new Set(this.absent.concat(employees));

    this.absent = [...set];

    if (!this.snapshots) {
        this.snapshots = [];
    }
    this.snapshots.push({
        type: 'Remove',
        value: _Array.without(this.snapshots[this.snapshots.length - 1].value, ...employees)
    });

    if (this.winn.length < this.total) {
        if (this.status === AWARD_STATUS.END) {
            this.status = AWARD_STATUS.PAUSE;
        }
    }

};
// 删除奖项时，将人员重新标记为可中奖
Award.prototype.resetBeforeRemoved = function() {
    if (this.isNormal && this.winn.length) {
        // 还原抽奖资格
        this.winn.forEach(employeeId => {
            // 奖池人员改变时
            if (ALL_USERS_ORIGINAL[employeeId]) {
                ALL_USERS_ORIGINAL[employeeId].qualification = true;
            }
        });
    }
};

function AwardContainer() {
    var codeVersion = window.localStorage.getItem(STORAGE_RANDOM_KEY.VERSION);
    if(!codeVersion || codeVersion === 'null' || codeVersion=== 'undefined' || codeVersion!==VERSION_NUMBER){
        // 当代码版本更新后，时候最新的预设奖项
        window.localStorage.setItem(STORAGE_RANDOM_KEY.AWARD_STATUS, '');
        window.localStorage.setItem(STORAGE_RANDOM_KEY.VERSION, VERSION_NUMBER);
    }
    AwardContainer.resetQualification();
    this._awards = [];
}
// 初始化时，所有人都有资格中奖
AwardContainer.resetQualification = function() {
    Object.keys(ALL_USERS_ORIGINAL).forEach(employeeId => {
        var empInfo = ALL_USERS_ORIGINAL[employeeId];

        ALL_USERS_ORIGINAL[employeeId] = {
            name: (typeof empInfo === 'string') ? empInfo : empInfo.name,
            qualification: true
        }
    });
};
// 获取当前抽奖状况
AwardContainer.prototype.getAll = function() {
    var previousRecords = null;

    previousRecords = window.localStorage.getItem(STORAGE_RANDOM_KEY.AWARD_STATUS);
    if (previousRecords) {
        try {
            previousRecords = JSON.parse(previousRecords);
        } catch (e) {
            previousRecords = null;
        }
    }

    if (previousRecords) {
        this._awards = previousRecords.map(award => {
            return new Award(award);
        });
        if (!this._awards.length) {
            // 如果奖项被清空，数量为零，需要将所有人标记具有抽奖资格
            AwardContainer.resetQualification();
        } else {
            this._awards.forEach(award => {
                award.initAwarded();
            })
        }
    } else {
        this._awards = PRESET_AWARD.map(award => {
            return new Award(award);
        });
        this.save();
    }

    return this._awards;
};
AwardContainer.prototype.findAward = function(id) {
    for (let i = 0, len = this._awards.length; i < len; i++) {
        if (this._awards[i].id === id) {
            return this._awards[i];
        }
    }

};

AwardContainer.prototype.add = function(award) {
    if (!award) {
        return;
    }
    if (!award.name || !award.total) {
        return;
    }

    this._awards.push(new Award(award));
    this.save();
    return this._awards;
};

AwardContainer.prototype.remove = function(awardId) {
    var idx = -1;

    for (let i = 0, len = this._awards.length; i < len; i++) {
        if (this._awards[i].id === awardId) {
            idx = i;
            break;
        }
    }

    if (idx !== -1) {
        let award = this._awards[idx];
        award.resetBeforeRemoved();
        this._awards.splice(idx, 1);
    }

    this.save();

    return this._awards;
};

AwardContainer.prototype.update = function(award) {
    if (!award || !award.id) {
        return;
    }
    var currentAward = this.findAward(award.id);
    currentAward.update(award);
    this.save();
    return this._awards;
};

//交换奖项顺序
AwardContainer.prototype.switch = function(awardId) {
    var idx = -1;

    for (let i = 0, len = this._awards.length; i < len; i++) {
        if (this._awards[i].id === awardId) {
            idx = i;
            break;
        }
    }

    if (idx !== -1) {
        var temp = this._awards[idx];
        this._awards[idx] = this._awards[idx - 1];
        this._awards[idx - 1] = temp;
        this.save();
    }
    return this._awards;
};

AwardContainer.prototype.markAsUnReachable = function(id, employees) {
    var award = this.findAward(id);
    award.markAsUnLucky(employees);
    this.save();
    return this._awards;
};
AwardContainer.prototype.saveLucky = function(id, employees) {
    var award = this.findAward(id);
    award.saveLuckies(employees);
    this.save();
    return award;
};
AwardContainer.prototype.startRandom = function(id) {
    var award = this.findAward(id);
    award.startRandom();
    this.save();
    return award;
}
AwardContainer.prototype.save = function() {
    window.localStorage.setItem(STORAGE_RANDOM_KEY.AWARD_STATUS, JSON.stringify(this._awards));
};

export default {
    name: 'AwardSvc',
    svc: [
        function() {
            return new AwardContainer();
        }
    ]
};
