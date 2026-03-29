export class UserBeanDto {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  groupId?: string;
  groupName?: string;
  phone?: string;
  status?: string;
  createTime?: Date | string;
  updateTime?: Date | string;

  constructor(partial: Partial<UserBeanDto>) {
    Object.assign(this, partial);
  }
}
