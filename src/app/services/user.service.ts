import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    const url: string = 'http://localhost:3000/users';
    return this.http.get<User[]>(url).pipe(
      tap((res: User[]) => console.log('Listing users: \n')),
      catchError(this.handleError<User[]>('Found an error trying to get users'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }

  private log(message: string) {
    console.log(`EventService: ${message}`)
  }
}

export interface IUser {
  getName(): string;
  getAge(): number;
}

export class User implements IUser {
  private name: string = '';
  private age: number = 0;

  constructor(inputName: string, inputAge: number) {
    this.name = inputName;
    this.age = inputAge;
  }

  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }
}
