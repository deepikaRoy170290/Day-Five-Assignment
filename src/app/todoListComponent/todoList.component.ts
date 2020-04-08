import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todoList.service';

import { Todo } from '../todo'


@Component({
  selector: 'app-todo-list',
  templateUrl: './todoList.component.html'
})
export class TodoListComponent implements OnInit {

    todos:Todo[]; 
    loading:boolean=true;


    filteredtodos:Todo[];
    private _searchTerm:string;
    get searchTerm():string{
      return this._searchTerm;
    }
    set searchTerm(value:string){
      this._searchTerm = value;
      this.filteredtodos = this.filtertodos(value);
    }

    filtertodos(searchString:string){
      return this.todos.filter(
        todoList => todoList.title
            .toLowerCase()
            .indexOf(searchString.toLowerCase())!==-1
        )
    }
    constructor(private todoService: TodoService){}

    ngOnInit(){
      this.fetchData();
      this.fetchFilteredData();
    }
    fetchData(): void {
        this.todoService.fetchData()
          .subscribe(todos => {
            this.todos = todos
            this.loading = false;
          });
        }

        fetchFilteredData(): void {
          this.todoService.fetchData()
            .subscribe(filteredtodos => {
              this.filteredtodos = filteredtodos
              this.loading = false;
            });
          }
        
        
      }