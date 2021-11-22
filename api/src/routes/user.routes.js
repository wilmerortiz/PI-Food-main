const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const { Router, request} = require('express');

const router = Router();
/*
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get("/api/test/user",
        [authJwt.verifyToken],
        controller.userBoard
    );

    app.get("/api/test/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );

    app.get("/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};
*/

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

/*
router.get("/api/test/all", controller.allAccess);

router.get("/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
);

router.get("/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
);

router.get("/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
);
*/

router.get('/users', controller.getUsers)
router.get('/users/:id', controller.getUser)
router.post('/users/favorites/', controller.registerFavorites)
router.get('/users/recipesFavorites/:userId', controller.getFavorites)
module.exports = router;