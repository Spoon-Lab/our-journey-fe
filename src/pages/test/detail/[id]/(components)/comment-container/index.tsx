import { AnimatePresence, motion } from 'framer-motion';

import s from './style.module.scss';

export default function CommentsContainer({ isVisible }: { isVisible: boolean }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={s.wrap}
          style={{
            width: 600,
            height: '100vh',
            backgroundColor: 'white',
            position: 'fixed',
            bottom: 0,
            right: 0,
          }}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          asd
        </motion.div>
      )}
    </AnimatePresence>
  );
}
