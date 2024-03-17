import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model, isValidObjectId } from 'mongoose';
import { MailService } from 'src/crud/mail/mail.service';
import { RoleService } from 'src/crud/roles/role.service';
import { TokenService } from 'src/crud/token/token.service';
import { IsValidDto } from 'src/dtos/IsValid.dto';
import { PageDto, PageOptionsDto, generateMetaPage } from 'src/dtos/page';
import { deleteFiles, isRoleIncludes } from 'src/libs/helpers';
import type { IJwtPayload } from 'src/types/IJwtPayload';
import { UserRoles } from 'src/types/user/UserRoles';
import type { AddRoleDto } from './dto/addRole.dto';
import type { BanUserDto } from './dto/banUser.dto';
import type { RegisterUserDto } from './dto/register/register.user.dto';
import { UserResponse } from './dto/responses';
import type { UserDto } from './dto/user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private model: Model<User>,
    private readonly roleService: RoleService,
    private readonly mailService: MailService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(userDto: RegisterUserDto) {
    // Хеширование пароля и сохранение пользователя
    const hashPassword = await bcrypt.hash(userDto.private.password, 3);

    const newUser = {
      ...userDto,
      private: {
        password: hashPassword,
        createdAt: new Date().toISOString(),
      },
      roles: [UserRoles.Creator],
    };

    const addedUser = await this.model.create(newUser);
    this.mailService.newUser(addedUser);
    return addedUser;
  }

  async getAllUsers(options: PageOptionsDto): Promise<PageDto<UserResponse>> {
    if (options.search) {
      const querySearch = await this.model
        .find({
          $or: [
            { 'info.firstName': { $regex: options.search, $options: 'i' } },
            { 'info.lastName': { $regex: options.search, $options: 'i' } },
            { 'info.userName': { $regex: options.search, $options: 'i' } },
            { 'info.status': { $regex: options.search, $options: 'i' } },
            { 'info.about': { $regex: options.search, $options: 'i' } },
            { 'info.job.position': { $regex: options.search, $options: 'i' } },
          ],
        })
        .sort({ _id: options.order === 'ASC' ? 1 : -1 })
        .skip(options.skip)
        .limit(options.take);

      return generateMetaPage(
        querySearch.map((user) => new UserResponse(user)),
        querySearch,
        options,
      );
    }

    const allUsers = await this.model.find();

    const result = await this.model
      .find()
      .sort({ _id: options.order === 'ASC' ? 1 : -1 })
      .skip(options.skip)
      .limit(options.take);

    const allUsersResponse: UserResponse[] = result.map(
      (user) => new UserResponse(user),
    );

    return generateMetaPage(allUsersResponse, allUsers, options);
  }

  async getUserByIdOrSlug(idOrSlug: string): Promise<UserResponse> {
    const isValid = isValidObjectId(idOrSlug);

    if (isValid) {
      return new UserResponse(await this.model.findById(idOrSlug));
    }

    return new UserResponse(
      await this.model.findOne({
        'info.userName': idOrSlug,
      }),
    );
  }

  async getUserByEmail(email: string) {
    return await this.model.findOne({ email });
  }

  async getUserByTelegramId(id: number): Promise<UserResponse> {
    return new UserResponse(await this.model.findOne({ telegramId: id }));
  }

  async deleteUserById(id: string, user: IJwtPayload): Promise<UserResponse> {
    if (user._id !== id && !isRoleIncludes([UserRoles.Creator], user.roles)) {
      throw new ForbiddenException({
        message: ['У вас недостаточно прав'],
      });
    }

    // Удаление токенов пользователя
    await this.tokenService.deleteAllTokensByUserId(id);

    return new UserResponse(
      await this.model.findByIdAndDelete(id, { multi: true }),
    );
  }

  async updateUserById(
    id: string,
    body: UserDto,
    user: IJwtPayload,
  ): Promise<UserResponse> {
    if (
      user._id !== id &&
      !isRoleIncludes([UserRoles.Creator, UserRoles.Admin], user.roles)
    ) {
      throw new ForbiddenException({
        message: ['У вас недостаточно прав'],
      });
    }

    const oldUser = await this.model.findById(id);

    if (oldUser.info.photo && !body.info.photo) {
      return new UserResponse(
        await this.model.findByIdAndUpdate(
          id,
          {
            ...body,
            info: {
              ...body.info,
              photo: oldUser.info.photo,
            },
            private: {
              ...oldUser.private,
              ...body.private,
            },
          },
          { new: true },
        ),
      );
    }

    return new UserResponse(
      await this.model.findByIdAndUpdate(id, body, { new: true }),
    );
  }

  async updateUserPhotoById(
    id: string,
    user: IJwtPayload,
    photo: Express.Multer.File,
  ): Promise<UserResponse> {
    if (
      user._id !== id &&
      !isRoleIncludes([UserRoles.Creator, UserRoles.Admin], user.roles)
    ) {
      throw new ForbiddenException({
        message: ['У вас недостаточно прав'],
      });
    }

    const oldUser = await this.model.findById(id);

    if (!oldUser) {
      throw new NotFoundException({
        message: ['Пользователь не был найден'],
      });
    }

    if (oldUser.info.photo) {
      deleteFiles([oldUser.info.photo]);
    }

    return new UserResponse(
      await this.model.findByIdAndUpdate(
        id,
        { 'info.photo': photo.filename },
        { new: true },
      ),
    );
  }

  async updateUserByEmail(
    email: string,
    body: UserDto | UserResponse | User,
  ): Promise<UserResponse> {
    return new UserResponse(
      await this.model.findOneAndUpdate({ email }, body, { new: true }),
    );
  }

  async addRole(dto: AddRoleDto) {
    const user: UserDocument = await this.model.findById(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);

    if (role && user) {
      user.roles.push(role.value);
      await user.save();
      return new UserResponse(user);
    }

    throw new NotFoundException({
      message: ['Пользователь или роль не найдены'],
    });
  }

  // Проверить имя пользователя
  async checkSlug(slug: string) {
    const user = await this.model.findOne({ 'info.userName': slug });

    if (user) {
      throw new ConflictException(
        new IsValidDto({
          isValid: false,
          message: 'Такое имя пользователя уже используется',
        }),
      );
    }

    return new IsValidDto({
      isValid: true,
      message: 'Имя пользователя свободно',
    });
  }

  // Проверить почту
  async checkEmail(email: string) {
    const user = await this.model.findOne({ email });

    if (user) {
      throw new ConflictException(
        new IsValidDto({
          isValid: false,
          message: 'Такая почта уже используется',
        }),
      );
    }

    return new IsValidDto({
      isValid: true,
      message: 'Почта свободна свободно',
    });
  }

  // Забанить пользователя
  async ban(dto: BanUserDto, currentUser: IJwtPayload) {
    try {
      const user = await this.model.findById(dto.userId);

      if (!user) {
        throw new NotFoundException({
          message: ['Пользователь не был найден'],
        });
      }

      // Нельзя заблокировать себя
      if (user.id === currentUser._id) {
        throw new ConflictException({
          message: ['Вы не можете заблокировать себя'],
        });
      }

      // Если роль администратора ниже роли создателя
      if (
        isRoleIncludes([UserRoles.Creator], user.roles) &&
        !isRoleIncludes([UserRoles.Creator], currentUser.roles)
      ) {
        throw new ForbiddenException({
          message: ['У вас нет прав'],
        });
      }

      user.blocked = {
        isBlocked: true,
        blockDate: new Date().toISOString(),
        blockReason: dto.blockReason,
      };

      await user.save();
      return new UserResponse(user);
    } catch (error) {
      throw new NotFoundException({
        message: ['Пользователь не был найден'],
      });
    }
  }

  // Разбанить пользователя
  async unban(id: string) {
    try {
      const user = await this.model.findById(id).populate('roles').exec();

      if (!user) {
        throw new NotFoundException({
          message: ['Пользователь не был найден'],
        });
      }

      const newUser = await this.model.findOneAndUpdate(
        { _id: id },
        { $unset: { blocked: {} } },
        { new: true },
      );

      return new UserResponse(newUser);
    } catch (error) {
      throw new NotFoundException({
        message: ['Пользователь не был найден'],
      });
    }
  }
}
