var Mock = require('mockjs');
// Usage:
// http://mockjs.com/examples.html

function subRouter(express) {

    /*eslint-disable*/
    var router = express.Router();

    // 下载文件
    router.get('/v1/prize/win', function(req, res) {
        return res.json({
            "code": 200,
            "content": {
              prizeId: 1,
              token: 'xxxdfdsadsa'
            }
        });
    });


    return router;
}

module.exports = {
    root: '/',
    router: subRouter
};
