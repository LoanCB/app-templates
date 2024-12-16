import { ApiProperty } from '@nestjs/swagger';
import { SoftDeleteEntity } from 'src/common/entities/soft-delete.entity';
import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { UserType } from '../types/user-type';
import { Role } from './roles.entity';

@Entity()
export class User extends SoftDeleteEntity {
  @ApiProperty({ description: 'First name of the user', example: 'John' })
  @Column()
  firstName: string;

  @ApiProperty({ description: 'Last name of the user', example: 'Doe' })
  @Column()
  lastName: string;

  @ApiProperty({ description: 'Email of the user', example: 'john.doe@sortcost.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'Encrypted API key for user API type only', example: null })
  @Column({
    unique: true,
    nullable: true,
  })
  apiKey: string;

  @ApiProperty({ description: 'Hashed password of the user used to authenticate', example: 'azerty123' })
  @Column({ select: false })
  password: string;

  @ApiProperty({
    description: 'Type of the user determine if it is an API user or an internal user',
    enum: UserType,
    example: UserType.API,
    default: UserType.INTERNAL,
  })
  @Column({ type: 'enum', enum: UserType, default: UserType.INTERNAL })
  type: UserType;

  @ApiProperty({
    description: 'Boolean to check if account is active or not. Inactive user cannot be connect',
    example: true,
  })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ type: () => Role })
  @ManyToOne(() => Role, (role) => role.users)
  role: Relation<Role>;
}
