import * as express from 'express';

interface User {
  id: number
  username: string
  password: string
}

interface JWTData {
  id: number,
  username: string
}

interface RequestWithAuth extends express.Request {
  authData: JWTData
} 