import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hashPassword } from 'src/common/utils/hashPassword.utils';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)
  private readonly userRepository: Repository<User>,
){}
  
  async createUser(newUser: CreateUserDto) {
    const checkEmail = await this.userRepository.findOne({where: { email: newUser.email.toLowerCase()}})
    if(checkEmail){
      throw new HttpException('This email is already in use', HttpStatus.CONFLICT)
    }
    const securePass = await hashPassword(newUser.password);

    const createUser: CreateUserDto = this.userRepository.create({...newUser, password: securePass })
    return this.userRepository.save(createUser)  
  }

  
  getUsers() {
    return this.userRepository.find()
  }

  findOne(idUser: string) {
    return this.userRepository.findOne({where: {id : idUser}})
  }

  update(idUser: string, updateUser: UpdateUserDto) {
    return this.userRepository.update({id: idUser}, updateUser)
  }

  async remove(idUser: string) {
    const aEliminar = await this.userRepository.findOne({where: {id: idUser}})
    return this.userRepository.softRemove(aEliminar)
  }
}
