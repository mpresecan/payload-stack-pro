import {FormCTAActionType} from "../auth";

export class LoginError extends Error {
  action?: FormCTAActionType;

  constructor(message: string, options?: { cause?: string, action?: FormCTAActionType }) {
    super(message);
    this.name = 'LoginError';
    this.cause = options?.cause;
    this.action = options?.action;
    Object.setPrototypeOf(this, LoginError.prototype);
  }
}
