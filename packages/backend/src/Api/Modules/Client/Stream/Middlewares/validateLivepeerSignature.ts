import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { streamConfig } from 'Config/streamConfig';

export const validateLivepeerSignature = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const signature = req.headers['livepeer-signature'];
  const sharedSecret = streamConfig.livepeerSharedSecret;

  if (!signature || !sharedSecret) {
    return res.status(403).json({ error: 'Unauthorized request' });
  }

  const hash = crypto
    .createHmac('sha256', sharedSecret)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (hash !== signature) {
    return res.status(403).json({ error: 'Invalid signature' });
  }

  next();
};
