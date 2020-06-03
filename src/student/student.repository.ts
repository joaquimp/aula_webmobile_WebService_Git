import { Repository, EntityRepository } from "typeorm";
import { Student } from "./student.entity";
import { CreateStudentDto } from "./dto/student.dto";

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {

    async getStudent(): Promise<Student[]>{
        const query = this.createQueryBuilder('student');
        const students = await query.getMany();
        return students;
    }

    async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
        const student = new Student();
        student.id = createStudentDto.id;
        student.name = createStudentDto.name;
        student.course = createStudentDto.course;
        await student.save();        
        return student;
    }

    async updateStudent(idStudent: number, createStudentDto: CreateStudentDto): Promise<Student>{       
        const query = this.createQueryBuilder("student")
        .update(createStudentDto)
        .where("id = :id", { id: idStudent });
        await query.execute();

        return this.findOne(idStudent);          
    }

    async deleteStudent(idStudent: number): Promise<number>{
        const query = this.createQueryBuilder("student")      
        .delete()
        .where("id = :id", { id: idStudent });
        return (await query.execute()).affected;        
    }  

} 