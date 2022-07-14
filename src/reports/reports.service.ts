import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  // 引入  Repository
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  createReport(body: CreateReportDto) {
    // 先创建，再保存
    const report = this.repo.create(body);
    return this.repo.save(report);
  }
}
