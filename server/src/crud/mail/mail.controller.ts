import { JwtAuthGuard, RolesGuard } from '@auth/guards';
import { Roles } from '@common/decorators';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserRoles } from 'src/types/user/UserRoles';
import { NewsletterDto } from './dto/newsletter.dto';
import { MailService } from './mail.service';

@UseGuards(JwtAuthGuard)
@Controller()
export class MailController {
  constructor(readonly mailService: MailService) {}

  @Roles(UserRoles.Creator, UserRoles.Admin)
  @UseGuards(RolesGuard)
  @Post('newsletter')
  newsletter(@Body() dto: NewsletterDto) {
    return this.mailService.newsletter(dto);
  }
}
