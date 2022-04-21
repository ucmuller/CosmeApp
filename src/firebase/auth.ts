import firebase from 'firebase'
import 'firebase/auth'
import { App } from './app'

export const Auth: firebase.auth.Auth = App.auth()