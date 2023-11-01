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
      'transition-all'
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

export { Message };
