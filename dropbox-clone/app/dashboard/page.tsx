import Dropzone from '@/components/Dropzone';
import TableWrapper from '@/components/Table/TableWrapper';
import { db } from '@/firebase';
import { FileType } from '@/typings';
import { auth } from '@clerk/nextjs';
import { collection, getDocs } from 'firebase/firestore';

async function Dashboard() {
  const { userId } = auth();

  const docsResult = await getDocs(collection(db, 'users', userId!, 'file'));
  const skeletonFiles: FileType[] = docsResult.docs.map((doc) => ({
    id: doc.id,
    fileName: doc.data().fileName || doc.id,
    timeStamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    fullName: doc.data().fullName,
    downloadUrl: doc.data().downloadURL,
    type: doc.data().type,
    size: doc.data().size,
  }));

  return (
    <div className='boarder-'>
      <Dropzone />

      <section className='container space-y-5'>
        <h2 className='font-bold'>All Files</h2>

        <div>
          <TableWrapper 
          skeletonFiles = {skeletonFiles}
          />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
