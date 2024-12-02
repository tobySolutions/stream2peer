import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { streamConfig } from 'Config/streamConfig';

export const validateLivepeerSignature = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const signature = request.headers['livepeer-signature']?.toString();
  const sharedSecret = streamConfig.livepeerSharedSecret;

  if (!signature || !sharedSecret) {
    return response.status(403).json({ error: 'Unauthorized request' });
  }

  const [, signatureHash] = signature.split(',');
  const [, actualSignature] = signatureHash.split('=');

  const hash = crypto
    .createHmac('sha256', sharedSecret)
    .update(JSON.stringify(request.body))
    .digest('hex');
  if (hash !== actualSignature) {
    return response.status(403).json({ error: 'Invalid signature' });
  }

  next();
};
