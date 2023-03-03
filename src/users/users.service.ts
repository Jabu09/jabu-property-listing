import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './entities/user.schema';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create({ username, password }: CreateUserDto) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await this.passwordMaker(password, salt);
      const user = new User();
      user.password = hashPassword;
      user.username = username;
      user.secretKey = salt;
      const createdUser = new this.userModel(user);
      const result = await createdUser.save();
      return {
        username: result.username,
        id: result.id,
      };
    } catch (erro) {
      throw new InternalServerErrorException('user not created not now');
    }
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  async findOneByUsername(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  private async passwordMaker(password: string, salt: string) {
    return await bcrypt.hash(password, salt);
  }
}
