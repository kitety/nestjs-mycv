import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

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

  @Column({ default: false })
  approved: boolean;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}

// 和循环引用相关的，不能直接引用，因此使用函数的这种形式，执行的时候将会在后面执行
// @ManyToOne(() => User, (user) => user.reports)
// 获取相关的实例
