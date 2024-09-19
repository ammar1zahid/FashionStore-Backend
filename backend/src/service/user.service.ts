import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import UserModel, { IUser, IPaymentMethod } from '../models/UserModel';

class UserService {
    public static async updateUser(id: string, updateData: { email?: string; password?: string; name?: string; }): Promise<IUser | null> {
        if (updateData.password) {
            const salt = bcrypt.genSaltSync(10);
            updateData.password = await bcrypt.hashSync(updateData.password, salt);
        }

        return UserModel.findByIdAndUpdate(id, { $set: updateData }, { new: true }).exec();
    }

    public static async deleteUser(id: string): Promise<IUser | null> {
        return UserModel.findByIdAndDelete(id).exec();
    }

    public static async getUser(id: string): Promise<IUser | null> {
        return UserModel.findById(id).exec();
    }

    public static async getAllUsers(query?: string): Promise<IUser[]> {
        if (query === 'true') {
            // If query is 'true', return the latest 5 users sorted by _id in descending order
            return UserModel.find().sort({ _id: -1 }).limit(5).exec();
        } else {
            
            return UserModel.find().exec();
        }
    }
    

    public static async getUserStats(): Promise<unknown[]> {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

        return UserModel.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            { $project: { month: { $month: "$createdAt" } } },
            { $group: { _id: "$month", total: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]).exec();
    }

    public static async forgetPassword(email: string): Promise<string> {
        const user = await UserModel.findOne({ email }).exec();

        if (!user) {
            throw new Error('User not found');
        }

        const secret = process.env.JWT_KEY + user.password;
        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: '5m' });
        const link = `http://localhost:5000/api/users/reset/${user._id}/${token}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            port: 587,
            secure: false,
            tls: {
                rejectUnauthorized: false
            },
            connectionTimeout: 10000,
        });

        const mailOptions = {
            from: '"Fashion Store" <no-reply@FashionStore.com>',
            to: user.email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Please click on the following link to reset your password: ${link}`,
            html: `<p>You requested a password reset. Please click on the following link to reset your password:</p><a href="${link}">Reset Password</a>`,
        };

        await transporter.sendMail(mailOptions);

        return 'Password reset link has been sent to your email';
    }

    public static async resetPassword(id: string, token: string, password: string, confirmPassword: string): Promise<string> {
        const user = await UserModel.findById(id).exec();

        if (!user) {
            throw new Error('User not found');
        }

        const secret = process.env.JWT_KEY + user.password;
        jwt.verify(token, secret);

        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);
        await user.save();

        return 'Password has been reset successfully';
    }

    public static async addPaymentMethod(id: string, paymentMethod: IPaymentMethod): Promise<IPaymentMethod[]> {
        const user = await UserModel.findById(id).exec();

        if (!user) {
            throw new Error('User not found');
        }

        user.paymentMethods.push(paymentMethod);
        await user.save();

        return user.paymentMethods;
    }

    public static async editPaymentMethod(id: string, paymentMethodId: string, updateData: { cardNumber?: string; cardName?: string; expiryDate?: string; cvv?: string; }): Promise<IPaymentMethod | null> {
        const user = await UserModel.findById(id).exec();

        if (!user) {
            throw new Error('User not found');
        }

        const paymentMethod = user.paymentMethods.find(pm => pm._id?.toString() === paymentMethodId);

        if (!paymentMethod) {
            throw new Error('Payment method not found');
        }

        if (updateData.cardNumber) {
            paymentMethod.cardNumber = updateData.cardNumber;
        }
        if (updateData.cardName) {
            paymentMethod.cardName = updateData.cardName;
        }
        if (updateData.expiryDate) {
            paymentMethod.expiryDate = updateData.expiryDate;
        }
        if (updateData.cvv) {
            paymentMethod.cvv = updateData.cvv;
        }

        await user.save();

        return paymentMethod;
    }

    public static async deletePaymentMethod(id: string, paymentMethodId: string): Promise<IPaymentMethod[]> {
        const user = await UserModel.findById(id).exec();

        if (!user) {
            throw new Error('User not found');
        }

        user.paymentMethods = user.paymentMethods.filter(pm => pm._id?.toString() !== paymentMethodId);
        await user.save();

        return user.paymentMethods;
    }

    public static async getPaymentMethods(id: string): Promise<IPaymentMethod[]> {
        const user = await UserModel.findById(id).exec();

        if (!user) {
            throw new Error('User not found');
        }

        return user.paymentMethods;
    }
}

export default  UserService;
