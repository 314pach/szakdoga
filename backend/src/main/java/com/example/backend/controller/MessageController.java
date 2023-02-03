package com.example.backend.controller;

import com.example.backend.model.dto.MessageDTO;
import com.example.backend.service.MessageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/message")
public class MessageController {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<Set<MessageDTO>> getAllMessages(){
        Set<MessageDTO> messageDTOS = messageService.findAll();
        return new ResponseEntity<>(messageDTOS, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<MessageDTO> getMessageById(@PathVariable("id") Long id){
        MessageDTO messageDTO = messageService.findById(id);
        return new ResponseEntity<>(messageDTO, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<MessageDTO> addMessage(@RequestBody() MessageDTO messageDTO){
        MessageDTO newMessage = messageService.save(messageDTO);
        return new ResponseEntity<>(newMessage, HttpStatus.CREATED);
    }

    @PostMapping("/update")
    public ResponseEntity<MessageDTO> updateMessage(@RequestBody() MessageDTO messageDTO){
        MessageDTO updatedMessage = messageService.update(messageDTO);
        return new ResponseEntity<>(updatedMessage, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable("id") Long id){
        messageService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
