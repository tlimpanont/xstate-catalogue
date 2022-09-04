import { FC } from 'react';

export type SimpleCardProps = {
  title?: string;
  content?: string;
  subtitle?: string;
};

export const SimpleCard: FC<SimpleCardProps> = ({
  title,
  content,
  subtitle = '(you have to add the numbers together)',
  ...rest
}) => {
  return (
    <div
      {...rest}
      className="w-full flex justify-center items-center px-6 text-center"
    >
      <div className="gap-4 max-w-xs h-auto flex flex-col justify-between bg-white dark:bg-gray-800 rounded-lg border border-gray-400  py-5 px-4">
        <h4
          tabIndex={0}
          className="focus:outline-none text-gray-800 dark:text-gray-100 text-2xl"
        >
          {title}
        </h4>
        <p
          tabIndex={0}
          className="focus:outline-none text-gray-800 dark:text-gray-100 text-9xl font-bold"
        >
          {content}
        </p>
        <p
          tabIndex={0}
          className="focus:outline-none text-sm dark:text-gray-100"
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
};
