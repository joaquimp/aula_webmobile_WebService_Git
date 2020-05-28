import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student } from "./student.entity";
import { StudentDTO } from "./student.dto";
import { create } from "domain";

@Injectable()
export class StudentService {
    constructor(@InjectRepository(Student) private studentRepository: Repository<Student>) { }

    async getStudents(): Promise<Student[]> {
        return await this.studentRepository.find();
    }

    async addStudent(student: StudentDTO): Promise<Student> {
        const created = this.studentRepository.create(student);
        return await this.studentRepository.save(created);
    }
}