import { Injectable, NotFoundException } from '@nestjs/common';
import { PostgresDataSource } from 'src/config/postgres.config';
import { Professional } from 'src/models/professional.entity';
import { PageList, PageParams } from 'src/shared/pagination';
import { ILike, Repository } from 'typeorm';
import { ProfessionalFilter } from './professional.filter';

@Injectable()
export class ProfessionalService {
  private readonly professionalRepository: Repository<Professional>;

  constructor() {
    this.professionalRepository = PostgresDataSource.getRepository(Professional);
  }

  async get(pageParams: PageParams, filter: ProfessionalFilter): Promise<PageList<Professional>> {
    const { pageNumber, pageSize } = new PageParams(pageParams);
    const { name, email, phone, specialty } = filter;

    const where: any = {};

    if (name) {
      where.name = ILike(`%${name}%`);
    }
    if (email) {
      where.email = ILike(`%${email}%`);
    }
    if (phone) {
      where.phone = ILike(`%${phone}%`);
    }
    if (specialty) {
      where.specialty = ILike(`%${specialty}%`);
    }

    const [items, count] = await this.professionalRepository.findAndCount({
      where,
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    });

    return new PageList(items, count, pageNumber, pageSize);
  }

  async getById(id: number): Promise<Professional> {
    const professional = await this.professionalRepository.findOne({ where: { id } });
    if (!professional) {
      throw new NotFoundException(`Profissional não encontrado`);
    }
    return professional;
  }

  async create(professional: Professional): Promise<Professional> {
    const newProfessional = this.professionalRepository.create(professional);
    return await this.professionalRepository.save(newProfessional);
  }

  async update(id: number, professional: Professional): Promise<Professional> {
    const existing = await this.getById(id);
    Object.assign(existing, professional);
    return await this.professionalRepository.save(existing);
  }

  async delete(id: number): Promise<void> {
    const professional = await this.getById(id);
    await this.professionalRepository.softRemove(professional);
  }
}
