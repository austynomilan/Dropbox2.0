'use client';

import { COLOR_EXTENSION_MAP } from '@/constants';
import { FileType } from '@/typings';
import { ColumnDef } from '@tanstack/react-table';
import prettyBytes from 'pretty-bytes';
import { FileIcon, defaultStyles } from 'react-file-icon';

// This type is used to define the shape of our data.
export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ renderValue, ...props }) => {
      const type = renderValue() as string;
      const extension: string = type.split('/')[1];
      return (
        <div className='w-10'>
          <FileIcon
            extension={extension}
            labelColor={COLOR_EXTENSION_MAP[extension]}
            //@ts-ignore
            {...defaultStyles[extension]}
          ></FileIcon>
        </div>
      );
    },
  },
   {
    accessorKey: 'fileName',
    header: 'Your Files',
  },
  {
    accessorKey: 'timeStamp',
    header: 'timeStamp',
  },
 
  {
    accessorKey: 'size',
    header: 'Size',
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: 'downloadURL',
    header: 'Link',
    cell: ({ renderValue, ...props }) => {
      return (
        <a
          href={renderValue() as string}
          target='_blank'
          className='underline text-blue-500 hover:text-blue-600 cursor-pointer'
        >
          Download
        </a>
      );
    },
  },
];
