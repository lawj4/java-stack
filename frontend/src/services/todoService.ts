import axios from 'axios';
import { Todo } from '../types/Todo';

const API_BASE_URL = 'http://localhost:8080/api/todos';

const todoService = {
  async getAllTodos(): Promise<Todo[]> {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  },

  async getTodoById(id: number): Promise<Todo> {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  async createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
    const response = await axios.post(API_BASE_URL, todo);
    return response.data;
  },

  async updateTodo(id: number, todo: Todo): Promise<Todo> {
    const response = await axios.put(`${API_BASE_URL}/${id}`, todo);
    return response.data;
  },

  async toggleTodoStatus(id: number): Promise<Todo> {
    const response = await axios.patch(`${API_BASE_URL}/${id}/toggle`);
    return response.data;
  },

  async deleteTodo(id: number): Promise<void> {
    await axios.delete(`${API_BASE_URL}/${id}`);
  },

  async getTodosByStatus(completed: boolean): Promise<Todo[]> {
    const response = await axios.get(`${API_BASE_URL}/status/${completed}`);
    return response.data;
  }
};

export default todoService; 