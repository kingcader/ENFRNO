'use client'

import { demoProfiles } from './demo-data'
import type { Profile } from '@/types/database'

const DEMO_USER_KEY = 'enfrno_demo_user'

export interface DemoUser {
  id: string
  email: string
  profile: Profile
}

// Demo user for logged-in state
const defaultDemoUser: DemoUser = {
  id: 'demo-user-current',
  email: 'demo@enfrno.com',
  profile: {
    id: 'demo-user-current',
    username: 'DemoUser',
    full_name: 'Demo User',
    avatar_url: null,
    bio: 'This is a demo account. Sign up to create your real profile!',
    location: 'Demo City',
    state: 'CA',
    is_verified: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

// Get demo user from localStorage
export function getDemoUser(): DemoUser | null {
  if (typeof window === 'undefined') return null
  
  const stored = localStorage.getItem(DEMO_USER_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  }
  return null
}

// Set demo user (login)
export function setDemoUser(user: DemoUser): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user))
}

// Clear demo user (logout)
export function clearDemoUser(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(DEMO_USER_KEY)
}

// Demo login function
export function demoLogin(email: string, password: string): { success: boolean; user?: DemoUser; error?: string } {
  // Accept any email/password for demo
  if (email && password.length >= 6) {
    const user: DemoUser = {
      ...defaultDemoUser,
      email,
      profile: {
        ...defaultDemoUser.profile,
        username: email.split('@')[0],
      }
    }
    setDemoUser(user)
    return { success: true, user }
  }
  return { success: false, error: 'Invalid credentials' }
}

// Demo register function
export function demoRegister(email: string, password: string, username: string, state: string): { success: boolean; user?: DemoUser; error?: string } {
  if (!email || password.length < 6 || !username || !state) {
    return { success: false, error: 'Please fill in all required fields' }
  }

  const user: DemoUser = {
    id: 'demo-user-' + Date.now(),
    email,
    profile: {
      id: 'demo-user-' + Date.now(),
      username,
      full_name: null,
      avatar_url: null,
      bio: null,
      location: null,
      state,
      is_verified: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  }
  setDemoUser(user)
  return { success: true, user }
}

// Demo logout
export function demoLogout(): void {
  clearDemoUser()
}



