import { db } from '@/lib/firebase';
import { ref, get, push, remove, set, query, orderByChild, equalTo } from 'firebase/database';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categoriesRef = ref(db, 'categories');
    const snapshot = await get(categoriesRef);
    const categoriesObj = snapshot.val();
    const categories = categoriesObj
      ? Object.entries(categoriesObj).map(([id, data]) => ({
          id,
          name: (data as { name: string }).name
        }))
      : [];
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    const categoriesRef = ref(db, 'categories');
    const newCategoryRef = push(categoriesRef);
    await set(newCategoryRef, { name });
    return NextResponse.json({ id: newCategoryRef.key, name });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add category' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const categoryRef = ref(db, `categories/${id}`);

    // First, delete all tasks associated with this category
    const tasksRef = ref(db, 'tasks');
    const tasksQuery = query(tasksRef, orderByChild('category'), equalTo(id));
    const tasksSnapshot = await get(tasksQuery);
    
    const deletePromises: Promise<void>[] = [];
    tasksSnapshot.forEach((childSnapshot) => {
      deletePromises.push(remove(childSnapshot.ref));
    });

    // Wait for all task deletions to complete
    await Promise.all(deletePromises);

    // Now delete the category
    await remove(categoryRef);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting category and associated tasks:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to delete category and associated tasks', details: errorMessage }, { status: 500 });
  }
}