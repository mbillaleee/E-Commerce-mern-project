const errorResponse = (response, {statusCode = 500, message = "Internl server error"}) =>{
    return response.status(statusCode).json({
        success: false,
        message: message,
    });
}
const successResponse = (response, {statusCode = 200, message = 'Success', payload = {} } ) =>{
    return response.status(statusCode).json({
        success: true,
        message: message,
        payload,
    });
}

module.exports = {errorResponse, successResponse};