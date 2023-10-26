import { faker } from '@faker-js/faker';
import { FC } from 'react';

const FakeContent: FC = () => {
  return <img src={faker.image.url()}></img>;
};

export { FakeContent };
