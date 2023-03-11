export class UpdateEmailDto {
  subject: string;
  body: string;
  to: string;
  from: string;
  createdAt: Date;
  isRead: boolean;
}
