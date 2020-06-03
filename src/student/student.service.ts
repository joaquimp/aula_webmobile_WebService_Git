import { Injectable } from "@nestjs/common";
import { StudentRepository } from './student.repository';
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "./student.entity";
import { CreateStudentDto } from "./dto/student.dto";

@Injectable()
export class StudentService {

    constructor(@InjectRepository(StudentRepository) private studentRepository: StudentRepository) { }

    async getStudent(): Promise<Student[]> {
        return this.studentRepository.getStudent();
    }

    async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
        return this.studentRepository.createStudent(createStudentDto);
    }

    async updateStudent(idStudent: number, createStudentDto: CreateStudentDto): Promise<Student> {
        return this.studentRepository.updateStudent(idStudent, createStudentDto);
    }

    async deleteStudent(idStudent: number): Promise<number> {
        return this.studentRepository.deleteStudent(idStudent);
    }
} 