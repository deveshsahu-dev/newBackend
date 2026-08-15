const asyncHandler = (asyncFuction) => {
 return async (req,res,next) => {
    Promise.resolve(asyncFuction(req,res,next)).catch((err)=> next(err));
 }
}

export { asyncHandler};