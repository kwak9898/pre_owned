import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class createMemberDto {
  @IsString()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  @MinLength(10)
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9~!@#$%^&*]*$/, {
    message: '이메일 형식으로 10자 이상 30자 이하로 작성해주세요.',
  })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
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
  @IsNotEmpty({ message: '비밀번호 확인란을 적어주세요.' })
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9~!@#$%^&*]*$/)
  confirmPassword: string;
}
