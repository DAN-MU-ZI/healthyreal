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
}

interface PostContextType {
  posts: Post[];
  addPost: (post: Post) => void;
  editPost: (id: number, updatedPost: Post) => void;
  deletePost: (id: number) => void;
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

  return (
    <PostContext.Provider value={{ posts, addPost, editPost, deletePost }}>
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
