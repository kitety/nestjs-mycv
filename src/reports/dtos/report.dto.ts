import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  price: number;

  @Expose()
  approved: boolean;

  // 商标
  @Expose()
  make: string;

  // 模型
  @Expose()
  model: string;

  // 年份
  @Expose()
  year: number;

  // 经度 地点
  @Expose()
  lng: number;

  // 纬度 地点
  @Expose()
  lat: number;

  // 里程数
  @Expose()
  mileage: number;

  // obj 实体对象
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
