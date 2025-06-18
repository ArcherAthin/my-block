
import { db } from './firebase';
import { collection, addDoc, doc, updateDoc, onSnapshot, query, where, orderBy } from 'firebase/firestore';

export interface VisitorData {
  id?: string;
  visitorName: string;
  residentName: string;
  phone: string;
  purpose: string;
  visitDate: string;
  visitTime: string;
  status: 'pending' | 'approved' | 'used' | 'expired';
  createdAt: string;
  usedAt?: string;
}

export const createVisitor = async (visitorData: Omit<VisitorData, 'id' | 'createdAt' | 'status'>) => {
  try {
    const docRef = await addDoc(collection(db, 'scheduled_visits'), {
      ...visitorData,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating visitor:', error);
    return { success: false, error };
  }
};

export const updateVisitorStatus = async (id: string, status: VisitorData['status'], usedAt?: string) => {
  try {
    const updateData: any = { status };
    if (usedAt) updateData.usedAt = usedAt;
    
    await updateDoc(doc(db, 'scheduled_visits', id), updateData);
    return { success: true };
  } catch (error) {
    console.error('Error updating visitor status:', error);
    return { success: false, error };
  }
};

export const subscribeToVisitors = (
  callback: (visitors: VisitorData[]) => void,
  filterDate?: string
) => {
  let q = query(
    collection(db, 'scheduled_visits'),
    orderBy('createdAt', 'desc')
  );

  if (filterDate) {
    q = query(
      collection(db, 'scheduled_visits'),
      where('visitDate', '==', filterDate),
      orderBy('createdAt', 'desc')
    );
  }

  return onSnapshot(q, (snapshot) => {
    const visitors = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as VisitorData));
    callback(visitors);
  });
};
