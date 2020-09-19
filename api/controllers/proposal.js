const accountSid = 'AC259b32a9ce1399bc5fad5ac386165988';
const authToken = '499b470e0c804f3954aa759dd7d4bcc9';
const client = require('twilio')(accountSid, authToken);

module.exports = app => {
  const proposals = app.data.proposals;
  const controller = {};

  controller.list = (req, res) => {
    res.status(200).json(proposals.proposals.data);
  };

  controller.insert = (req, res) => {
    const newProposal = {
      "id": proposals.proposals.data.length + 1,
      "proposalNumber": req.body.proposalNumber,
      "status": req.body.status,
      "xpaccount": req.body.xpaccount,
      "phone": req.body.phone
    };

    proposals.proposals.data.push(newProposal);

    res.status(200).json(newProposal);
  };

  controller.updateStatus = (req, res) => {
    const {
      proposalId,
    } = req.params;

    proposals.proposals.data.forEach(x => {
      if (x.id == proposalId) {
        x.status = req.body.status;
        notificationUpdateStatus(x);
      }
    });

    res.status(200).json({
      "success": true,
      "message": "Status da proposta alterado com sucesso!"
    });
  };

  return controller;
};

const notificationUpdateStatus = async ({ proposalNumber, status, phone }) => {
  await client.messages
    .create({
      from: 'whatsapp:+14155238886',
      body: `O status da sua proposta ${proposalNumber} foi alterado para: ${status}.`,
      to: `whatsapp:${phone}`
    })
    .then(message => console.log(message.sid))
    .catch(err => console.error(err));
};