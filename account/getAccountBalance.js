// Allow access to our .env file variables
require("dotenv").config();

// uses Hedera JavaScript SDK
const { Client, AccountBalanceQuery } = require("@hashgraph/sdk");

async function getAccountBalance() {
  // Grab account ID and private key from the .env file
  const operatorPrivateKey = process.env.OPERATOR_KEY;
  const operatorAccount = process.env.OPERATOR_ID;

  // If we weren't able to grab it, we should throw a new error
  if (operatorPrivateKey == null || operatorAccount == null) {
    throw new Error(
      "environment variables OPERATOR_KEY and OPERATOR_ID must be present"
    );
  }
  // Create our connection to the Hedera network
  const client = Client.forTestnet();

  // Set your client account ID and private key
  // used to pay for transaction fees and sign transactions
  client.setOperator(operatorAccount, operatorPrivateKey);

  // Attempt to get and display the balance of our account
  const balance = await new AccountBalanceQuery()
    .setAccountId(operatorAccount)
    .execute(client);

  console.log(`${operatorAccount} balance = ${balance.asTinybar()}`);
}

getAccountBalance();
