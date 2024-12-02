export const errorMessages = {
  SERVER_START_ERROR:
    '--> Server failed to start, please check your configuration settings.',

  INTERNAL_SERVER_ERROR: '--> Internal server error, please try again later.',

  DATABASE_CONNECTION_ERROR:
    'Could not connect to the database, please check your database connection.',

  DATABASE_SYNC_ERROR:
    'Database synchronization error, please check your database settings.',

  REDIS_CONNECTION_ERROR:
    'Could not connect to Redis, please check your Redis connection.',

  PERSON_NOT_FOUND: 'Person not found!',

  INVALID_TC: 'The ID number is not valid!',
  INVALID_GSM: 'The GSM number is not valid!',
  INVALID_WHERE_CLAUSE: 'No conditions were specified.',

  CONNECTION_ABORTED:
    'Connection was aborted, the operation could not be completed.',

  INVALID_CREDENTIALS:
    'Invalid credentials. Please check your email and password.',

  NO_TOKEN_PROVIDED: 'Access token was not provided. Please authenticate.',

  UNAUTHORIZED: 'Unauthorized access. Please provide valid credentials.',

  UNAUTHORIZED_ADMIN: 'You need admin privileges to perform this action.',

  TOKEN_EXPIRED: 'Your session has expired. Please log in again.',
  TOKEN_INVALID: 'Token is invalid, please log in again.',

  USER_NOT_FOUND: 'User not found. Please try logging in again.',

  USER_BLOCKED:
    'Your account has been blocked. Please contact the support team.',

  USER_CREATION_FAILED: 'User could not be created.',

  CURRENT_PASSWORD_INCORRECT:
    'Current password is incorrect. Please enter the correct password.',

  PASSWORDS_DONT_MATCH: 'The entered passwords do not match. Please try again.',

  PASSWORD_SAME_AS_OLD:
    'The new password cannot be the same as the old password.',

  LOGOUT_FAILED: 'An error occurred during the logout process.',
};
