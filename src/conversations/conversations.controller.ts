import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { AuthenticationGuard } from 'src/auth/utils/Guards';
import { Routes, Services } from 'src/utils/constants';
import { IConversationsService } from './conversations';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthUser } from 'src/utils/decorators';
import { CreateConversationDto } from './dtos/CreateConversation.dto';
import { User } from 'src/utils/typeorm';

@SkipThrottle()
@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthenticationGuard)
export class ConversationsController {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationsService: IConversationsService,
    private readonly events: EventEmitter2,
  ) {}

  @Get('test/endpoint/check')
  test() {
    return;
  }

  @Post()
  async createConversation(
    @AuthUser() user: User,
    @Body() createConversationPayload: CreateConversationDto,
  ) {
    const conversation = await this.conversationsService.createConversation(
      user,
      createConversationPayload,
    );
    this.events.emit('conversation.create', conversation);
    return conversation;
  }

  @Get()
  async getConversation(@AuthUser() { id }: User) {
    return this.conversationsService.getConversation(id);
  }

  @Get(':id')
  async getConversationById(@Param('id') id: number) {
    return this.conversationsService.findById(id);
  }
}
