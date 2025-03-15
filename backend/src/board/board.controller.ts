import { Request } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { Token } from '../auth/auth.decorator';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board';
import { UpdateBoardDto } from './dto/update-board';
import { BoardResponseDto } from './dto/board-response.dto';
import { PaginationParamsDto } from './dto/pagination-params.dto';
import { PaginationBoardsResponseDto } from './dto/pagination-boards-response.dto';
import { BoardIdDto } from './dto/boardId.dto';

@ApiTags('Boards')
@Controller('api/v1/boards')
export class BoardController {
  constructor(private readonly boardService: BoardService,
              private readonly jwtService: JwtService,) {}

  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: '페이지 번호',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: '페이지 당 게시글 수',
  })
  @ApiOperation({ summary: '모든 게시물 조회' })
  @Get()
  async findAll(
    @Query() paginationParams?: PaginationParamsDto,
  ): Promise<PaginationBoardsResponseDto> {
    return this.boardService.findAll(paginationParams);
  }

  @ApiCookieAuth()
  @ApiOperation({ summary: '새 게시물 생성' })
  @UseGuards(AuthGuard)
  @Post()
  async create(
      @Body(ValidationPipe) createBoardDto: CreateBoardDto,
      @Token('sub') id: number,
  ): Promise<BoardResponseDto> {
    console.log('Received CreateBoardDto:', createBoardDto); // 데이터 확인
    return this.boardService.createBoard(createBoardDto, id);
  }

  @ApiOperation({ summary: '특정 게시물 조회' })
  @Get(':boardId')
  async findOne(
      @Param() boardIdDto: BoardIdDto,
      @Req() req: Request,
  ): Promise<BoardResponseDto> {
    // 쿠키에서 JWT 토큰을 추출
    const token = req.cookies?.['accessToken']; // 쿠키가 없는 경우도 처리

    let userId: number | null = null;

    // 토큰이 있는 경우 디코딩
    if (token) {
      try {
        const decodedToken = this.jwtService.decode(token) as any;
        userId = decodedToken?.sub || null;
      } catch (error) {
        console.warn('JWT 디코딩 실패:', error.message);
        userId = null; // 디코딩 실패 시 userId를 null로 설정
      }
    }

    return this.boardService.findOne(boardIdDto.boardId, userId);
  }


  @ApiOperation({ summary: '게시물 업데이트' })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Patch(':boardId')
  async update(
    @Param() boardIdDto: BoardIdDto,
    @Body(ValidationPipe) updateBoardDto: UpdateBoardDto,
    @Token('sub') userId: number,
  ): Promise<BoardResponseDto> {
    return this.boardService.updateBoard(
      boardIdDto.boardId,
      userId,
      updateBoardDto,
    );
  }

  @Delete(':boardId')
  @ApiOperation({ summary: '게시물 삭제' })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  async remove(
    @Param() boardIdDto: BoardIdDto,
    @Token('sub') userId: number,
  ): Promise<{ message: string }> {
    console.log('${boardId}가 있습니다', boardIdDto);
    const { boardId } = boardIdDto;
    await this.boardService.removeBoard(boardId, userId);
    return { message: 'board가 성공적으로 삭제되었습니다.' };
  }
}
