const asyncHandler = (requestHandler)=>{
    async(req,res,next)=>{
        try {
            await requestHandler(req,res)
        } catch (error) {
            return res.status(error.code || 500).json({
                success:false,
                error:error.message,
            })
        }
    }

}

export default asyncHandler;
