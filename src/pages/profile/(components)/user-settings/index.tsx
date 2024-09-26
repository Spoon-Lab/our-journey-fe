import useLogout from '@/hooks/auth/use-logout';

import s from './style.module.scss';

function UserSettings() {
  // TODO: 버튼 액션

  const { mutate: logout } = useLogout();

  return (
    <div className={s.settingContainer}>
      <button type="button">고객센터</button>
      <button type="button" onClick={() => logout()}>
        로그아웃
      </button>
      <button type="button">회원탈퇴</button>
    </div>
  );
}

export default UserSettings;
