import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude() // 转换为JSON的时候，跳过特定属性
  password: string;

  // 额外逻辑，自动执行
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id ', this.id);
  }
}
