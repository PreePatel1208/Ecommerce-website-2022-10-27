import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const  url="http://localhost:3000/"
interface Props{
  id:number,
  author:string,
  descrition:string,
  title:string
}
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient,private router: Router) { }

  getpost(){
    return  this.http.get(url+'posts');

  }
  
  addpost(data:any){
   return this.http.post<Props>(url + 'posts', {
    id:data.id,
    title:data.title,
    author:data.author,
    descrition:data.description
    });
  }
  deletepost(id:number){
    return this.http.delete(url + 'posts/'+id);
  }
  updatepost(id:number,data:any){
    return this.http.put<Props>(url + 'posts/'+id, {
      id:data.id,
      title:data.title,
      author:data.author,
      descrition:data.description
      });
  }
  getdata(id:Number){
    return this.http.get(url + 'posts/'+id);
  }
}
