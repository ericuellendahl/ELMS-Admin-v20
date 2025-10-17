export class User {
  emailId!: string;
  password!: string;

  constructor() {
    this.password = '';
    this.emailId = '';
  }
}
