/* eslint-disable no-useless-escape */

import * as yup from 'yup';

const signupSchema = yup.object({
  email: yup
    .string()
    .required('이메일을 입력해주세요')
    .matches(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, '이메일 형식에 맞게 다시 입력해주세요')
    .trim(),

  password: yup
    .string()
    .required('비밀번호를 입력해주세요')
    .min(4, '최소 4자리 이상 입력해주세요')
    .max(12, '최대 12자리까지 입력이 가능합니다')
    .matches(/^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{4,12}$/, '영어, 숫자, 특수문자를 모두 조합해서 비밀번호를 작성해야 합니다')
    .trim(),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다')
    .required('비밀번호를 다시 입력해주세요')
    .trim(),
});

export { signupSchema };
