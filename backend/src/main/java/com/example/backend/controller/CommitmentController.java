package com.example.backend.controller;

import com.example.backend.model.dto.CommitmentDTO;
import com.example.backend.service.CommitmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/commitment")
public class CommitmentController {
    private final CommitmentService commitmentService;

    public CommitmentController(CommitmentService commitmentService) {
        this.commitmentService = commitmentService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<Set<CommitmentDTO>> getAllCommitments(){
        Set<CommitmentDTO> commitmentDTOS = commitmentService.findAll();
        return new ResponseEntity<>(commitmentDTOS, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<CommitmentDTO> getCommitmentById(@PathVariable("id") Long id){
        CommitmentDTO commitmentDTO = commitmentService.findById(id);
        return new ResponseEntity<>(commitmentDTO, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<CommitmentDTO> addCommitment(@RequestBody() CommitmentDTO commitmentDTO){
        CommitmentDTO newCommitment = commitmentService.save(commitmentDTO);
        return new ResponseEntity<>(newCommitment, HttpStatus.CREATED);
    }

    @PostMapping("/update")
    public ResponseEntity<CommitmentDTO> updateCommitment(@RequestBody() CommitmentDTO commitmentDTO){
        CommitmentDTO updatedCommitment = commitmentService.update(commitmentDTO);
        return new ResponseEntity<>(updatedCommitment, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCommitment(@PathVariable("id") Long id){
        commitmentService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
