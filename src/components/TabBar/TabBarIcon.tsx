import { FC, ReactNode } from 'react';

const TabBarIcon: FC<{
  icon?: ReactNode;
  label?: string;
  align?: 'vertical' | 'horizontal';
}> = (props) => {
  return (
    <div
      className={
        'flex items-center gap-1' + ' ' + (props.align === 'horizontal' ? 'h-[60px] flex-row' : 'w-[60px] flex-col')
      }
    >
      {props.icon}
      <div className="break-all text-center text-sm">{props.label}</div>
    </div>
  );
};

export { TabBarIcon };
