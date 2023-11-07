// Message 方法创造一个顶部显示消息的 DOM 异步实现
interface MessageOptions {
  message: string;
  duration: number;
}
function Message(options: MessageOptions) {
  return new Promise((resolve, reject) => {
    if (!options.message) {
      reject(new Error('message is required'));
    }
    const div = document.createElement('div');
    div.classList.add(
      'fixed',
      'top-[-60px]',
      'left-0',
      'right-0',
      'text-center',
      'text-black',
      'bg-slate-300',
      'p-2',
      'ml-20',
      'mr-20',
      'h-[50px]',
      'flex',
      'justify-center',
      'items-center',
      'text-lg',
      'font-bold',
      'rounded-2xl',
      'opacity-90',
      'transition-all',
      'duration-700'
    );
    div.innerHTML = options.message;
    document.body.appendChild(div);
    setTimeout(() => {
      div.classList.add('top-[20px]');
    }, 0);
    setTimeout(() => {
      div.classList.remove('top-[20px]');
    }, options.duration);
    setTimeout(() => {
      div.remove();
    }, options.duration + 2000);
    resolve(true);
  });
}

// 数字转换工具,使用单位 K， M， B
const parseNumber = (number: number): number | string => {
  if (number < 1000) {
    return number;
  } else if (number < 1000000) {
    return (number / 1000).toFixed(1) + 'K';
  } else if (number < 1000000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else {
    return (number / 1000000000).toFixed(1) + 'B';
  }
};

// 时间转化工具，超出一天显示日期，超出一小时显示几小时前，超出一分钟显示几分钟前，否则显示几秒前
const parseTime = (time: number): string => {
  const now = new Date().getTime();
  const diff = now - time + 2000;
  if (diff > 86400000) {
    return new Date(time).toLocaleDateString();
  } else if (diff > 3600000) {
    return Math.floor(diff / 3600000) + ' hours ago';
  } else if (diff > 60000) {
    return Math.floor(diff / 60000) + ' minutes ago';
  } else {
    return Math.floor(diff / 1000) + ' seconds ago';
  }
};
export { Message, parseNumber, parseTime };
