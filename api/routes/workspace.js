const { Router } = require('express');
const workspaceController = require('../controllers/workspace');
const jwtMiddleware = require('../middlewares/auth');
const fileUpload = require('express-fileupload');
const { check } = require('express-validator/check');
const workspaceRouter = new Router();

workspaceRouter.post('/workspaces',
    jwtMiddleware,
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024}
    }),
    [
        check('name').exists(),
        check('description').exists(),
    ],
    workspaceController.createWorkspace
);

workspaceRouter.get('/workspaces',
    jwtMiddleware,
    workspaceController.getWorkspaces
);

workspaceRouter.get('/workspaces/:id',
    jwtMiddleware,
    workspaceController.getWorkspace
);

module.exports = workspaceRouter;
