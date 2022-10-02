const express = require('express');
const applicationRoute = require('./application.route');
const authRoute = require('./auth.route');
const groupRoute = require('./group.route');
const taskRoute = require('./task.route');

const router = express();

const routes = [
  { path: '/', route: authRoute },
  { path: '/groups', route: groupRoute },
  // { path: '/groups/:id/tasks', route: taskRoute },
  { path: '/', route: applicationRoute },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
