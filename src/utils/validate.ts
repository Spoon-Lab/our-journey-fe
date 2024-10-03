/* eslint-disable no-useless-escape */
import * as yup from 'yup';

const emailSchema = yup
  .string()
  .required('이메일을 입력해주세요')
  .matches(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, '이메일 형식에 맞게 다시 입력해주세요')
  .trim();

const passwordSchema = yup
  .string()
  .required('비밀번호를 입력해주세요')
  .min(8, '최소 8자리 이상 입력해주세요')
  .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, '비밀번호는 문자와 숫자를 포함해야합니다')
  .trim();

const passwordCheckSchema = yup
  .string()
  .oneOf([yup.ref('password1')], '비밀번호가 일치하지 않습니다')
  .required('비밀번호를 다시 입력해주세요')
  .trim();

const userInfoSchema = yup.object({
  nickname: yup.string().required('닉네임을 입력해주세요').max(10, '최대 10자리까지 입력이 가능합니다'),
  selfIntroduction: yup.string().max(20, '최대 20자리까지 입력이 가능합니다').nullable().notRequired(),
});

const signupSchema = yup.object({
  email: emailSchema,
  password1: passwordSchema,
  password2: passwordCheckSchema,
});

const loginSchema = yup.object({
  email: emailSchema,
  password: yup.string().required('비밀번호를 입력해주세요').trim(),
});

const emailCheckSchema = yup.object({
  email: emailSchema,
});

const newPasswordSchema = yup.object({
  password1: passwordSchema,
  password2: passwordCheckSchema,
});

export { emailCheckSchema, loginSchema, newPasswordSchema, signupSchema, userInfoSchema };
