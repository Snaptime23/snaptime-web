import { faker } from '@faker-js/faker';
import { FC } from 'react';

const FakeContent: FC = () => {
  return (
    <div className="w-full">
      {Array.from({ length: 10 }).map((_, index) => {
        return <img className="h-[100dvh] w-full object-cover" src={faker.image.url()} key={index}></img>;
      })}
    </div>
  );
};

export { FakeContent };
