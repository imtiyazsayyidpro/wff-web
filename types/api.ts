/**
 * The backend always responds with this envelope:
 *   { status: boolean, message: string, data: T | null }
 * (see wff-backend `sendResponse`). On error, `status` is false and `message`
 * carries a human-readable reason.
 */
export interface ApiEnvelope<T> {
  status: boolean;
  message: string;
  data: T;
}

/**
 * Normalised error thrown by the axios client. Any caller (React Query,
 * forms, etc.) can rely on `message` being safe to show to a user.
 */
export class ApiError extends Error {
  /** HTTP status code, or 0 for network/unknown failures. */
  readonly statusCode: number;
  /** Optional structured payload the backend attached to the error. */
  readonly data: unknown;

  constructor(message: string, statusCode: number, data: unknown = null) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.data = data;
  }

  get isUnauthorized() {
    return this.statusCode === 401;
  }
}
