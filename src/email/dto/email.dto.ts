export class EmailDto {
  readonly subject: string;
  readonly body: string;
  readonly sender: string;
  readonly recipient: string;
  readonly isRead: boolean;
  readonly timestamp: Date;
}
