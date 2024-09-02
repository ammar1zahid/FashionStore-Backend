import AddressModel, { IAddress } from '../models/address.model';

class AddressService {
    // Add Address
    public static async addAddress(userId: string, addressData: Omit<IAddress, 'userId'>): Promise<IAddress> {
        const newAddress = new AddressModel({
            userId, 
            ...addressData
        });
        return await newAddress.save();
    }

    // Get Addresses
    public static async getAddresses(userId: string): Promise<IAddress[]> {
        return await AddressModel.find({ userId });
    }

    // Get Address by ID
    public static async getAddressById(userId: string, addressId: string): Promise<IAddress | null> {
        return await AddressModel.findOne({
            _id: addressId,
            userId
        });
    }

    // Edit Address
    public static async editAddress(userId: string, addressId: string, addressData: Partial<Omit<IAddress, 'userId'>>): Promise<IAddress | null> {
        return await AddressModel.findOneAndUpdate(
            { _id: addressId, userId }, 
            { $set: addressData },
            { new: true }
        );
    }

    // Delete Address
    public static async deleteAddress(userId: string, addressId: string): Promise<IAddress | null> {
        return await AddressModel.findOneAndDelete({
            _id: addressId,
            userId
        });
    }
}

export default AddressService;
