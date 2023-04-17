package com.example.backend.controller;

import com.example.backend.model.dto.TaskDTO;
import com.example.backend.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/task")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<Set<TaskDTO>> getAllTasks(){
        Set<TaskDTO> taskDTOS = taskService.findAll();
        return new ResponseEntity<>(taskDTOS, HttpStatus.OK);
    }

    @GetMapping("/findTasksByModul/{modulId}")
    public ResponseEntity<Set<TaskDTO>> getTasksByModul(@PathVariable("modulId") Long modulId){
        Set<TaskDTO> taskDTOS = taskService.findAllByModulId(modulId);
        return new ResponseEntity<>(taskDTOS, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable("id") Long id){
        TaskDTO taskDTO = taskService.findById(id);
        return new ResponseEntity<>(taskDTO, HttpStatus.OK);
    }

    @PostMapping("/findTasksByIds")
    public ResponseEntity<Set<TaskDTO>> getTasksByIds(@RequestBody() List<Long> taskIds){
        Set<TaskDTO> taskDTOS = taskService.findAllByIds(taskIds);
        return new ResponseEntity<>(taskDTOS, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<TaskDTO> addTask(@RequestBody() TaskDTO taskDTO){
        TaskDTO newTask = taskService.save(taskDTO);
        return new ResponseEntity<>(newTask, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<TaskDTO> updateTask(@RequestBody() TaskDTO taskDTO){
        TaskDTO updatedTask = taskService.update(taskDTO);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable("id") Long id){
        taskService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
