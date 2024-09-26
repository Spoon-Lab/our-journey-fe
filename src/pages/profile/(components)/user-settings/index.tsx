import { useRouter } from 'next/router';

import { ROUTES } from '@/constants/router';

import s from './style.module.scss';

function UserSettings() {
  // TODO: 버튼 액션
  const router = useRouter();

  // const { mutate: logout } = useLogout();
  const logout = () => {
    localStorage.clear();
    void router.push(ROUTES.base);
  };

  return (
    <div className={s.settingContainer}>
      <button type="button">고객센터</button>
      <button type="button" onClick={logout}>
        로그아웃
      </button>
      <button type="button">회원탈퇴</button>
    </div>
  );
}

export default UserSettings;
