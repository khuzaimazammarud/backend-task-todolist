import React from 'react';

function Header() {
  return (
    <header className="bg-blue-500 p-4 text-white text-center">
      <h1 className="text-2xl font-bold">Todo App</h1>
      <nav>
        <a href="/" className="hover:underline">Home</a>
      </nav>
    </header>
  );
}

export default Header;
