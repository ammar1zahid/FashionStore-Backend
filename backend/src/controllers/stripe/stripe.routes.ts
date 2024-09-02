import express, { Request, Response } from 'express';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: '2024-06-20', 
});

const stripeRouter = express.Router();

// TypeScript interface for the request body
interface PaymentRequestBody {
  tokenId: string;
  amount: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
stripeRouter.post("/payment", async (req: Request<{}, {}, PaymentRequestBody>, res: Response) => {
  try {
    const { tokenId, amount } = req.body;

    // Create a charge with Stripe
    const charge = await stripe.charges.create({
      source: tokenId,
      amount: amount,
      currency: 'usd',
    });

    res.status(200).json(charge);
  } catch (error) {
    // Handle errors from Stripe API
    if (error instanceof Stripe.errors.StripeError) {
      res.status(500).json({ message: error.message });
    } else {
      // Handle other errors
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
});

export default stripeRouter;
