'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit3, Trash2, Calendar, User } from 'lucide-react';
import { BlogPost, CreateBlogPostData, createBlogPost, updateBlogPost, deleteBlogPost } from '@/lib/blogService';
import { useAuth } from '@/contexts/AuthContext';

interface BlogPostFormProps {
  post?: BlogPost;
  onClose: () => void;
  onSuccess: () => void;
}

export function BlogPostForm({ post, onClose, onSuccess }: BlogPostFormProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      if (post) {
        await updateBlogPost(post.id, { title, content });
      } else {
        await createBlogPost({
          title,
          content,
          author: user.displayName || 'Anonymous',
          authorId: user.uid,
        });
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          {post ? 'Edit Post' : 'Create New Post'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter post title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={8}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
              placeholder="Write your post content here..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Saving...' : (post ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

interface BlogPostCardProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
}

export function BlogPostCard({ post, onEdit, onDelete }: BlogPostCardProps) {
  const { user } = useAuth();
  const isOwner = user?.uid === post.authorId;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">{post.title}</h2>
        {isOwner && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(post)}
              className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all duration-200"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="text-gray-300 mb-4 whitespace-pre-wrap">{post.content}</div>

      <div className="flex items-center gap-4 text-sm text-gray-400">
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" />
          {post.author}
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {post.createdAt.toDate().toLocaleDateString()}
        </div>
      </div>
    </motion.article>
  );
}
