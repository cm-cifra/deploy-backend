import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, StreamableFile, UploadedFiles, UseInterceptors, Response } from "@nestjs/common";

import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

    constructor(private i_service: UsersService) {

    }

    // @Get("get_users")
    // async getAll() {
    //     const response = await this.i_service.getAll();
    //     return response;
    // }

   

}
