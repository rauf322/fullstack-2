export type Idea = {
  _id: string
  title: string
  user: string
  description: string
  tags: Array<string>
  createdAt: string
  updatedAt: string
}

export type UserCredentials = {
  email: string
  id: string
  name: string
}

export type AuthContextType = {
  accessToken: string | null
  setAccessToken: (token: string | null) => void
  user: UserCredentials | null
  setUser: (user: UserCredentials | null) => void
}
