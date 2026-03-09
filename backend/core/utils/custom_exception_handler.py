from rest_framework.views import exception_handler
from rest_framework.response import Response

def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    # Now add the custom error formatting
    if response is not None:
        custom_data = {
            'error': response.data.get('detail', "An error occurred"),
            'code': getattr(exc, 'default_code', 'ERROR'),
            'details': response.data
        }
        response.data = custom_data

    return response
