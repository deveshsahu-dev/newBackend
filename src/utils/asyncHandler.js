const asyncHandler = (asyncFuction) => {
 return async (req,res,next) => {
    Promise.resolve(asyncFuction(req,res,next)).catch(()=> next(err));
 }
}

export { asyncHandler};