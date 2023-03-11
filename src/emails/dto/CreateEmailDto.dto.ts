export class CreateEmailDto {
  readonly subject: string;
  readonly body: string;
  readonly from: string;
  readonly to: string;
  readonly isRead: boolean;
  readonly createdAt: Date;
}
