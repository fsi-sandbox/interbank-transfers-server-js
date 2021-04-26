import { sterling } from 'innovation-sandbox';

export const confirmAccount = async (account) => {
  const response = await sterling.Transfer.InterbankNameEnquiry({
    sandbox_key: process.env.SANDBOX_KEY,
    params: {
      Referenceid: '01',
      RequestType: '01',
      Translocation: '01',
      ToAccount: account,
      destinationbankcode: '000001'
    },
    subscription_key: 't',
    Appid: '69',
    ipval: '0'
  });

  return response && response.message === 'OK';
};

export const performTransfer = async (details) => {
  const { amount, fromAccount, toAccount, fromName, toName } = details;
  const response = await sterling.Account.InterbankTransferReq({
    sandbox_key: process.env.SANDBOX_KEY,
    payload: {
      Amount: `${amount}`,
      FromAccount: fromAccount,
      ToAccount: toAccount,
      BenefiName: toName,
      OriginatorAccountName: fromName,
      Referenceid: '0101',
      RequestType: '01',
      Translocation: '0101',
      SessionID: '01',
      DestinationBankCode: '01',
      NEResponse: '01',
      PaymentReference: '01',
      translocation: '01'
    },
    subscription_key: 't',
    Appid: '69',
    ipval: '0'
  });

  return response;
};
