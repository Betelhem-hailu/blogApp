import { isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const errorMessages = {
  'EMAIL_EXISTS': 'Email already exists. Please use a different email.',
  'INVALID_PASSWORD': 'The password is incorrect. Please try again.',
  'USER_NOT_FOUND': 'User does not exist. Please sign up first.',
};

export const rtkQueryErrorLogger =
  () => (next) => (action) => {
    if (isRejectedWithValue(action)) {

      const errorMessage =
        errorMessages[action.payload.code] || action.payload.message || 'An unexpected error occurred.';

      toast.error(
        errorMessage,
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }

    return next(action);
  };
