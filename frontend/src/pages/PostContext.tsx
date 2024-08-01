import React, { createContext, useState, ReactNode } from 'react';

interface Post {
  id: number;
  username: string;
  profilePic: string;
  date: string;
  title: string;
  content: string;
  foodPic: string;
}

interface PostContextType {
  posts: Post[];
  addPost: (post: Post) => void;
  editPost: (id: number, updatedPost: Post) => void;
  deletePost: (id: number) => void;
}

export const PostContext = createContext<PostContextType | undefined>(undefined);

let nextId = 1;

export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (post: Post) => {
    setPosts([...posts, { ...post, id: nextId++ }]);
  };

  const editPost = (id: number, updatedPost: Post) => {
    setPosts(posts.map(post => (post.id === id ? updatedPost : post)));
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <PostContext.Provider value={{ posts, addPost, editPost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};
