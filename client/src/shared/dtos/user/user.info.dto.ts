import type { Link } from "@/shared/types";
import type { UserInfo, UserJob, UserPhone } from "@/shared/types/user";
import { UserJobDto } from "./user.job.dto";
import { UserPhoneDto } from "./user.phone.dto";

export class UserInfoDto implements UserInfo {
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
    this.photo = userInfo.photo;
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
      this.phone = new UserPhoneDto(userInfo.phone);
    }
    if (userInfo.job) {
      this.job = new UserJobDto(userInfo.job);
    }
  }
}
