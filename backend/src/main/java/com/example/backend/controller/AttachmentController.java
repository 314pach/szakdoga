package com.example.backend.controller;

import com.example.backend.model.dto.AttachmentDTO;
import com.example.backend.service.AttachmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/attachment")
public class AttachmentController {
    private final AttachmentService attachmentService;

    public AttachmentController(AttachmentService attachmentService) {
        this.attachmentService = attachmentService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<Set<AttachmentDTO>> getAllAttachments(){
        Set<AttachmentDTO> attachmentDTOS = attachmentService.findAll();
        return new ResponseEntity<>(attachmentDTOS, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<AttachmentDTO> getAttachmentById(@PathVariable("id") Long id){
        AttachmentDTO attachmentDTO = attachmentService.findById(id);
        return new ResponseEntity<>(attachmentDTO, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<AttachmentDTO> addAttachment(@RequestBody() AttachmentDTO attachmentDTO){
        AttachmentDTO newAttachment = attachmentService.save(attachmentDTO);
        return new ResponseEntity<>(newAttachment, HttpStatus.CREATED);
    }

    @PostMapping("/update")
    public ResponseEntity<AttachmentDTO> updateAttachment(@RequestBody() AttachmentDTO attachmentDTO){
        AttachmentDTO updatedAttachment = attachmentService.update(attachmentDTO);
        return new ResponseEntity<>(updatedAttachment, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAttachment(@PathVariable("id") Long id){
        attachmentService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
