import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;

  // 商标
  @IsString()
  make: string;

  // 模型
  @IsString()
  model: string;

  // 年份
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  // 经度 地点
  @IsLongitude()
  lng: number;

  // 纬度 地点
  @IsLatitude()
  lat: number;
  // 里程数
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}
