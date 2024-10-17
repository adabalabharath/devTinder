export type User = {
  firstName: string,
  lastName: string,
  email: string,
  password:string,
  gender: string,
  age: Number,
  photoUrl:string,
  skills: [string],
}

export type response={
  status:string,
  user:User[]
}
