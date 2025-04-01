import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

const PublicLayout = lazy(() => import('../layouts/PublicLayout'))
const HomePage = lazy(() => import('../pages/HomePage'))
const AddTodoPage = lazy(() => import('../features/tasks/pages/AddTodoPage'))
const EditTodoPage = lazy(() => import('../features/tasks/pages/EditTodoPage'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: React.createElement(PublicLayout),
    
    children: [
      { index: true, element: React.createElement(HomePage) },
      { path: 'add', element: React.createElement(AddTodoPage) },
      { path: 'edit/:id', element: React.createElement(EditTodoPage) },
    ],
  },
])
