import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  // 商标
  @Column()
  make: string;

  // 模型
  @Column()
  model: string;

  // 年份
  @Column()
  year: number;

  // 经度 地点
  @Column()
  lng: number;

  // 纬度 地点
  @Column()
  lat: number;
  // 里程数
  @Column()
  mileage: number;
}
