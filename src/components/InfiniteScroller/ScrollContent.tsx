import { FC, useEffect, useRef } from 'react';
import { useInView } from 'react-hook-inview';
import { SnapVideo } from './SnapVideo.tsx';

export interface Video {
  index: number;
}

export interface ScrollContentProps {
  content: Video[];
  onVideoVisible?: (id: number) => void;
  onLoadNewVideos?: () => Promise<void>;
  frameworkOnly?: boolean;
  currentVideoIndex: number;
}

const ScrollContent: FC<ScrollContentProps> = (props) => {
  const [loaderRef, loaderInView] = useInView({ threshold: 1 });
  const [loaderRef2, loaderInView2] = useInView({ threshold: 1 });
  const isLoading = useRef<boolean>(false);

  useEffect(() => {
    if (!loaderInView) return;
    if (isLoading.current) return;
    if (!props.onLoadNewVideos) return;
    console.log('load new videos');
    void props.onLoadNewVideos().then(() => {
      isLoading.current = false;
    });
  }, [loaderInView, props]);

  useEffect(() => {
    if (!loaderInView2) return;
    if (isLoading.current) return;
    if (!props.onLoadNewVideos) return;
    console.log('load new videos 2');
    void props.onLoadNewVideos().then(() => {
      isLoading.current = false;
    });
  }, [loaderInView2, props]);

  return (
    <div className="relative flex w-full flex-col gap-[40px] bg-black">
      {props.content.map((video) => {
        return (
          <div key={video.index} className="h-[calc(100dvh-56px)] w-full sm:h-[calc(100dvh)]">
            <SnapVideo
              onContentVisible={() => {
                props.onVideoVisible?.(video.index);
              }}
              onContentInvisible={() => {
                // props.onVideoInvisible?.(video.index);
              }}
              id={video.index}
              title={'Video ' + video.index.toString()}
              className="bg-gray-700 text-white"
              frameworkOnly={video.index > props.currentVideoIndex + 3 || video.index < props.currentVideoIndex - 2}
            ></SnapVideo>
          </div>
        );
      })}
      <div ref={loaderRef} className="absolute bottom-[calc(330dvh+120px)] w-full text-center text-4xl text-red-400">
        Loader 1
      </div>
      <div ref={loaderRef2} className="absolute bottom-[80px] w-full text-center text-4xl text-red-400">
        Loader 2
      </div>
    </div>
  );
};

export { ScrollContent };
