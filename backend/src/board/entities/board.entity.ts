import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { TimeStamp } from '../../global/common/timeStamp';
import { Location } from '../../location/entities/location.entity';
import { Category } from '../../global/enums/category.enum';
import { ChatRoom } from '../../chat-room/entities/chat-room.entity';

@Entity('board')
export class Board extends TimeStamp {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '게시판 ID' })
  id: number;

  @ManyToOne(() => User, (user) => user.boards)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ description: '사용자 ID' })
  user: User;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiProperty({ description: '제목', nullable: true })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ description: '설명', nullable: true })
  description: string;

  @Column({ name: 'start_time', type: 'time', nullable: true })
  @ApiProperty({ description: '시작시간', nullable: true })
  startTime: string;

  @ApiProperty({ description: '시작 날짜', nullable: false })
  @Column({ type: 'date', nullable: false })
  date: string;

  @ManyToOne(() => Location, (location) => location.boards)
  @JoinColumn({ name: 'location_id' })
  @ApiProperty({ description: '위치' })
  location: Location;

  @Column({ type: 'enum', enum: Category, nullable: false })
  @ApiProperty({ description: '카테고리' })
  category: Category;

  @OneToOne(() => ChatRoom, (chatRoom) => chatRoom.board, { eager: true })
  @JoinColumn({ name: 'chat_room_id' })
  @ApiProperty({ description: '채팅방' })
  chatRoom: ChatRoom;
}
