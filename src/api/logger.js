// logs an error to the console if there is a validation error
export function validationError(request, h, error) {
    console.log(error.message);
  }
  