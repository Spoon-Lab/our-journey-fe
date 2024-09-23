import { useRouter } from 'next/router';

import s from './style.module.scss';

export default function InviteCoWorkers() {
  const router = useRouter();

  return <div className={s.inviteCoWorkersPage} />;
}
