import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get, HttpStatus,
  Param,
  Post,
  Req, Res, UseFilters,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.interface";
import { UserDto, UserParamsDto } from "./user.dto";
import { Request, Response } from "express";
import { HttpExceptionFilter } from "./user.filter";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @Get("/:email")
  @UseFilters(new HttpExceptionFilter())
  async getUser(@Param() params: UserParamsDto): Promise<User> {
    try {
      return await this.userService.getUser(params.email);
    } catch (e) {
      throw new BadRequestException("error");
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async postUser(@Body() user: UserDto): Promise<User> {
    return this.userService.postUser(user);
  }

  @Delete("/:email")
  deleteUser(@Param() params: UserParamsDto): User[] {
    return this.userService.deleteUser(params.email);
  }
}
