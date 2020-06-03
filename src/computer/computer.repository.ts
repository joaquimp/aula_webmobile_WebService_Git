import { Repository, EntityRepository } from "typeorm";
import { Computer } from "./computer.entity";
import { CreateComputerDto } from "./dto/create-computer.dto";


@EntityRepository(Computer)
export class ComputerRepository extends Repository<Computer> {

  async getComputer(completed: boolean): Promise<Computer[]> {
    const query = this.createQueryBuilder('computer');
    if (completed == true) {
      query.where('status = :progresso', {progresso: 'COMPLETED'});
    }else {
      query.where('status != :progresso', {progresso: 'COMPLETED'});
    }

    const computers = await query.getMany();
    return computers;
  }

  async createComputer(createComputerDto: CreateComputerDto): Promise<Computer> {
    const computer = new Computer();
    computer.processor = createComputerDto.processor;
    computer.memory = createComputerDto.memory;
    await computer.save();

    return computer;
  }

  async putComputer(createComputerDto: CreateComputerDto, id: number): Promise<Computer> {
    const query = this.createQueryBuilder('computer')
      .update(createComputerDto).where('id = :codigo', {codigo: id});

    await query.execute();
    return this.findOne(id);
  }

  async deleteComputer(id: number): Promise<number> {
    const query = this.createQueryBuilder('computer')
      .delete().where('id = :codigo', {codigo: id});
    return (await query.execute()).affected;
  }
}