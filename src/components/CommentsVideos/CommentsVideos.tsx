import { FC, forwardRef, useEffect, useState } from 'react';
import { useInView } from 'react-hook-inview';
import { IoChevronDown, IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import { baseUrl } from '../../api/config.ts';
import { listVideoComments } from '../../api/listComments.ts';
import { VideoList } from '../../components/VideoList/VideoList.tsx';
import { useIsMobile } from '../../hooks/useIsMobile.ts';
import styles from '../../pages/Home/CommentOverlay.module.scss';
import { useListenEvent } from '../../store/emitter/emitter.ts';
import { useSelectAuthState } from '../../store/index.ts';
import { Message, parseNumber, parseTime } from '../../utils/common.ts';

interface CommentType {
  id: string;
  avatarUrl: string;
  username: string;
  nickname: string;
  content: string;
  likeCount: string | number;
  date: string;
  replyCount: number;
  hasLike: number;
}
interface Reply {
  id: string;
  avatarUrl: string;
  username: string;
  nickname: string;
  content: string;
  likeCount: string | number;
  date: string;
  hasLike: number;
}

const CommentVideos: FC<{
  isCommentHandel?: (isComment: boolean) => void;
}> = ({ isCommentHandel }) => {
  const [userId, setUserId] = useState<string>('');
  let myVideoId = '';
  const [videoId, setVideoId] = useState('');
  useListenEvent('activeVideoChange', (data) => {
    console.log('@@@@@@@@@@@@@', data);
    if ('videoId' in data) {
      myVideoId = data.videoId;
      setVideoId(data.videoId);
      getComments();
      setUserId(data.userId);
    }
  });
  const isMobile = useIsMobile();
  let nextPageToken = '';
  const [kind, setKind] = useState('comments');
  const [commentSkeleton] = useInView({
    threshold: 0,
    onEnter: () => {
      getComments();
    },
  });
  const getComments = () => {
    listVideoComments(myVideoId, nextPageToken, '')
      .then((res) => {
        setHasNextPage(res.result.has_next > 0 ? true : false);
        nextPageToken = res.result.next_page_token;
        // 解析字段
        if (res.result.comment_info) {
          const comments = res.result.comment_info.map((comment) => {
            return {
              id: comment.comment_id,
              avatarUrl: comment.user.avatar,
              username: comment.user.user_name,
              nickname: comment.user.user_name,
              content: comment.content,
              likeCount: parseNumber(comment.user.like_num),
              date: parseTime(comment.publish_date * 1000),
              replyCount: comment.replies,
              hasLike: res.result.has_like,
            };
          });
          setComments((pre) => {
            if (pre) {
              return [...pre, ...comments];
            } else {
              return comments;
            }
          });
        } else {
          setComments([]);
        }
      })
      .catch(() => {
        setHasNextPage(false);
      });
  };
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  useEffect(() => {
    setHasNextPage(true);
  }, [isMobile]);
  const [lineClassName, setLineClassName] = useState(
    'relative left-[8%] mr-0 h-[3px] w-[42%] bg-black transition-all duration-300'
  );
  const chooseKind = (kind: string) => {
    return () => {
      if (kind === 'videos') {
        setLineClassName('relative left-[50%] mr-0 h-[3px] w-[42%] bg-black transition-all duration-300');
        setKind('videos');
      } else {
        setLineClassName('relative left-[8%] mr-0 h-[3px] w-[42%] bg-black transition-all duration-300');
        setKind('comments');
      }
    };
  };
  return (
    <>
      {!isMobile ? (
        <div className="sticky top-0 z-10 ml-0 mr-0 mt-[20px] select-none bg-white">
          <div className="flex flex-row">
            <div className="flex w-[50%] flex-col items-end text-lg font-bold text-black">
              <div
                className="flex w-[85%] cursor-pointer flex-col items-center justify-center py-2"
                onClick={chooseKind('comments')}
              >
                <span>Comments</span>
              </div>
            </div>
            <div className="flex w-[50%] flex-col text-lg font-bold text-black">
              <div
                className="flex w-[85%] cursor-pointer flex-col items-center justify-center py-2"
                onClick={chooseKind('videos')}
              >
                <span>Creator Videos</span>
              </div>
            </div>
          </div>
          <div className={lineClassName}></div>
          <div className="h-[2px] w-full bg-slate-300"></div>
          <div></div>
        </div>
      ) : null}
      <div
        className={`flex flex-col gap-[16px] rounded-tl-2xl rounded-tr-2xl bg-white pb-[40px] pl-[26px] pr-[32px] pt-[20px] text-black ${
          isMobile ? 'pb-[56px]' : ''
        }`}
      >
        {kind === 'comments' ? (
          <>
            {comments
              ? comments.map((comment) => {
                  return (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      videoId={videoId}
                      isCommentHandel={isCommentHandel}
                    ></Comment>
                  );
                })
              : null}
            {hasNextPage ? (
              <CommentSkeleton ref={commentSkeleton} type={'commnets'}></CommentSkeleton>
            ) : (
              <div
                className={`mt-[20px] flex items-center justify-center text-sm opacity-50 ${
                  isMobile ? 'pb-[100px]' : ''
                } `}
              >
                没有更多了
              </div>
            )}
          </>
        ) : (
          <VideoList userId={userId} compact></VideoList>
        )}
      </div>
    </>
  );
};

const Comment: FC<{ comment: CommentType; isCommentHandel?: (isComment: boolean) => void; videoId: string }> = ({
  comment,
  isCommentHandel,
  videoId,
}) => {
  let nextPageToken = '';
  const [replies, setReplies] = useState<Reply[]>([]);
  const [showCommentSkeleton, setShowCommentSkeleton] = useState(false);
  const [isLike, setIsLike] = useState(comment.hasLike ? true : false);
  const [likeCount, setLikeCount] = useState(comment.likeCount);
  const authState = useSelectAuthState();
  const [commentSkeleton] = useInView({
    threshold: 0,
    onEnter: () => {
      listVideoComments(videoId, nextPageToken, comment.id)
        .then((res) => {
          if (res.code !== 200) {
            throw new Error('get replies failed');
          } else {
            nextPageToken = res.result.next_page_token;
            // 解析字段
            if (res.result.comment_info) {
              const comments = res.result.comment_info.map((comment) => {
                return {
                  id: comment.comment_id,
                  avatarUrl: comment.user.avatar,
                  username: comment.user.user_name,
                  nickname: comment.user.user_name,
                  content: comment.content,
                  likeCount: parseNumber(comment.user.like_num),
                  date: parseTime(comment.publish_date * 1000),
                  replyCount: comment.replies,
                  hasLike: res.result.has_like,
                };
              });
              setReplies((pre) => {
                if (pre.length > 0) {
                  return [...pre, ...comments];
                } else {
                  return comments;
                }
              });
              setShowCommentSkeleton(false);
            } else {
              setShowCommentSkeleton(false);
              setReplies([]);
            }
          }
        })
        .catch(() => {
          return;
        });
    },
  });
  // const [replySkeleton
  const getReplies = () => {
    setShowCommentSkeleton(true);
  };
  const likeComment = () => {
    fetch(baseUrl + '/api/comment/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authState.authKey && {
          Authorization: `Bearer ${authState.authKey}`,
        }),
      },
      body: JSON.stringify({
        comment_id: comment.id,
        action_type: isLike ? 1 : 0,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          setIsLike(true);
          setLikeCount((pre) => {
            if (typeof pre === 'number') {
              return pre + 1;
            } else {
              return pre;
            }
          });
        } else {
          throw new Error('like failed');
        }
      })
      .catch((e) => {
        if (e instanceof Error) {
          Message({ message: e.message, duration: 2000 }).catch(() => {
            return;
          });
        }
      });
  };

  const createComment = () => {
    isCommentHandel && isCommentHandel(true);
  };
  return (
    <div key={comment.username} className="flex flex-row gap-3">
      <img src="/mock/avatar.png" className="relative top-[2px] h-12 w-12 rounded-full object-cover"></img>
      <div className="flex w-full select-text flex-col text-ellipsis whitespace-nowrap">
        <a className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold text-black hover:text-black hover:underline">
          {comment.nickname}
        </a>
        <div className="flex select-text flex-row items-center justify-between gap-3 whitespace-pre-wrap break-words text-black">
          <span className="w-[calc(100%-20px)]">{comment.content}</span>
          <button className="flex w-[30px] flex-col items-center gap-1" onClick={likeComment}>
            {isLike ? (
              <IoHeartSharp className="relative top-[2px]" size={20} color={'#FF0033'}></IoHeartSharp>
            ) : (
              <IoHeartOutline className="relative top-[2px]" size={20} color=""></IoHeartOutline>
            )}
            <div className="whitespace-nowrap text-sm">{likeCount}</div>
          </button>
        </div>
        <div className="text-sm font-medium text-black/[.3]">
          <span>{comment.date}</span>
          <button className="ml-[16px] select-none bg-transparent" onClick={createComment}>
            Reply
          </button>
        </div>
        <div className="flex flex-col gap-[16px] py-[16px]">
          {replies.map((reply) => {
            return <CommentReply key={reply.id} reply={reply}></CommentReply>;
          })}
          {showCommentSkeleton && <CommentSkeleton ref={commentSkeleton} type={'replies'}></CommentSkeleton>}
        </div>
        {comment.replyCount > 0 && replies.length < comment.replyCount && !showCommentSkeleton && (
          <div className="flex select-none flex-row items-center font-medium text-black/[.3]">
            <div className="relative top-[2px] mr-2 h-[2px] w-16 bg-black/[.3]"></div>
            <button className="contents" onClick={getReplies}>
              <div>View {comment.replyCount - replies.length} more replies</div>
              <IoChevronDown className="relative top-[2px] ml-1" size={20}></IoChevronDown>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const CommentReply: FC<{ reply: Reply }> = ({ reply }) => {
  const [isLike, setIsLike] = useState(reply.hasLike ? true : false);
  const [likeCount, setLikeCount] = useState(reply.likeCount);
  const authState = useSelectAuthState();

  const likeComment = () => {
    fetch('https://service-m973oigf-1253954317.sh.apigw.tencentcs.com/release/api/comment/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authState.authKey && {
          Authorization: `Bearer ${authState.authKey}`,
        }),
      },
      body: JSON.stringify({
        comment_id: reply.id,
        action_type: isLike ? 1 : 0,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          setIsLike(true);
          setLikeCount((pre) => {
            if (typeof pre === 'number') {
              return pre + 1;
            } else {
              return pre;
            }
          });
        } else {
          throw new Error('like failed');
        }
      })
      .catch((e) => {
        if (e instanceof Error) {
          Message({ message: e.message, duration: 2000 }).catch(() => {
            return;
          });
        }
      });
  };
  return (
    <div key={reply.username} className="ml-[-30px] flex flex-row gap-3">
      <img src="/mock/avatar.png" className="relative top-[2px] h-12 w-12 rounded-full object-cover"></img>
      <div className="flex w-full select-text flex-col text-ellipsis whitespace-nowrap ">
        <a className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold text-black hover:text-black hover:underline">
          {reply.nickname}
        </a>
        <div className="flex select-text flex-row items-center justify-between gap-3 whitespace-pre-wrap break-words text-black">
          <span className="w-[calc(100%-30px)]">{reply.content}</span>
          <button className="flex w-[30px] flex-col items-center gap-1" onClick={likeComment}>
            {isLike ? (
              <IoHeartSharp className="relative top-[2px]" size={20} color={'#FF0033'}></IoHeartSharp>
            ) : (
              <IoHeartOutline className="relative top-[2px]" size={20} color=""></IoHeartOutline>
            )}
            <div className="text-sm">{likeCount}</div>
          </button>
        </div>
        <div className="text-sm font-medium text-black/[.3]">
          <span>{reply.date}</span>
        </div>
      </div>
    </div>
  );
};

const CommentSkeleton = forwardRef<HTMLDivElement, { type: string }>(function CommentSkeleton(props, ref) {
  return (
    <div
      ref={ref}
      className={props.type == 'replies' ? 'ml-[-30px] flex flex-row gap-3' : 'mb-[20px] flex flex-row gap-3'}
    >
      <div className={`${styles.skeleton} h-12 w-12 rounded-full bg-slate-200/[0.8]`}></div>
      <div className="flex flex-1 flex-col">
        <div className={`${styles.skeleton} mb-[10px] h-[28px] w-full rounded-lg bg-slate-200/[0.8]`}></div>
        <div className={`${styles.skeleton} mb-[10px] h-[58px] w-full rounded-lg bg-slate-200/[0.8]`}></div>
        <div className={`${styles.skeleton} mb-[10px] h-[15px] w-full rounded-lg bg-slate-200/[0.8]`}></div>
      </div>
    </div>
  );
});

export { CommentVideos };
