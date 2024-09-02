// import { Router, Request, Response, NextFunction } from 'express';
import { Router } from "express";
import UserController from "./user.controller";
import { verifyUser, verifyAdmin } from "../../middlewares/verifyToken";
import { validate } from "../../middlewares/validation";
import { paymentMethodValidator, resetPasswordValidator, updateUserValidator } from "./user.validator";

const router = Router();


// JWT role-based verification

// Uncomment these routes if needed
// userRouter.get("/checkAuthentic", verifyToken, (req: Request, res: Response, next: NextFunction) => {
//     res.send("You're logged in successfully");
// });

// userRouter.get("/checkUser/:id", verifyUser, (req: Request, res: Response, next: NextFunction) => {
//     res.send("You're logged in successfully and you can edit your account");
// });

// userRouter.get("/checkAdmin/:id", verifyAdmin, (req: Request, res: Response, next: NextFunction) => {
//     res.send("You're logged in successfully and you can edit your account");
// });

// User routes
router.put(
  "/:id",
  verifyUser,
  validate(updateUserValidator, "body"),
  UserController.updateUser
);

router.delete(
  "/:id",
  verifyUser,
  UserController.deleteUser
);

router.get("/:id", verifyUser,UserController.getUser);
router.get("/", verifyAdmin, UserController.getAllUsers);

router.get(
  "/stats",
  verifyAdmin,
  UserController.getUserStats
);

router.post(
  "/forget-password",
  UserController.forgetPassword
);

router.post(
  "/reset/:id/:token",
  validate(resetPasswordValidator, 'body'),
  UserController.resetPassword
);

router.post(
  "/:id/payment-method",
  verifyUser,
  validate(paymentMethodValidator, 'body'), 
  UserController.addPaymentMethod
);

router.put(
  "/:id/payment-method/:paymentMethodId",
  verifyUser,
  validate(paymentMethodValidator, 'body'), 
  UserController.editPaymentMethod
);

router.delete(
  "/:id/payment-method/:paymentMethodId",
  verifyUser,
  UserController.deletePaymentMethod
);

router.get(
  "/:id/payment-methods",
  verifyUser,
  UserController.getPaymentMethods
);

export default router;
