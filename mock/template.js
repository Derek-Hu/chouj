function subRouter(express) {

    /*eslint-disable*/
    var router = express.Router();

    // Get Method
    router.get('/plans/:planId', function (req, res) {
        console.log(req.query);
        // http://www.expressjs.com.cn/4x/api.html#res.json
        return res.json({
            result: 'success',
            content: {
                // http://www.expressjs.com.cn/4x/api.html#req.params
                planId: req.params.planId
            }
        });
    });

    // POST Method
    router.post('/user', function (req, res) {
        // http://www.expressjs.com.cn/4x/api.html#req.body
        console.log(req.body);
        return res.json({
            result: 'success',
            content: {
                email: 'ben@hubenlv.com'
            }
        });
    });

    // Delete Method
    router.delete('/user', function (req, res) {
        return res.json({
            result: 'success',
            content: {
                email: 'ben@hubenlv.com'
            }
        });
    });

    // Send Error
    // http://www.expressjs.com.cn/4x/api.html#res.sendStatus
    router.put('/user', function (req, res) {
        // 400: Bad Request
        return res.sendStatus(400);
    });
    return router;
}

export default {
    root: '/template',
    router: subRouter
};
