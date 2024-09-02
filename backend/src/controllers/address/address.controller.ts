import { Request, Response, NextFunction } from 'express';
import AddressService from '../../service/address.service';
import createError from '../../middlewares/error';

class AddressController {
    // Add Address
    public static async addAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const savedAddress = await AddressService.addAddress(req.params.id, req.body);
            res.status(200).json(savedAddress);
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(400, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }       
        }
    }

    // Get Addresses
    public static async getAddresses(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const addresses = await AddressService.getAddresses(req.params.id);
            res.status(200).json(addresses);
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(400, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    // Get Address by ID
    public static async getAddressById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const address = await AddressService.getAddressById(req.params.id, req.params.addressId);
    
            if (!address) {
                return next(createError(404, 'Address not found'));
            }
    
            res.status(200).json(address);
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(400, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    // Edit Address
    public static async editAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const updatedAddress = await AddressService.editAddress(req.params.id, req.params.addressId, req.body);

            if (!updatedAddress) {
                return next(createError(404, 'Address not found'));
            }

            res.status(200).json(updatedAddress);
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(400, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    // Delete Address
    public static async deleteAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const deletedAddress = await AddressService.deleteAddress(req.params.id, req.params.addressId);
    
            if (!deletedAddress) {
                return next(createError(404, 'Address not found'));
            }
    
            res.status(200).json({ message: 'Address deleted' });
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(400, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }
}

export default AddressController;
