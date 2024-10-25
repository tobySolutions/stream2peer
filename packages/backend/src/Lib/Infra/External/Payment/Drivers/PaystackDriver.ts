// TBD
// import { IPaymentProviderDriver } from "Lib/Infra/External/Payment/TypeChecking/IPaymentProviderDriver";
// import { HttpClient } from "Lib/Infra/Internal/HttpClient";
// import { businessConfig } from "Config/businessConfig";
// import { InitializeTransactionDto } from "Lib/Infra/External/Payment/TypeChecking/InitializeTransactionDto";
// import { VerifyTransactionDto } from "Lib/Infra/External/Payment/TypeChecking/VerifyTransactionDto";
// import * as console from "console";

// export class PaystackDriver implements IPaymentProviderDriver {
//   async verifyTransaction(
//     verifyTransactionDto: VerifyTransactionDto
//   ): Promise<object | null> {
//     const { transactionReference } = verifyTransactionDto;

//     const url = new URL(businessConfig.paystack.verifyApiUrl);

//     url.pathname += "/" + transactionReference;

//     console.log(url.href);

//     const response = await HttpClient.get({
//       url: url.href,
//       headers: {
//         Authorization: `Bearer ${businessConfig.paystack.apiKey}`,
//       },
//     });

//     return response.data;
//   }

//   async initializeTransaction(
//     initializeTransactionDto: InitializeTransactionDto
//   ): Promise<object | null> {
//     const { email, amount, transactionReference } = initializeTransactionDto;

//     const url = new URL(businessConfig.paystack.initializeApiUrl);

//     const response = await HttpClient.post({
//       url: url.href,
//       headers: {
//         Authorization: `Bearer ${businessConfig.paystack.apiKey}`,
//         "Content-Type": "application/json",
//       },
//       body: {
//         amount,
//         email,
//         reference: transactionReference,
//       },
//     });

//     return response.data;
//   }
// }
