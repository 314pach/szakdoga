package com.example.backend.controller;

import com.example.backend.model.dto.CommitmentDTO;
import com.example.backend.service.CommitmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    @PostMapping("/findCommitmentsByUserAndModul/{userId}")
    public ResponseEntity<Set<CommitmentDTO>> getCommitmentsByUserAndModul(@PathVariable("userId") Long user, @RequestBody() List<Long> tasks){
        Set<CommitmentDTO> commitmentDTOS = commitmentService.findAllByUserAndModul(user, tasks);
        return new ResponseEntity<>(commitmentDTOS, HttpStatus.OK);
    }

    @PostMapping("/findCommitmentsByUsersAndModul")
    public ResponseEntity<Set<CommitmentDTO>> getCommitmentsByUsersAndModul(@RequestBody() List<List<Long>> ids){
        Set<CommitmentDTO> commitmentDTOS = commitmentService.findAllByUsersAndModul(ids.get(0), ids.get(1));
        return new ResponseEntity<>(commitmentDTOS, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<CommitmentDTO> addCommitment(@RequestBody() CommitmentDTO commitmentDTO){
        CommitmentDTO newCommitment = commitmentService.save(commitmentDTO);
        return new ResponseEntity<>(newCommitment, HttpStatus.CREATED);
    }

    @PostMapping("/createAll")
    public ResponseEntity<Set<CommitmentDTO>> addCommitments(@RequestBody() Set<CommitmentDTO> commitmentDTOSet){
        Set<CommitmentDTO> newCommitments = commitmentService.saveAll(commitmentDTOSet);
        return new ResponseEntity<>(newCommitments, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<CommitmentDTO> updateCommitment(@RequestBody() CommitmentDTO commitmentDTO){
        CommitmentDTO updatedCommitment = commitmentService.update(commitmentDTO);
        return new ResponseEntity<>(updatedCommitment, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCommitment(@PathVariable("id") Long id){
        commitmentService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/deleteCommitmentsById")
    public ResponseEntity<?> deleteCommitmentsById(@RequestBody() Set<Long> ids){
        commitmentService.deleteAllById(ids);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
