declare namespace App {
  namespace JWT {
    interface JWTPayload {
      username: string;
      sub: number;
    }
  }
  namespace Auth {
    interface LoginResponse {
      access_token: string;
      user: Partial<import('../../src/models/user/user.entity').User>;
    }

    interface Request {
      userId: number;
      username: string;
    }
  }
}
