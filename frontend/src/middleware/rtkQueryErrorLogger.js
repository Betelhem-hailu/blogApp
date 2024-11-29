import { isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const errorMessages = {
  'EMAIL_EXISTS': 'Email already exists. Please use a different email.',
  'INVALID_PASSWORD': 'The password is incorrect. Please try again.',
  'USER_NOT_FOUND': 'User does not exist. Please sign up first.',
  'POST_NOT_FOUND': 'Post does not exist. Either it is deleted or not created.',
  'UNAUTHORIZED': 'You must login first',
};

export const rtkQueryErrorLogger =
  () => (next) => (action) => {
    if (isRejectedWithValue(action)) {

      console.log('action', action);

      // if (action.status.code === 400) {
      //   toast.error(errorMessages[action.payload], {  // This is an example of how to handle a specific error code and message
      //     position: 'top-right',
      //     autoClose: 5000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   });
      // }

      const errorMessage =
        errorMessages[action.payload.code] || action.payload.message || action.payload || 'An unexpected error occurred.';

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
