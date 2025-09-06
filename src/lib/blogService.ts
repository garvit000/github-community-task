import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CreateBlogPostData {
  title: string;
  content: string;
  author: string;
  authorId: string;
}

export interface UpdateBlogPostData {
  title?: string;
  content?: string;
}

// Create a new blog post
export const createBlogPost = async (data: CreateBlogPostData): Promise<string> => {
  const docRef = await addDoc(collection(db, 'blogPosts'), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
};

// Get all blog posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const q = query(collection(db, 'blogPosts'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as BlogPost[];
};

// Update a blog post
export const updateBlogPost = async (id: string, data: UpdateBlogPostData): Promise<void> => {
  const blogPostRef = doc(db, 'blogPosts', id);
  await updateDoc(blogPostRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
};

// Delete a blog post
export const deleteBlogPost = async (id: string): Promise<void> => {
  const blogPostRef = doc(db, 'blogPosts', id);
  await deleteDoc(blogPostRef);
};
