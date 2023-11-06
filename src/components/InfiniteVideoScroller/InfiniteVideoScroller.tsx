import { useInfiniteQuery } from '@tanstack/react-query';
import { CSSProperties, FC, useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-hook-inview';
import { IoChevronDownSharp, IoChevronUpSharp } from 'react-icons/io5';
import { usePrevious } from 'react-use';
import styled from 'styled-components';
import { getNewVideoFeed } from '../../api/videFeed.ts';
import { useOnGlobalKeyDown } from '../../hooks/useOnGlobalKeyDown.ts';
import { SnapVideo, SnapVideoProps } from './SnapVideo.tsx';

const InfiniteVideoScroller: FC<{ className?: string; styles?: CSSProperties }> = (props) => {
  const [visibleVideoIndex] = useState<number>(0);

  const { data, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['video-feed'],
    queryFn: async () => {
      const newData = await getNewVideoFeed();
      console.log(newData);
      return newData;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  const flatData = useMemo(() => data?.pages.flat().flat() ?? [], [data]);
  const transformedData: (SnapVideoProps & { uniqueDataId: string })[] = useMemo(
    () =>
      flatData.map((video) => ({
        videoId: video.video_id,
        videoPlaybackUrl: video.play_url,
        videoTitle: video.title,
        videoCoverUrl: video.cover_url,
        uniqueDataId: video.uniqueDataId,
      })),
    [flatData]
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollToPrev = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollTo({
      top: scrollContainerRef.current.scrollTop - (window.innerHeight * 1.3 + 40),
      behavior: 'smooth',
    });
  };
  const scrollToNext = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollTo({
      top: scrollContainerRef.current.scrollTop + (window.innerHeight * 1.3 + 40),
      behavior: 'smooth',
    });
  };

  // const addTask = useRunOnScrollEnd(scrollContainerRef);

  // keyboard listener
  useOnGlobalKeyDown((e) => {
    console.log(e);
    if (!scrollContainerRef.current) return;
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
    e.key === 'ArrowUp' ? scrollToPrev() : scrollToNext();
  });

  return (
    <div className={props.className + ' ' + 'h-[100dvh] pb-[56px] sm:pb-0'} style={props.styles}>
      <div className="relative h-full w-full">
        <div
          className="h-full w-full snap-y snap-mandatory overflow-scroll bg-black scrollbar-hide"
          ref={scrollContainerRef}
        >
          <div className="relative flex w-full flex-col items-center gap-[40px]">
            {transformedData.map((video, index) => (
              <div className="h-[100dvh] w-full" key={index}>
                <SnapVideo
                  // unloaded={Math.abs(index - visibleVideoIndex) > 2}
                  onContentVisible={(dataId) => {
                    const index = transformedData.findIndex((video) => video.uniqueDataId === dataId);
                    if (index === -1) return;
                    if (index === visibleVideoIndex) return;
                    // addTask(() => {
                    //   setVisibleVideoIndex(index);
                    // });
                    console.log('visible', index);
                  }}
                  {...video}
                ></SnapVideo>
              </div>
            ))}
            <Loaders
              onEnterView={() => {
                if (!isFetching) {
                  console.log('start loading new video');
                  void fetchNextPage().then(() => {
                    console.log('finish loading new video');
                  });
                }
              }}
            ></Loaders>
          </div>
        </div>
        {/* <div className="absolute left-0 top-0 break-all font-mono text-xs text-white">
          {JSON.stringify(transformedData.map((data) => data.videoId))}
          <br></br>
          {JSON.stringify(transformedData.map((data) => data.videoTitle))}
        </div> */}
        <VideoNavControl scrollToNext={scrollToNext} scrollToPrev={scrollToPrev}></VideoNavControl>
      </div>
    </div>
  );
};

export { InfiniteVideoScroller };

const Loaders: FC<{ onEnterView?: () => void }> = (props) => {
  const [inView1, setInView1] = useState(false);
  const [inView2, setInView2] = useState(false);
  const [inView3, setInView3] = useState(false);

  const previousInView = usePrevious(inView1 || inView2 || inView3);

  useEffect(() => {
    if (previousInView === false && (inView1 || inView2 || inView3)) {
      props.onEnterView?.();
    }
  }, [inView1, inView2, inView3, previousInView, props]);

  return (
    <>
      <Loader
        className="absolute bottom-[20dvh] bg-red-400"
        onEnterView={() => {
          setInView1(true);
        }}
        onLeaveView={() => {
          setInView1(false);
        }}
      />
      <Loader
        className="absolute bottom-[calc(120dvh+40px)] bg-red-400"
        onEnterView={() => {
          setInView2(true);
        }}
        onLeaveView={() => {
          setInView2(false);
        }}
      />
      <Loader
        className="absolute bottom-[calc(220dvh+80px)] bg-red-400"
        onEnterView={() => {
          setInView3(true);
        }}
        onLeaveView={() => {
          setInView3(false);
        }}
      />
    </>
  );
};

const Loader: FC<{ onEnterView?: () => void; onLeaveView?: () => void; className?: string }> = (props) => {
  const [ref, isVisible] = useInView();
  useEffect(() => {
    if (isVisible) {
      props.onEnterView?.();
    } else {
      props.onLeaveView?.();
    }
  }, [isVisible, props]);
  return <div ref={ref} className={`h-20 w-20 rounded-full ${props.className}`}></div>;
};

const VideoNavControl: FC<{
  scrollToPrev?: () => void;
  scrollToNext?: () => void;
}> = (props) => {
  return (
    <div className="absolute bottom-0 right-0 z-30 mb-4 me-4 hidden flex-col gap-4 sm:flex">
      <VideoNavButton onClick={props.scrollToPrev}>
        <div className="mb-1 text-black">
          <IoChevronUpSharp size={32}></IoChevronUpSharp>
        </div>
      </VideoNavButton>
      <VideoNavButton onClick={props.scrollToNext}>
        <div className="-mb-1 text-black">
          <IoChevronDownSharp size={32}></IoChevronDownSharp>
        </div>
      </VideoNavButton>
    </div>
  );
};

const VideoNavButton = styled.button`
  --bg-opacity: 0.3;
  display: flex;
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, var(--bg-opacity));
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0, 1, 0.5, 1);
  &:hover {
    --bg-opacity: 0.6;
  }
  &:active {
    --bg-opacity: 0.2;
  }
`;
