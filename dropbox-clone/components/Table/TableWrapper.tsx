import { FileType } from '@/typings';
import { Button } from '../ui/button';
import { DataTable } from './Table';
import { columns } from './Columns';


function TableWrapper({ skeletonFiles }: { skeletonFiles: FileType[] }) {
  return (
    <div>
      <Button>Sort by ...</Button>
      <DataTable columns={columns} data={skeletonFiles}/>
    </div>
  );
}

export default TableWrapper;
