import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { CustomValidatorsDirectiveDirective } from 'src/app/directives/custom-validators-directive.directive';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
interface Props {
  id: number,
  author: string,
  descrition: string,
  title: string
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbModalConfig, NgbModal]

})

export class HomeComponent implements OnInit {

  isValid = true
  singlePost: any = []
  button = "Add post"
  posts = <Props[]>[]
  updatedId:number=0
  signupForm: FormGroup | any;
  constructor(private fb: FormBuilder,
    private customValidators: CustomValidatorsDirectiveDirective,
    private post: PostsService,
    config: NgbModalConfig, private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;

  }
  ngOnInit() {
    this.initializeForm();
    this.getPostData();
    // this.post.getpost().subscribe((data: any) => {
    //   console.log("this   is datata", data);
    // })

  }
  ngOnChange() {

  }
  open(content: any, id: number = 0) {
    if (id) {
      this.post.getdata(id).subscribe((data: any) => {
        //  this.singlePost=data
        this.button = "Update"
        this.signupForm.controls['title'].setValue(data.title);
        this.signupForm.controls['author'].setValue(data.author);
        this.signupForm.controls['description'].setValue(data.descrition);
        this.updatedId=id
        // this.getPostData();  
      })
    } else {
      this.signupForm.reset();
      this.button = "Add post"
    }

    this.modalService.open(content);
  }
  getPostData() {
    this.post.getpost().subscribe((data: any) => {
      this.posts = data;
      this.signupForm.reset();
    })
  }
  initializeForm() {
    this.signupForm = this.fb.group({
      'title': new FormControl('',
        Validators.required,
      ),
      'author': new FormControl('',
        Validators.required,),
      'description': new FormControl('',
        Validators.required,),
    });
  }
  get formAltaControls(): any {
    return this.signupForm['controls'];
  }
  addpost(values: any) {
    const data = {
      "title": values.title,
      "author": values.author,
      "description": values.description,
    }
    if (this.button === "Update") {
      this.post.updatepost(this.updatedId,data).subscribe((data: any) => {
        this.getPostData();
      })
    } else {
      this.post.addpost(data).subscribe((data: any) => {
        this.getPostData();
      })
    }
  }

  delete(id: number) {
    this.post.deletepost(id).subscribe((data: any) => {
      this.getPostData();
    })
  }
}
