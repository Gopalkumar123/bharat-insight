import { createClient } from 'supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface User {
  id: string
  email: string
  role: 'admin' | 'viewer'
  department: 'health' | 'agriculture' | 'education'
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error
    
    return { user: data.user, error: null }
  } catch (error) {
    return { user: null, error: error as Error }
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error: null }
  } catch (error) {
    return { error: error as Error }
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return null
    
    // Mock user metadata - in real app, this would come from user metadata
    return {
      id: user.id,
      email: user.email || '',
      role: 'viewer', // Default role
      department: 'health', // Default department
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}
