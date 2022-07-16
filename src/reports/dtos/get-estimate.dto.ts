import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

// query string的值需要进行转换

export class GetEstimateDto {
  // 商标
  @IsString()
  make: string;

  // 模型
  @IsString()
  model: string;

  // 年份
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  // 经度 地点
  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lng: number;

  // 纬度 地点
  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;

  // 里程数
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}
