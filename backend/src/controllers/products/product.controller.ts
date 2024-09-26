import { Request, Response, NextFunction } from 'express';
import ProductService from '../../service/product.service';
import createError from '../../middlewares/error';

class ProductController {
    public static async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log('Incoming Product Data:', req.body);
            const result = await ProductService.createProduct(req.body);
            res.status(200).json(result);
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await ProductService.updateProduct(req.params.id, req.body);
            if (result) {
                res.status(200).json(result);
            } else {
                next(createError(404, 'Product not found'));
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await ProductService.deleteProduct(req.params.id);
            res.status(200).json({ message: 'Product has been deleted' });
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async getProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await ProductService.getProduct(req.params.id);
            if (result) {
                res.status(200).json(result);
            } else {
                next(createError(404, 'Product not found'));
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    // public static async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     try {
    //         const result = await ProductService.getAllProducts(req.query as { new?: string, category?: string, page?: string, limit?: string });
    //         res.status(200).json(result);
    //     } catch (err: unknown) {
    //         if (err instanceof Error) {
    //             next(createError(500, err.message));
    //         } else {
    //             next(createError(500, 'An unexpected error occurred'));
    //         }
    //     }
    // }

    public static async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await ProductService.getAllProducts(req.query as { new?: string, category?: string, page?: string, limit?: string });
            res.status(200).json(result);
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }


    public static async getAllProductsAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const products = await ProductService.getAllProductsAdmin();
            res.status(200).json(products);
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }
    


    public static async getRecommendedProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await ProductService.getRecommendedProducts(req.params.id);
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                next(createError(404, 'No recommended products found'));
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async getProductInventory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await ProductService.getProductInventory(req.params.pID);
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                next(createError(404, 'Product Not Found'));
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }

    public static async getAllInventories(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await ProductService.getAllInventories();
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                next(createError(404, 'No Products Found'));
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                next(createError(500, err.message));
            } else {
                next(createError(500, 'An unexpected error occurred'));
            }
        }
    }
}

export default ProductController;
