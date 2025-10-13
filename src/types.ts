export type Idea = {
  _id: string
  title: string
  description: string
  tags: Array<string>
  createdAt: string
}

export type User = {
  email: string
  name: string
  password: string
}

export type AuthContextType = {
  accessToken: string | null
  setAccessToken: (token: string | null) => void
  user: User | null
  setUser: (user: User | null) => void
}
