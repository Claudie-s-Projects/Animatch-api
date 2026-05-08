import { Module } from '@nestjs/common';
import { FamilleModule } from '../famille/famille.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [FamilleModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
