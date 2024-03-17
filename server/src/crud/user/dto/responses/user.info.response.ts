import { setServerUrlBeforeSrc } from 'src/libs/helpers';
import { Link } from 'src/types/Link';
import type { UserInfo, UserJob, UserPhone } from 'src/types/user';
import { UserJobResponse } from './user.job.response';
import { UserPhoneResponse } from './user.phone.response';

export class UserInfoResponse implements UserInfo {
  firstName: string;
  lastName: string;
  userName?: string;
  photo?: string;
  status?: string;
  links?: Link[];
  about?: string;
  contactEmail?: string;
  languages?: string[];
  phone?: UserPhone;
  job?: UserJob;

  constructor(userInfo: UserInfo) {
    this.firstName = userInfo.firstName;
    this.lastName = userInfo.lastName;
    this.userName = userInfo.userName;
    this.photo = userInfo.photo
      ? setServerUrlBeforeSrc(userInfo.photo)
      : undefined;
    this.status = userInfo.status;

    if (userInfo.links) {
      this.links = userInfo.links;
    }

    this.about = userInfo.about;
    this.contactEmail = userInfo.contactEmail;

    if (userInfo.languages) {
      this.languages = userInfo.languages;
    }

    if (userInfo.phone) {
      this.phone = new UserPhoneResponse(userInfo.phone);
    }
    if (userInfo.job) {
      this.job = new UserJobResponse(userInfo.job);
    }
  }
}
