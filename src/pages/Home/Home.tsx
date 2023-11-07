import { FC } from 'react';
import styled from 'styled-components';
import { InfiniteVideoScroller } from '../../components/InfiniteVideoScroller/InfiniteVideoScroller.tsx';
import { CommentOverlay } from './CommentOverlay.tsx';

export const Home: FC = () => {
  return (
    <StyledPageContainer>
      <InfiniteVideoScroller className="w-full"></InfiniteVideoScroller>
      <StyledCommentOverlay></StyledCommentOverlay>
    </StyledPageContainer>
  );
};

export const Gaming: FC = () => {
  return (
    <StyledPageContainer>
      <InfiniteVideoScroller tag="游戏" className="w-full"></InfiniteVideoScroller>
      <StyledCommentOverlay></StyledCommentOverlay>
    </StyledPageContainer>
  );
};

export const Anime: FC = () => {
  return (
    <StyledPageContainer>
      <InfiniteVideoScroller tag="二次元" className="w-full"></InfiniteVideoScroller>
      <StyledCommentOverlay></StyledCommentOverlay>
    </StyledPageContainer>
  );
};

export const Music: FC = () => {
  return (
    <StyledPageContainer>
      <InfiniteVideoScroller tag="音乐" className="w-full"></InfiniteVideoScroller>
      <StyledCommentOverlay></StyledCommentOverlay>
    </StyledPageContainer>
  );
};

export const Food: FC = () => {
  return (
    <StyledPageContainer>
      <InfiniteVideoScroller tag="美食" className="w-full"></InfiniteVideoScroller>
      <StyledCommentOverlay></StyledCommentOverlay>
    </StyledPageContainer>
  );
};

export const Fasion: FC = () => {
  return (
    <StyledPageContainer>
      <InfiniteVideoScroller tag="时尚" className="w-full"></InfiniteVideoScroller>
      <StyledCommentOverlay></StyledCommentOverlay>
    </StyledPageContainer>
  );
};

export const Life: FC = () => {
  return (
    <StyledPageContainer>
      <InfiniteVideoScroller tag="生活" className="w-full"></InfiniteVideoScroller>
      <StyledCommentOverlay></StyledCommentOverlay>
    </StyledPageContainer>
  );
};

const StyledPageContainer = styled.div`
  transition: padding-inline-end 0.3s cubic-bezier(0, 0.5, 0.2, 1);
  padding-inline-end: 0;
  @media (min-width: 1060px) {
    padding-inline-end: calc(100vw - 660px);
  }
  @media (min-width: 1260px) {
    padding-inline-end: 600px;
  }
`;

const StyledCommentOverlay = styled(CommentOverlay)`
  transition:
    right 0.3s cubic-bezier(0, 0.5, 0.2, 1),
    width 0.3s cubic-bezier(0, 0.5, 0.2, 1);
  margin-right: -400px;
  width: 400px;
  @media (min-width: 1060px) {
    margin-right: 0;
    width: calc(100vw - 660px);
  }
  @media (min-width: 1260px) {
    width: 600px;
  }
`;
