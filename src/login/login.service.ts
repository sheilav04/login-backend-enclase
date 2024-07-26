import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { verifyPassword } from 'src/common/utils/hashPassword.utils';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ){}

  async createJWT(loginDto : CreateLoginDto) {
    const {email, password} = loginDto

    const findPassByEmail = await this.userRepository.findOne({where: {email: email}})
    if(!findPassByEmail){
      throw new HttpException('This email doesnt exists', HttpStatus.CONFLICT)
    }

    const verificarPass = await verifyPassword(password, findPassByEmail.password)

    if(!verificarPass){
      throw new HttpException('Incorrect password, try again', HttpStatus.CONFLICT)
      //throw new UnauthorizedException()
    }

    if(findPassByEmail && verificarPass){
      const data = {email, password}
      const token = this.jwtService.sign(data, {expiresIn: 20})  
    
     return{
       token: token
     }
    } 
  }

  async verifyToken(token: string) {
    try {
      await this.jwtService.verify(token)
      const decoded = this.jwtService.decode(token)
      return decoded
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  } 

}
