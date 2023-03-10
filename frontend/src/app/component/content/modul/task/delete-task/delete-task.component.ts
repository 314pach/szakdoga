import {Component, Inject} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TaskDto} from "../../../../../shared/dto/task.dto";
import {TaskService} from "../../../../../shared/service/task.service";

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent {
  constructor(
    private taskService: TaskService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialogRef<DeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {task: TaskDto, modulId: number}
  ) {
  }

  delete() {
    this.taskService.deleteTask(this.data.task.id!)
      .subscribe(_ =>
      {
        this.taskService.getTasksByModulId(this.data.modulId);
        this._snackBar.open(
          "A feladat törlése sikeres",
          "Ok",
          {duration: 5000});
      });
    this.dialog.close();
  }
}
