// CreateEditNotePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createNote, getNoteById, updateNote } from '../services/api';

const CreateEditNotePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      const fetchNote = async () => {
        try {
          const response = await getNoteById(id!);
          setTitle(response.data.title);
          setContent(response.data.content);
        } catch (error) {
          console.error('Error fetching note details:', error);
        }
      };
      fetchNote();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateNote(id!, { title, content });
      } else {
        await createNote({ title, content });
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  return (
    <div className="container">
      <h1>{isEditMode ? 'Edit Note' : 'Create New Note'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isEditMode ? 'Update Note' : 'Create Note'}</button>
      </form>
    </div>
  );
};

export default CreateEditNotePage;
