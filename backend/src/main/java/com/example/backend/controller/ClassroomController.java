package com.example.backend.controller;

import com.example.backend.model.dto.ClassroomDTO;
import com.example.backend.service.ClassroomService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/classroom")
public class ClassroomController {
    private final ClassroomService classroomService;

    public ClassroomController(ClassroomService classroomService) {
        this.classroomService = classroomService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<Set<ClassroomDTO>> getAllClassrooms(){
        Set<ClassroomDTO> classroomDTOS = classroomService.findAll();
        return new ResponseEntity<>(classroomDTOS, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<ClassroomDTO> getClassroomById(@PathVariable("id") Long id){
        ClassroomDTO classroomDTO = classroomService.findById(id);
        return new ResponseEntity<>(classroomDTO, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ClassroomDTO> addClassroom(@RequestBody() ClassroomDTO classroomDTO){
        ClassroomDTO newClassroom = classroomService.save(classroomDTO);
        return new ResponseEntity<>(newClassroom, HttpStatus.CREATED);
    }

    @PostMapping("/update")
    public ResponseEntity<ClassroomDTO> updateClassroom(@RequestBody() ClassroomDTO classroomDTO){
        ClassroomDTO updatedClassroom = classroomService.update(classroomDTO);
        return new ResponseEntity<>(updatedClassroom, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteClassroom(@PathVariable("id") Long id){
        classroomService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
