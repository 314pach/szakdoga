package com.example.backend.controller;

import com.example.backend.model.dto.MessageDTO;
import com.example.backend.service.MessageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/message")
public class MessageController {
    private final MessageService messageService;
    private final SimpMessagingTemplate template;

    public MessageController(MessageService messageService, SimpMessagingTemplate template) {
        this.messageService = messageService;
        this.template = template;
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

    @GetMapping("/findMessagesByParties/{user1}/{user2}")
    public ResponseEntity<Set<MessageDTO>> getMessageByParties(@PathVariable("user1") Long user1, @PathVariable("user2") Long user2){
        Set<MessageDTO> messageDTOS = messageService.findAllByParties(user1, user2);
        return new ResponseEntity<>(messageDTOS, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<MessageDTO> addMessage(@RequestBody() MessageDTO messageDTO){
        MessageDTO newMessage = messageService.save(messageDTO);
        return new ResponseEntity<>(newMessage, HttpStatus.CREATED);
    }

    @MessageMapping("/addMessageToOpenedConversation")
    public void addMessageToSocket(MessageDTO messageDTO){
        template.convertAndSend("/openedMessages", messageDTO);
    }

    @PutMapping("/update")
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
