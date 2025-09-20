


export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            return next(new Error(err))
        })
    }
}



export const globalErrorHandler = (err, req, res, next) => {
    return res.send({errMessage: err.message, errStack: err.stack})
}