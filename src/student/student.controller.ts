import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { StudentService } from "./student.service";
import { ApiOperation } from "@nestjs/swagger";

import {StudentDTO} from './student.dto';
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: 'Get all Students', description: 'Busca os estudantes no db' })
    async getStudents(){
        return await this.studentService.getStudents();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({summary: 'Create a Student', description: 'Cria um estudante com base no body da request'})
    async addStudent(@Body() student: StudentDTO) {
        return await this.studentService.addStudent(student);
    }

}