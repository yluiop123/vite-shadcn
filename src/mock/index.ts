import Mock from 'mockjs';
import userMock from './user';
if(process.env.NODE_ENV === 'development'){
  Mock.setup({
    timeout: '500-1500',
  });
  userMock();
}

