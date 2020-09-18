module.exports = app => {
  const proposals = app.data.proposals;
  const policies = app.data.policies;
  const controller = {};

  controller.connect = (req, res) => {
    var resultFiltered = req.body.queryResult.outputContexts.filter(x => x.name.includes("informationxpaccount-followup-2"))[0].parameters;
    var proposal = {};
    var policy = {};
    var messageResponse = "";

    if (verifyXpAccount(resultFiltered) && verifyOption(resultFiltered) && verifyProposalNumber(resultFiltered)) {
      if (resultFiltered.option === 1) {
        policy = policies.policies.data.filter(x => x.xpaccount === resultFiltered.xpaccount && x.proposalNumber === resultFiltered.proposalnumber)[0];
        if (!policy) {
          messageResponse = "Desculpe, não conseguimos identificar essa apólice em nossa base";
        } else {
          messageResponse = `O Status da sua apólice ${policy.proposalNumber} é: ${policy.status}`;
        }
      }

      if (resultFiltered.option === 2) {
        proposal = proposals.proposals.data.filter(x => x.xpaccount === resultFiltered.xpaccount && x.proposalNumber === resultFiltered.proposalnumber)[0];
        if (!proposal) {
          messageResponse = "Desculpe, não conseguimos identificar essa proposta em nossa base";
        } else {
          messageResponse = `O Status da sua proposta ${proposal.proposalNumber} é: ${proposal.status}`;
        }
      }
    }

    res.status(200).json({
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              messageResponse
            ]
          }
        }
      ]
    });
  };

  return controller;
};

const verifyXpAccount = (resultFiltered = {}) => {
  if (resultFiltered.xpaccount !== null && resultFiltered.xpaccount !== "") {
    return true;
  }
  return false;
};

const verifyOption = (resultFiltered = {}) => {
  if (resultFiltered.option !== null && resultFiltered.option !== "") {
    return true;
  }
  return false;
};

const verifyProposalNumber = (resultFiltered = {}) => {
  if (resultFiltered.proposalNumber !== null && resultFiltered.proposalNumber !== "") {
    return true;
  }
  return false;
}