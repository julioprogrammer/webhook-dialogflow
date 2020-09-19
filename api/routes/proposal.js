module.exports = app => {
  const controller = app.controllers.proposal;

  app.route('/api/v1/proposal')
    .get(controller.list);

  app.route('/api/v1/proposal')
    .post(controller.insert);

  app.route('/api/v1/proposal/update/status/:proposalId')
    .put(controller.updateStatus);
}