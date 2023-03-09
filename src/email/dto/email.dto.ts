export class EmailDto {
  readonly _id: string;
  readonly subject: string;
  readonly body: string;
  readonly sender: string;
  readonly recipient: string;
  readonly isRead: boolean;
  readonly createdAt: Date;
}
