import React, { createContext, useState, ReactNode } from 'react';

interface Post {
  id: number;
  username: string;
  profilePic: string;
  date: string;
  mealTime: string;
  title: string;
  content: string;
  foodPic: string;
  feedback?: string[]; // Add feedback field
}

interface PostContextType {
  posts: Post[];
  addPost: (post: Post) => void;
  editPost: (id: number, updatedPost: Post) => void;
  deletePost: (id: number) => void;
  addFeedback: (postId: number, feedback: string) => void; // Add method for feedback
}

export const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (post: Post) => {
    setPosts((prevPosts) => [...prevPosts, post]);
  };

  const editPost = (id: number, updatedPost: Post) => {
    setPosts((prevPosts) => prevPosts.map((post) => (post.id === id ? updatedPost : post)));
  };

  const deletePost = (id: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const addFeedback = (postId: number, updatedPost: any) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === postId ? updatedPost : post))
    );
  };

  return (
    <PostContext.Provider value={{ posts, addPost, editPost, deletePost, addFeedback }}>
      {children}
    </PostContext.Provider>
  );
};

interface Program {
  id: number;
  title: string;
  description: string;
  keywords: string[];
  image: File | null;
}

interface ProgramContextType {
  programs: Program[];
  addProgram: (program: Program) => void;
}

export const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

export const ProgramProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [programs, setPrograms] = useState<Program[]>([]);

  const addProgram = (program: Program) => {
    setPrograms((prev) => [...prev, program]);
  };

  return (
    <ProgramContext.Provider value={{ programs, addProgram }}>
      {children}
    </ProgramContext.Provider>
  );
};
