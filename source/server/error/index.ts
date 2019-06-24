class HttpError {
    public status: number;
    public name = 'HttpError';
    public message: string;

    constructor(message: string, status: number = 403) {
        Error.apply(this, [message]);
        Error.captureStackTrace(this, this.constructor);
        this.status = status;
        this.message = message;
    }
}

export default HttpError;
