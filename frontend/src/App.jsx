import { useState } from 'react'
import './App.css'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import Dashboard from '../Components/Dashboard';


function App() {
  

  return (
   <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <Dashboard />
      </SignedIn>
    </header>
  )
}

export default App
