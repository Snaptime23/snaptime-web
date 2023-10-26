import { FC } from 'react';

const InfiniteScroller: FC = () => {
  return (
    <div>
      {Array.from({ length: 100 }).map((_, index) => {
        return (
          <p key={index} className="max-w-xl p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolorum accusantium cum consequuntur quis
            ipsa sed adipisci repellat, fugit autem accusamus in? Tenetur similique aliquid nihil sint ex fugit earum.
          </p>
        );
      })}
    </div>
  );
};

export { InfiniteScroller };
