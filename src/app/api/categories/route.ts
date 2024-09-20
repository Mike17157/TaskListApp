import { db } from '@/lib/firebase';
import { ref, get, push, remove, set } from 'firebase/database';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categoriesRef = ref(db, 'categories');
    const snapshot = await get(categoriesRef);
    const categoriesObj = snapshot.val();
    const categories = categoriesObj
      ? Object.entries(categoriesObj).map(([id, name]) => ({ id, name }))
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
    await set(newCategoryRef, name);
    return NextResponse.json({ id: newCategoryRef.key, name });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add category' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const categoryRef = ref(db, `categories/${id}`);
    await remove(categoryRef);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}