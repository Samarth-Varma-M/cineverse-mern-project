export class ValidationException extends Error {
  constructor(message, fields = []) {
    super(message);
    this.name = 'ValidationException';
    this.fields = fields; // Array of invalid field names
  }
}
