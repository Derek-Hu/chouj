import template from './template.html';
import style from './style.scss';
import { ALL_USERS_ORIGINAL, AWARD_STATUS, NO_EMP_ID_KEY, CSV_NAME } from '../../constants';

var controller = ['$scope', 'AwardSvc', function($scope, AwardSvc) {
    $scope.style = style;
    $scope.awards = AwardSvc.getAll();
    $scope.ALL_USERS_ORIGINAL = ALL_USERS_ORIGINAL;
    $scope.handleSelected = function(award) {
        if (!award) {
            return;
        }
        $scope.award = award;
        $scope.selectedId = award.id;
        $scope.selectedAward = award;

        if (award.startTime) {
            let time = new Date(award.startTime);
            $scope.time = time.toLocaleDateString() + ' ' + time.toLocaleTimeString();
        }
    };
    $scope.NO_EMP_ID_KEY = NO_EMP_ID_KEY;

    var maxCol = 4;

    $scope.getCSVData = function() {
        var data = '';
        $scope.awards.forEach(award => {
            if (award.status === AWARD_STATUS.END) {
                data += `${award.name} : 奖项数量${award.total}名 `;
                if (award.absent.length) {
                    data += `共抽${award.winn.length + award.absent.length}名 未到${award.absent.length}名`;
                }
                data += '\n中奖人员: ';
                award.winn.forEach((empId, index) => {
                    if ((index) % maxCol === 0) {
                        data += '\n';
                    }
                    data += ALL_USERS_ORIGINAL[empId].name + (empId.indexOf(NO_EMP_ID_KEY) !== -1 ? `(${NO_EMP_ID_KEY})` : empId) + ','
                });
                if (award.absent && award.absent.length) {
                    data += '\n未到人员: ';
                    award.absent.forEach((empId, index) => {
                        if ((index) % maxCol === 0) {
                            data += '\n';
                        }
                        data += ALL_USERS_ORIGINAL[empId].name + (empId.indexOf(NO_EMP_ID_KEY) !== -1 ? `(${NO_EMP_ID_KEY})` : empId) + ','
                    })
                }
                data += '\n\n';
            }
        });

        var csvData = new Blob([data], {
            type: 'text/csv'
        });

        var fileURL = URL.createObjectURL(csvData);
        var a = document.createElement('a');
        a.href = fileURL;
        a.target = '_blank';
        a.download = CSV_NAME;
        document.body.appendChild(a);
        a.click();

    };

    $scope.handleSelected($scope.awards[0]);

}];

var page = {
    path: '/award',
    template: template,
    controller: controller
};

export default page;
