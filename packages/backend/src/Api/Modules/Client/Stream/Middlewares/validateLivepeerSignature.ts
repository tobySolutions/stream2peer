import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { streamConfig } from 'Config/streamConfig';

export const validateLivepeerSignature = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const signature = req.headers['livepeer-signature']?.toString();
  const sharedSecret = streamConfig.livepeerSharedSecret;

  if (!signature || !sharedSecret) {
    return res.status(403).json({ error: 'Unauthorized request' });
  }

  const [, signatureHash] = signature.split(',');
  const [, actualSignature] = signatureHash.split('=');

  const hash = crypto
    .createHmac('sha256', sharedSecret)
    .update(JSON.stringify(req.body))
    .digest('hex');
  console.log(hash);
  console.log(actualSignature);
  if (hash !== actualSignature) {
    return res.status(403).json({ error: 'Invalid signature' });
  }

  next();
};
