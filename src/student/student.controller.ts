import { Controller, Get, Post, Body, Put, ParseIntPipe, Param, Delete } from "@nestjs/common";
import { StudentService } from "./student.service";
import { ApiOperation } from "@nestjs/swagger";
import {CreateStudentDto} from './dto/student.dto';
import { Student } from "./student.entity";

@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService){}

    @Get()
    async getStudent(): Promise<Student[]>{
        return this.studentService.getStudent();
    }

    @Post()
    async createCar(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
        return this.studentService.createStudent(createStudentDto);
    }

    @Put(':id')
    async updateCar(@Param('id', ParseIntPipe) idStudent: number, @Body() createStudentDto: CreateStudentDto): Promise<Student>{
        return this.studentService.updateStudent(idStudent, createStudentDto);
    }

    @Delete(':id')
    async deleteTask(@Param('id', ParseIntPipe) idStudent: number): Promise<number>{
        return this.studentService.deleteStudent(idStudent);
    }


}