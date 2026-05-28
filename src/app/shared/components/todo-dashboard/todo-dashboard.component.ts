import { Component, OnInit } from '@angular/core';
import { Itodo } from '../../models/todos';
import { todosData2 } from '../../consts/todos';
import { TodosService } from '../../services/todos.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';

@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.scss']
})
export class TodoDashboardComponent implements OnInit {
  todosArr: Itodo[] = [];
  editTodoObj !: Itodo;

  constructor(
    private _snackbar : TodosService,
    private _matDialog : MatDialog
  ) { }

  ngOnInit(): void {
    this.todosArr = todosData2;
  }

  getNewTodo(newTodo: Itodo){
    this.todosArr.unshift(newTodo);
    this._snackbar.openSnackBarService(`The new TodoItem ${newTodo.todoItem} is added successfully!!!`);
  }

  getRemoveID(removeID: string){
    let config = new MatDialogConfig();
    config.data = `Are you sure? you want to remove this todoItem with id ${removeID}`;
    config.disableClose = true;
    config.width = '400px';
    let matDialogRef = this._matDialog.open(GetConfirmComponent,config);
    matDialogRef.afterClosed()
    .subscribe({
      next: resp =>{
        if(resp){
          let getIndex = this.todosArr.findIndex(t => t.todoID === removeID)
          this.todosArr.splice(getIndex,1);
          this._snackbar.openSnackBarService(resp.msg);
        }
      },
      error: err =>{
        this._snackbar.openSnackBarService(err.msg);
      }
    })
  }

  getEditTodo(editTodo : Itodo){
    this.editTodoObj = editTodo;
  }

  getUpdatedTodo(updatedTodo : Itodo){
    let getIndex = this.todosArr.findIndex(t => t.todoID === updatedTodo.todoID);
    this.todosArr[getIndex] = updatedTodo;
    this._snackbar.openSnackBarService(`The todoItem ${updatedTodo.todoItem} is updated successfully!!!`)
  }

}
