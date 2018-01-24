var middleware = function (req, res, next) {
    if(req.headers.origin){
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Max-Age', 3600);
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }

  // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
};

module.exports = middleware;
