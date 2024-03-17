import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDocument } from 'src/crud/user/user.schema';
import { NewsletterDto } from './dto/newsletter.dto';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async newUser(user: UserDocument) {
    const result = await this.mailerService.sendMail({
      from: `${this.configService.get('SMTP_USER')}@yandex.ru`,
      to: `ker4ik13@yandex.ru`,
      subject: 'Новый пользователь в админ панели на сайте KireevDev',
      html: `
          <div>
            <h1>Новый пользователь!</h1>
            <p><b>Имя</b>: ${user.info.firstName} ${user.info.lastName}</p>
            <p><b>Почта</b>: <a href=${'mailto:' + user.email}>${user.email}</a>
            <p><b>Роли</b>: ${user.roles.map((role) => role).join(', ')}</p>
            <p><b>Дата регистрации</b>: ${new Date(
              user.private.createdAt,
            ).toLocaleString('ru')}</p>
          </div>
        `,
    });

    console.log(result.accepted);
  }

  // Рассылка
  async newsletter(dto: NewsletterDto) {
    try {
      dto.emails.map(async (email) => {
        await this.mailerService.sendMail({
          from: `${this.configService.get('SMTP_USER')}@yandex.ru`,
          to: email,
          subject: dto.title,
          html: dto.message,
        });
      });
      return {
        message: [
          `Рассылка успешно завершена. Сообщение ушло на почты: ${dto.emails}`,
        ],
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: ['Во время рассылки произошла ошибка на сервере'],
      });
    }
  }

  async sendMailClaim(
    claim: any = {
      name: 'Кирилл',
      email: 'kireev.kirill2004@mail.ru',
      mobilePhone: '89999999999',
    },
  ) {
    console.log('Отправка сообщения на электронную почту');
    console.log('user: ' + this.configService.get('SMTP_USER'));
    console.log('host: ' + this.configService.get('SMTP_HOST'));
    console.log('port: ' + this.configService.get('SMTP_PORT'));
    console.log('пароль тоже есть');

    const result = await this.mailerService.sendMail({
      from: `${this.configService.get('SMTP_USER')}@yandex.ru`,
      to: `${this.configService.get('SMTP_USER')}@yandex.ru`,
      subject: 'Новая заявка с сайта "Твоя Кухня"',
      html: `
          <div>
            <h1>Новая заявка!</h1>
            <p><b>Имя</b>: ${claim.name}</p>
            ${
              claim.email
                ? `<p>Почта: <a href=${'mailto:' + claim.email}></a>${
                    claim.email
                  }</p>`
                : '<p><b>Почта</b>: Нет</p>'
            }
            <p><b>Номер телефона</b>: ${claim.mobilePhone}</p>
            <p><b>Дата заявки</b>: ${new Date().toLocaleString('ru')}</p>
          </div>
        `,
    });

    console.log(result.accepted);
  }

  // async sendActivationMail (to: string, link: string) {
  //   console.log(this.transporter.options);
  //   console.log(connection);

  //   const result = await this.transporter.sendMail({
  //     from: connection.user,
  //     to: to,
  //     // sender: 'Твоя Кухня',
  //     subject: 'Активация аккаунта на youkuhnya.ru',
  //     text: '',
  //     html:
  //       `
  //         <div>
  //           <h1>Для активации перейдите по ссылке:</h1>
  //           <a href="${link}">${link}</a>
  //         </div>
  //       `
  //   })

  //   console.log(result.response);
  // }
}
