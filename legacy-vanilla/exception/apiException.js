export class ApiException extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = 'ApiException';
    this.status = status;
  }
}
