export class ResponseDto<T> {
  code = 0;
  message = '操作成功';
  data: T | null;

  constructor(data: T | null = null, code = 0, message = '操作成功') {
    this.data = data;
    this.code = code;
    this.message = message;
  }

  static ok<T>(data: T): ResponseDto<T> {
    return new ResponseDto<T>(data, 0, '操作成功');
  }

  static fail<T>(message = '操作失败', code = 1): ResponseDto<T> {
    return new ResponseDto<T>(null, code, message);
  }
}
