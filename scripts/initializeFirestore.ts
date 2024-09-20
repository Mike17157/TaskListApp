import { db } from '../src/lib/firebase';
import { ref, push } from 'firebase/database';

async function initializeDatabase() {
  try {
    // Add some initial categories
    const categoriesRef = ref(db, 'categories');
    await push(categoriesRef, { name: 'Work' });
    await push(categoriesRef, { name: 'Personal' });
    await push(categoriesRef, { name: 'Shopping' });

    // Add a sample task
    const tasksRef = ref(db, 'tasks');
    await push(tasksRef, { text: 'Sample Task', category: 'Work' });

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDatabase();