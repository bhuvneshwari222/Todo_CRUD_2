import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodosService } from '../../services/todos.service';
import { Itodo } from '../../models/todos';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnChanges {
  isInEditMode: boolean = false;
  @ViewChild('todoForm') todoForm !: NgForm;
  @Output() emitNewTodo: EventEmitter<Itodo> = new EventEmitter<Itodo>();
  @Input() getEditTodo !: Itodo;
  @Output() emitUpdatedTodo: EventEmitter<Itodo> = new EventEmitter<Itodo>();

  constructor(
    private _todosService: TodosService
  ) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['getEditTodo'].currentValue) {
      this.isInEditMode = true;
      this.todoForm.form.patchValue(this.getEditTodo);
    }
  }

  onSubmitTodo() {
    if (this.todoForm.form.valid) {
      let newTodo: Itodo = { ...this.todoForm.form.value, todoID: this._todosService.uuid() }
      this.emitNewTodo.emit(newTodo);
      this.todoForm.resetForm();
    }
  }

  onUpdateTodo() {
    if (this.todoForm.form.valid) {
      let updatedTodo: Itodo = { ...this.todoForm.form.value, todoID: this.getEditTodo.todoID }
      this.emitUpdatedTodo.emit(updatedTodo);
      this.todoForm.resetForm();
      this.isInEditMode = false;
    }
  }

}
