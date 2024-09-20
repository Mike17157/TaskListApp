import { db } from '@/lib/firebase';
import { ref, get, push, remove, query, orderByChild, equalTo, set } from 'firebase/database';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  try {
    const tasksRef = ref(db, 'tasks');
    let tasksQuery = category
      ? query(tasksRef, orderByChild('category'), equalTo(category))
      : tasksRef;

    const snapshot = await get(tasksQuery);
    const tasksObj = snapshot.val();
    const tasks = tasksObj
      ? Object.entries(tasksObj).map(([id, task]) => ({
          id,
          ...(task as { text: string; category: string }),
        }))
      : [];

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to fetch tasks', details: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { text, category } = await request.json();
    const tasksRef = ref(db, 'tasks');
    const newTaskRef = push(tasksRef);
    await set(newTaskRef, { text, category });
    
    return NextResponse.json({ id: newTaskRef.key, text, category });
  } catch (error) {
    console.error('Error adding task:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to add task', details: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const taskRef = ref(db, `tasks/${id}`);
    await remove(taskRef);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}