import { FC, ReactNode } from 'react';
import { BiVideoPlus } from 'react-icons/bi';
import { useAlwaysUseDarkTabbar } from './useIsAlwaysDarkTabbar.ts';

const TabBarIcon: FC<{
  icon?: ReactNode;
  label?: string;
  align?: 'vertical' | 'horizontal';
}> = (props) => {
  const alwaysDark = useAlwaysUseDarkTabbar();
  return (
    <div
      className={
        'flex items-center gap-[0px] text-pink-700 dark:text-pink-200' +
        ' ' +
        (props.align === 'horizontal' ? 'h-[60px] flex-row' : 'w-[60px] flex-col') +
        ' ' +
        (alwaysDark && '!text-pink-200')
      }
    >
      {props.icon}
      <div className="break-all text-center text-sm">{props.label}</div>
    </div>
  );
};

const NewVideoIconMobile: FC = () => {
  return (
    <div className={'flex flex-col items-center'}>
      <div className="rounded-md bg-pink-600 px-[10px] py-[2px] text-white">
        <BiVideoPlus size={32}></BiVideoPlus>
      </div>
      {/* <div className="-mt-[2px] whitespace-nowrap text-[50%] text-xs text-white">New Snap</div> */}
    </div>
  );
};

const NewVideoIconDesktop: FC = () => {
  return (
    <div className={'flex flex-col items-center justify-center'}>
      <div className="flex h-[56px] w-[56px] flex-col items-center justify-center rounded-full bg-pink-600 text-white">
        <BiVideoPlus size={32}></BiVideoPlus>
        <div className="-mt-[4px] text-xs">Upload</div>
      </div>
    </div>
  );
};

export { NewVideoIconDesktop, NewVideoIconMobile, TabBarIcon };
