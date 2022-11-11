import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class createMemberDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(30)
  // @Matches(/^[a-zA-Z0-9~@]*$/, {
  //   message: '이메일 형식으로 5자 이상 30자 이하로 작성해주세요.',
  // })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(11)
  memberName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9~!@#$%^&*]*$/, {
    message: '영문, 숫자, 특수문자의 혼합으로 설정해주세요.',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9~!@#$%^&*]*$/)
  confirmPassword: string;
}
