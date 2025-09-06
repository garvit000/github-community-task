'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BlogPost, getBlogPosts, deleteBlogPost } from '@/lib/blogService';
import { BlogPostCard, BlogPostForm } from '@/components/BlogPost';
import Layout from '@/components/Layout';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>(undefined);

  const loadPosts = async () => {
    try {
      const fetchedPosts = await getBlogPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleCreatePost = () => {
    setEditingPost(undefined);
    setShowForm(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteBlogPost(id);
        setPosts(posts.filter(post => post.id !== id));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleFormSuccess = () => {
    loadPosts();
  };

  if (loading) {
    return (
      <Layout onCreatePost={handleCreatePost}>
        <div className="flex items-center justify-center min-h-[400px]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout onCreatePost={handleCreatePost}>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Welcome to BlogSpace
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Share your thoughts, ideas, and stories with the world. Create, edit, and manage your blog posts with ease.
          </p>
        </motion.div>

        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-semibold text-white mb-4">No posts yet</h3>
              <p className="text-gray-300 mb-6">Be the first to share something amazing!</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCreatePost}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Create Your First Post
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <BlogPostCard
                  post={post}
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <BlogPostForm
          post={editingPost}
          onClose={() => setShowForm(false)}
          onSuccess={handleFormSuccess}
        />
      )}
    </Layout>
  );
}
