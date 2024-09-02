// Define the custom error type
interface CustomError extends Error {
    status?: number;
    message: string;
}

// Create and return a custom error object
const createError = (status: number, message: string): CustomError => {
    const err: CustomError = new Error(message);
    err.status = status;
    return err;
};

export default createError;
