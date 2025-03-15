import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);
    if (!token) {
      console.log('토큰이 제공되지 않았습니다.');
      throw new UnauthorizedException('토큰이 제공되지 않았습니다.');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      //console.log('토큰 페이로드:', payload);
      request['token'] = payload;
    } catch (err) {
      console.log('유효하지 않은 토큰:', err);
      throw new UnauthorizedException('유효하지 않은 토큰');
    }
    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies['accessToken'];
  }
}