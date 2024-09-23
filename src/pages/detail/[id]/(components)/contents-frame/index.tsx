import { useState } from 'react';

import BtnFrame from '../btn-frame';
import WrapTags from '../wrap-tags';

import s from './style.module.scss';

import { FavoriteIconFilled, FavoriteIconNoFill, LocationIcon, MessageIcon, ShareIcon } from '@/assets/icons';

interface ContentsFrameProps {
  comments: number;
  initialLiked: boolean;
  likes: number;
  period: string;
  postContent: string;
  tags: string[];
}

export default function ContentsFrame({ comments, initialLiked, likes, period, tags, postContent }: ContentsFrameProps) {
  const [isLiked, setLiked] = useState<boolean>(initialLiked);

  return (
    <div className={s.contentsFrame}>
      <div className={s.period}>
        <LocationIcon alt="location-icon" width={16} height={16} />
        <span>{period}</span>
      </div>
      <p className={s.postContent}>{postContent}</p>
      <WrapTags tags={tags} />
      <div className={s.postActions}>
        <div className={s.wrapActions}>
          <BtnFrame
            onClick={() => {
              setLiked((prev) => !prev);
              console.log('clicked favorite button!');
            }}
          >
            {isLiked ? <FavoriteIconFilled alt="favorite-icon" width={18} height={18} /> : <FavoriteIconNoFill alt="favorite-icon" width={18} height={18} />}
          </BtnFrame>
          <BtnFrame
            onClick={() => {
              console.log('clicked comments button!');
            }}
          >
            <MessageIcon alt="comments-icon" width={18} height={18} />
          </BtnFrame>
          <BtnFrame
            onClick={() => {
              console.log('clicked share button!');
            }}
          >
            <ShareIcon alt="share-icon" width={18} height={18} />
          </BtnFrame>
        </div>
        <div className={s.wrapActionCounts}>
          <span>좋아요 {likes}</span>
          <span>댓글 {comments}</span>
        </div>
      </div>
    </div>
  );
}
