import { useState } from 'react';
import { useRouter } from 'next/router';

import Header from '@/components/header';

import s from './style.module.scss';

export default function InviteCoWorkers() {
  const router = useRouter();
 

  return <div className={s.inviteCoWorkersPage} />;
}
