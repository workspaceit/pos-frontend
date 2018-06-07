
export class AuthCredential {
  id: number;
  email: string;
  status: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
