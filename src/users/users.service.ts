import { Column, DataSource, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from "src/utils/bcrypt";
import { UsersEntity, UserTypesEntity } from "src/entities";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UsersEntity)
        private i_repository: Repository<UsersEntity>,
        private dataSource: DataSource


    ) { }

  async getAllByType(isActive : number){

    return await this.i_repository.createQueryBuilder("users")
    .leftJoinAndMapOne('users.ut_id',UserTypesEntity,'user_type','users.ut_id = user_type.id')
    .where('users.isActive = :isActive',{isActive : isActive})
    .orderBy('users.lname', 'ASC')
    .getMany();
}

    checkEmailExisted(email:string): Promise<UsersEntity>{

    return this.i_repository.createQueryBuilder("users")
    .leftJoinAndMapOne('users.ut_id',UserTypesEntity,'user_type','users.ut_id = user_type.id')
    .where("users.email  = :email", {email : email})
    .getOne();
    }

      async checkIfApproved(email : string){
        //return this.todoRepository.findBy(id);
        
        return await this.i_repository.createQueryBuilder("users")
        .select(["users"])
        .where("users.email  = :email AND users.isApproved = :isApproved", {email : email, isApproved : 1})
        .getOne();
    }
    
      async checkIfActive(email : string){
        //return this.todoRepository.findBy(id);
        
        return await this.i_repository.createQueryBuilder("users")
        .select(["users"])
        .where("users.email  = :email AND users.isActive = :isActive", {email : email, isActive : 1})
        .getOne();
      }


}
