import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel, { IUser } from '../models/UserModel';

class AuthService {
    public static async createUser(userData: Partial<IUser>): Promise<void> {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(userData.password as string, salt);

        const newUser = new UserModel({
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: hash,
            phone: userData.phone,
            paymentMethods: []
        });

        await newUser.save();
    }

    public static async loginUser(username: string, password: string): Promise<{ token: string, user: Partial<IUser> } | null> {
        const user = await UserModel.findOne({ username }) as IUser | null;
        if (!user) return null;

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return null;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...otherDetails } = user.toObject();
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_KEY as string
        );

        return { token, user: otherDetails };
    }
}

export default AuthService;
