import { input, password as inquirerPassword, select } from '@inquirer/prompts';
import { NestFactory } from '@nestjs/core';
import { hash } from 'bcrypt';
import { AppModule } from 'src/app.module';
import { Role } from 'src/users/entities/roles.entity';
import { User } from 'src/users/entities/users.entity';
import { RoleType } from 'src/users/types/role-type';
import { UserType } from 'src/users/types/user-type';
import { DataSource } from 'typeorm';

const createUser = async () => {
  const appContext = await NestFactory.createApplicationContext(AppModule);

  try {
    const dataSource = appContext.get(DataSource);
    const userRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);

    const firstName = await input({ message: 'First name : ', default: 'admin', required: true });
    const lastName = await input({ message: 'Last name : ', default: 'Admin', required: true });
    const email = await input({
      message: 'Email : ',
      default: 'admin@admin.com',
      required: true,
      validate: async (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input)) return 'Please enter a valid email address';
        const existingUser = await userRepository.findOne({ where: { email: input } });
        return !existingUser || 'Email already exists';
      },
    });
    const password = await inquirerPassword({
      message: 'Password : ',
      mask: '*',
      validate: (input) => (input.length > 0 ? true : 'Password is required'),
    });
    const roleType = await select({
      message: 'Role',
      choices: [
        {
          name: 'Administrator',
          value: 'ADMINISTRATOR',
        },
        {
          name: 'Manager',
          value: 'MANAGER',
        },
        {
          name: 'Simple user',
          value: 'READ_ONLY',
        },
      ],
    });

    const role = await roleRepository.findOne({ where: { type: roleType as RoleType } });
    if (!role) {
      throw new Error(`Role type not found : ${roleType}`);
    }

    const hashedPassword = await hash(password, 10);

    const createdUser = await userRepository.save({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      type: UserType.INTERNAL,
      role,
    });
    console.log(`User successfully created and have id ${createdUser.id}`);
  } catch (error) {
    console.error('Error during creation of the user : ', error.message);
  } finally {
    await appContext.close();
  }
};

createUser();
