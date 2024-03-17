import { Link } from '../Link';
import { UserJob } from './UserJob';
import { UserPhone } from './UserPhone';

export interface UserInfo {
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
}
