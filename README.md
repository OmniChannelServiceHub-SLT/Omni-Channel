# Omni-Channel
Reimplement the current APIs used in myslt app, to align those with tmf specifications

## Authentication

The system uses JWT-based authentication.

### Access Token
- Short-lived
- Used for API authorization
- Sent via Authorization header

### Refresh Token
- Long-lived
- Used to reissue access tokens

Tokens are issued after successful OTP verification.
