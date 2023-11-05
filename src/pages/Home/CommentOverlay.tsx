import { CSSProperties, FC, forwardRef, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-hook-inview';
import {
  IoChevronDown,
  IoHeartOutline,
  IoHeartSharp,
  IoMusicalNotesOutline,
  IoShareSocialSharp,
  IoStar,
  IoStarOutline,
} from 'react-icons/io5';
import { Message, parseNumber, parseTime } from '../../utils/common.ts';
import styles from './CommentOverlay.module.scss';

// 评论区域最小宽度 400px, 最大宽度 600px
// viewport 小于 sm 时评论区隐藏, 大于 lg 时评论区宽度固定
// 在 sm 和 lg 之间时视频宽度固定, 评论区大小变化
const CommentOverlay: FC<{ style?: CSSProperties; className?: string }> = (props) => {
  return (
    <div
      style={{
        ...props.style,
      }}
      className={`${styles['comment-overlay-container']} ${props.className}`}
    >
      <div
        style={{
          ...props.style,
        }}
        className={`${styles['comment-overlay']} ${props.className}`}
      >
        <VideoInfo></VideoInfo>
        <Operation></Operation>x``
        <CommentVideos></CommentVideos>
      </div>
      <WriteComment></WriteComment>
    </div>
  );
};

const VideoInfo: FC = () => {
  // 为了检查是否出现省略号获取的父容器节点
  const titleLabelContainer = useRef<HTMLDivElement>(null);
  // 展开更多按钮的显示状态
  const [isOverflowed, setIsOverflowed] = useState(false);
  // 收起更多按钮的显示状态
  const [isShowMoreLabel, setIsShowMoreLabel] = useState(false);
  // 父容器类名
  const [showMoreParentClassName, setshowMoreParentClassName] = useState(
    'w-[76%] overflow-hidden text-ellipsis whitespace-nowrap'
  );
  const [videoLabel] = useState(['Game', 'Music', 'Video', 'Web', 'Golang', 'Qiniu', '七牛云', '犇犇牛科技']);
  useEffect(() => {
    const handleResize = () => {
      if (titleLabelContainer.current) {
        const isContentOverflowed = titleLabelContainer.current.clientWidth < titleLabelContainer.current.scrollWidth;
        setIsOverflowed(isContentOverflowed);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [titleLabelContainer]);
  const showMoreLabel = () => {
    setshowMoreParentClassName('w-[76%] whitespace-pre-wrap break-words');
    setIsOverflowed(false);
    setIsShowMoreLabel(true);
  };
  const showLessLabel = () => {
    setshowMoreParentClassName('w-[76%] overflow-hidden text-ellipsis whitespace-nowrap');
    setIsOverflowed(true);
    setIsShowMoreLabel(false);
  };
  return (
    <div className="ml-[18px] mr-[18px] mt-[10px] flex select-none flex-col gap-3 rounded-2xl bg-slate-200/[0.5] p-4">
      <div className="flex w-full flex-row items-center">
        <div className="flex min-w-0 flex-1 flex-row items-center justify-start gap-3">
          <img src="/mock/avatar.png" className="h-12 w-12 rounded-full object-cover"></img>
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="cursor-pointer select-text overflow-hidden text-ellipsis whitespace-nowrap break-all text-lg font-semibold text-black hover:text-black hover:underline">
              Lorem ipsum dolor sit, amet consectetur
            </div>
            <span className="-mt-[2px] select-text overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black">
              非常非常非常非常長的個人介紹
            </span>
          </div>
        </div>
        <button className="rounded-xl bg-pink-600 px-4 py-[5px] text-lg font-medium text-white">Follow</button>
      </div>
      <div className="relative flex flex-col gap-2 px-[4px] pl-[4px] text-black">
        <div ref={titleLabelContainer} className={showMoreParentClassName}>
          <span className="mr-[5px] font-semibold">123</span>
          {videoLabel.map((label, index) => {
            return (
              <a key={index} className="mr-[6px] cursor-pointer whitespace-nowrap break-words hover:underline">
                {'#' + label}
              </a>
            );
          })}
          {isOverflowed && (
            <button
              className="rounded-2x absolute right-0 top-[-3px] bg-slate-100/[0.5] font-medium"
              onClick={showMoreLabel}
            >
              More
            </button>
          )}
        </div>
        {
          // 如果有展开按钮，则显示展开按钮
          isShowMoreLabel && (
            <div className="mt-[-10px]">
              <button className="rounded-2x bg-slate-100/[0.5] font-medium" onClick={showLessLabel}>
                Less
              </button>
            </div>
          )
        }
        <div className="flex flex-row items-center">
          <IoMusicalNotesOutline className="relative top-[1px]" size={24}></IoMusicalNotesOutline>
          <a className="ml-2 h-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-black hover:text-black">
            晴天的晴天的晴天 - 周周周周周傑倫
          </a>
        </div>
      </div>
    </div>
  );
};

const Operation: FC = () => {
  const [isLike, setIsLike] = useState(false);
  const [isStar, setIsStar] = useState(false);
  const [localUrl, setLocalUrl] = useState('');
  useEffect(() => {
    // 获取当前teb的地址
    let url = window.location.href;
    setLocalUrl(url);
  }, []);
  const copyLocalurl = () => {
    // 复制当前地址
    try {
      navigator.clipboard.writeText(localUrl).catch((e) => {
        console.log(e);
      });
      Message({ message: 'copy success', duration: 2000 }).catch((e) => {
        console.log(e);
      });
    } catch (e) {
      if (e instanceof Error) {
        Message({ message: e.message, duration: 2000 }).catch((e) => {
          console.log(e);
        });
      }
    }
  };
  return (
    <>
      <div className="mx-[18px] flex select-none flex-row items-center justify-between gap-6 p-4 text-black">
        <div className="flex flex-row gap-6">
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="rounded-full bg-slate-200/[0.5] p-[6px]">
              {
                // 如果已经点赞，则显示实心的心
                isLike ? (
                  <IoHeartSharp
                    className="cursor-pointer"
                    size={24}
                    color={'#FF0033'}
                    onClick={() => {
                      setIsLike(!isLike);
                    }}
                  ></IoHeartSharp>
                ) : (
                  <IoHeartOutline
                    className="cursor-pointer"
                    size={24}
                    color={'#000000'}
                    onClick={() => {
                      setIsLike(!isLike);
                    }}
                  ></IoHeartOutline>
                )
              }
            </div>
            <span>123K</span>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="rounded-full bg-slate-200/[0.5] p-[6px]">
              {
                // 如果已经收藏，则显示实心的星星
                isStar ? (
                  <IoStar
                    className="cursor-pointer"
                    size={24}
                    color={'#FFCC33'}
                    onClick={() => {
                      setIsStar(!isStar);
                    }}
                  ></IoStar>
                ) : (
                  <IoStarOutline
                    className="cursor-pointer"
                    size={24}
                    color={'#000000'}
                    onClick={() => {
                      setIsStar(!isStar);
                    }}
                  ></IoStarOutline>
                )
              }
            </div>
            <span>2.2M</span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="rounded-full bg-slate-200/[0.5] p-[6px]">
            <IoShareSocialSharp size={24} color={'#000000'}></IoShareSocialSharp>
          </div>
          <span className="pe-2">Share</span>
        </div>
      </div>
      <div className="mx-[34px] flex items-center justify-between rounded-xl border-[1px] bg-slate-200/[0.5] py-[2px] pl-4 pr-[2px] text-black">
        <div className="my-[4px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-black">
          {localUrl}
        </div>
        <button
          className="h-full rounded-lg bg-slate-100/[0.5] px-4 font-medium transition-colors hover:bg-white active:bg-slate-50"
          onClick={copyLocalurl}
        >
          Copy
        </button>
      </div>
    </>
  );
};

interface CommentType {
  id: string;
  avatarUrl: string;
  username: string;
  nickname: string;
  content: string;
  likeCount: string | number;
  date: string;
  replyCount: number;
}
interface Reply {
  id: string;
  avatarUrl: string;
  username: string;
  nickname: string;
  content: string;
  likeCount: string | number;
  date: string;
}
interface User {
  user_id: string;
  user_name: string;
  follow_count: number;
  follower_count: number;
  is_follow: number;
  avatar: string;
  publish_num: number;
  favourite_num: number;
  like_num: number;
  received_like_num: number;
}

interface Comments {
  comment_id: string;
  user: User;
  video_id: string;
  content: string;
  publish_date: number;
  replies: number;
}

interface ApiResponse {
  code: number;
  message: string;
  result: {
    comment_info: Comments[];
    has_next: number;
    next_page_token: string;
  };
}
const CommentVideos: FC = () => {
  let next_page_token = '';
  const [commentSkeleton] = useInView({
    threshold: 0,
    onEnter: () => {
      fetch(
        `https://service-m973oigf-1253954317.sh.apigw.tencentcs.com/release/api/comment/list?video_id=1234566&token=${next_page_token}`,
        {
          method: 'get',
          headers: {
            Authorization:
              'auth eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZTg2ZWU5ZTItYjgyZC00Y2RlLWIzYjAtNDY0MDdkODMxMmZlIiwidXNlcl9uYW1lIjoiaml5ZW9uIiwiaXNzIjoiUGFyay1KaXllb24iLCJleHAiOjE3MDE2NzQzMjZ9.mlxtva_qdjUWYaXz8lS5Mw4aCgBOyLhTZ7NPsEKdvso',
          },
        }
      )
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((res: ApiResponse) => {
          setHasNextPage(res.result.has_next > 0 ? true : false);
          next_page_token = res.result.next_page_token;
          // 解析字段
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
            };
          });
          setComments((pre) => {
            if (pre) {
              return [...pre, ...comments];
            } else {
              return comments;
            }
          });
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
          setHasNextPage(false);
        });
    },
  });
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  useEffect(() => {
    setHasNextPage(true);
  }, []);
  const [lineClassName, setLineClassName] = useState(
    'relative left-[8%] mr-0 h-[3px] w-[42%] bg-black transition-all duration-300'
  );
  const chooseKind = (kind: string) => {
    return () => {
      if (kind === 'videos') {
        setLineClassName('relative left-[50%] mr-0 h-[3px] w-[42%] bg-black transition-all duration-300');
      } else {
        setLineClassName('relative left-[8%] mr-0 h-[3px] w-[42%] bg-black transition-all duration-300');
      }
    };
  };
  return (
    <>
      <div className="sticky top-0 z-10 ml-0 mr-0 mt-[20px] select-none bg-white">
        <div className="flex flex-row py-2">
          <div className="flex w-[50%] flex-col items-end text-lg font-bold text-black">
            <div
              className="flex w-[85%] cursor-pointer flex-col items-center justify-center"
              onClick={chooseKind('comments')}
            >
              <span>Comments ({6080})</span>
            </div>
          </div>
          <div className="flex w-[50%] flex-col text-lg font-bold text-black">
            <div
              className="flex w-[85%] cursor-pointer flex-col items-center justify-center"
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
      <div className="flex flex-col gap-[16px] bg-white pb-[40px] pl-[26px] pr-[32px] pt-[20px] text-black">
        {comments
          ? comments.map((comment) => {
              return <Comment key={comment.id} comment={comment}></Comment>;
            })
          : null}
        {hasNextPage ? (
          <CommentSkeleton ref={commentSkeleton} type={'commnets'}></CommentSkeleton>
        ) : (
          <div className="mt-[20px] flex items-center justify-center text-xl font-medium">The End</div>
        )}
      </div>
    </>
  );
};

const Comment: FC<{ comment: CommentType }> = ({ comment }) => {
  let next_page_token = '';
  const [replies, setReplies] = useState<Reply[]>([]);
  const [showCommentSkeleton, setShowCommentSkeleton] = useState(false);
  const [commentSkeleton] = useInView({
    threshold: 0,
    onEnter: () => {
      fetch(
        `https://service-m973oigf-1253954317.sh.apigw.tencentcs.com/release/api/comment/list?video_id=1234566&token=${next_page_token}&root_id=${comment.id}`,
        {
          method: 'get',
          headers: {
            Authorization:
              'auth eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZTg2ZWU5ZTItYjgyZC00Y2RlLWIzYjAtNDY0MDdkODMxMmZlIiwidXNlcl9uYW1lIjoiaml5ZW9uIiwiaXNzIjoiUGFyay1KaXllb24iLCJleHAiOjE3MDE2NzQzMjZ9.mlxtva_qdjUWYaXz8lS5Mw4aCgBOyLhTZ7NPsEKdvso',
          },
        }
      )
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((res: ApiResponse) => {
          next_page_token = res.result.next_page_token;
          // 解析字段
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
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });

  // const [replySkeleton
  const getReplies = () => {
    setShowCommentSkeleton(true);
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
          <div className="flex w-[30px] flex-col items-center gap-1">
            <IoHeartOutline className="relative top-[2px]" size={20}></IoHeartOutline>
            <div className="whitespace-nowrap text-sm">{comment.likeCount}</div>
          </div>
        </div>
        <div className="text-sm font-medium text-black/[.3]">
          <span>{comment.date}</span>
          <button className="ml-[16px] select-none bg-transparent">Reply</button>
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
              <div>View {comment.replyCount} more replies</div>
              <IoChevronDown className="relative top-[2px] ml-1" size={20}></IoChevronDown>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const CommentReply: FC<{ reply: Reply }> = ({ reply }) => {
  return (
    <div key={reply.username} className="ml-[-30px] flex flex-row gap-3">
      <img src="/mock/avatar.png" className="relative top-[2px] h-12 w-12 rounded-full object-cover"></img>
      <div className="flex w-full select-text flex-col text-ellipsis whitespace-nowrap ">
        <a className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold text-black hover:text-black hover:underline">
          {reply.nickname}
        </a>
        <div className="flex select-text flex-row items-center justify-between gap-3 whitespace-pre-wrap break-words text-black">
          <span className="w-[calc(100%-30px)]">{reply.content}</span>
          <div className="flex w-[30px] flex-col items-center gap-1">
            <IoHeartOutline className="relative top-[2px]" size={20}></IoHeartOutline>
            <div className="text-sm">{reply.likeCount}</div>
          </div>
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

const WriteComment: FC = () => {
  const [isLogin] = useState(false);
  return (
    <>
      <div className="absolute bottom-0 w-[100%] bg-slate-300/[0.8] p-3">
        <div className="flex items-center justify-center rounded-full bg-white p-2">
          {isLogin ? (
            <>
              <input className="h-[25px] flex-1 bg-white  pl-[10px] text-xl text-black focus:outline-none" />
              <button className="mr-1 h-[35px] w-[80px] rounded-lg bg-pink-600 font-medium text-white">Send</button>
            </>
          ) : (
            <button className="h-[35px] w-full text-xl font-medium text-pink-600">Log in to comment</button>
          )}
        </div>
      </div>
    </>
  );
};

export { CommentOverlay };
