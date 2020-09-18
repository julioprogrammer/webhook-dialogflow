module.exports = app => {
  const controller = app.controllers.webhook;

  app.route('/api/v1/webhook/connect')
    .post(controller.connect);
}