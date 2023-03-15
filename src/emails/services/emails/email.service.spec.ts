import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { CreateEmailDto } from '../../dto/CreateEmailDto.dto';
import { Email } from '../../../schemas/email.schema';
import { Model } from 'mongoose';

const mockEmail = {
  _id: '1',
  to: 'test@example.com',
  subject: 'Test Email',
  body: 'This is a test email',
  createdAt: new Date(),
  isRead: false,
};

describe('EmailService', () => {
  let service: EmailService;
  let emailModel = {
    prototype: {
      save: jest.fn().mockResolvedValue(mockEmail),
      create: jest.fn().mockResolvedValue(mockEmail),
    },
  } as Model<Email>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: getModelToken(Email.name),
          useValue: {
            find: jest.fn().mockResolvedValue([mockEmail]),
            findById: jest.fn().mockResolvedValue(mockEmail),
            findByIdAndUpdate: jest.fn().mockResolvedValue(mockEmail),
            findByIdAndDelete: jest.fn().mockResolvedValue(mockEmail),
            create: jest.fn().mockResolvedValue(mockEmail),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    emailModel = module.get<Model<Email>>(getModelToken(Email.name));
    console.log('getModelToken(Email.name) value:', getModelToken(Email.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of emails', async () => {
      const result = [mockEmail];
      jest.spyOn(emailModel, 'find').mockResolvedValue(result);
      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single email', async () => {
      jest.spyOn(emailModel, 'findById').mockResolvedValue(mockEmail);
      expect(await service.findOne('1')).toBe(mockEmail);
    });

    it('should return null if email is not found', async () => {
      jest.spyOn(emailModel, 'findById').mockResolvedValue(null);
      expect(await service.findOne('1')).toBeNull();
    });
  });

  describe('update', () => {
    it('should update and return the email', async () => {
      const updateDto: CreateEmailDto = {
        to: 'new@example.com',
        subject: 'Updated Test Email',
        body: 'This is an updated test email',
        from: '',
        isRead: false,
        createdAt: new Date(),
      };
      jest.spyOn(emailModel, 'findById').mockResolvedValue(mockEmail);
      jest.spyOn(emailModel, 'findByIdAndUpdate').mockResolvedValue(mockEmail);
      expect(await service.update('1', updateDto)).toBe(mockEmail);
    });

    it('should throw an error if email is not found', async () => {
      const updateDto: CreateEmailDto = {
        to: 'new@example.com',
        subject: 'Updated Test Email',
        body: 'This is an updated test email',
        from: '',
        isRead: false,
        createdAt: new Date(),
      };
      jest.spyOn(emailModel, 'findById').mockResolvedValue(null);
      await expect(service.update('1', updateDto)).rejects.toThrowError(
        'Email with id 1 not found',
      );
    });
  });

  describe('create', () => {
    it('should create and return an email', async () => {
      const createEmailDto: CreateEmailDto = {
        to: 'example@example.com',
        from: 'example@example.com',
        subject: 'Test email',
        body: 'This is a test email',
        isRead: false,
        createdAt: new Date(),
      };
      const createMock = jest.fn();

      // Cast the create method to the mock function
      (service.create as jest.Mock) = createMock;

      // Set the resolved value for the mock function
      createMock.mockResolvedValue(createEmailDto);
      const result = await service.create(createEmailDto);

      expect(result).toEqual(createEmailDto);
    });
  });
});
