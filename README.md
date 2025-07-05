# 📚 Redux  App

A modern React + TypeScript project demonstrating Redux Toolkit, Vite, Tailwind, and Radix UI integrations for managing a book library with borrowing functionality.  

---

## 🚀 Features

- Vite-powered blazing-fast dev server  
- React 19 with TypeScript  
- Redux Toolkit state management  
- React Router 7 for routing  
- Radix UI for accessible UI primitives  
- Tailwind CSS for styling  
- Framer Motion for smooth animations  
- Custom modal components with advanced TypeScript generics  
- Borrow/return book logic with quantity validation  
- ISBN uniqueness enforced  
- Toast notifications  
- Responsive navbar and date picker  
- RTK Query for simplified data fetching

---

## 📂 Project Structure

src/
components/
...
pages/
...
hooks/
...
store/
...
types/
...
App.tsx
main.tsx
---

## ⚙️ Scripts

| Command               | Description                                     |
|-----------------------|-------------------------------------------------|
| `npm run dev`         | Start development server with Vite              |
| `npm run build`       | Type-check and build for production             |
| `npm run lint`        | Run ESLint for code quality                     |
| `npm run preview`     | Preview the production build locally            |

---

## 🧩 Tech Stack

- **React 19**
- **Redux Toolkit 2.8**
- **React Router 7**
- **Tailwind CSS 4**
- **Radix UI**  
- **Framer Motion**
- **TypeScript 5**
- **RTK Query** for data fetching

---

## 📝 Developer Notes

✅ Clean `node_modules/.vite` if issues appear:
```bash
rm -rf node_modules/.vite


## 🛠️ Support Notes

> Quick reference for the support session:

---

- **`{ ... }[]` vs `[ { ... } ]`**  
  - `{ ... }[]` → an array of objects of a given type  
  - `[ { ... } ]` → a literal array with one object

---

- **Partial<T>**  
  Makes all properties of type `T` optional.

---

- **Object.keys**  
  Returns an array of property names (keys) from an object.

---

- **Type Error Example**  
  ```ts
  return data.data;
