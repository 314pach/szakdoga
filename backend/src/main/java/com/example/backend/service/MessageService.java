package com.example.backend.service;

import com.example.backend.model.Message;
import com.example.backend.model.dto.MessageDTO;
import com.example.backend.repository.ApplicationUserRepository;
import com.example.backend.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class MessageService {
    @Autowired
    private ApplicationUserRepository applicationUserRepository;

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Transactional(readOnly = true)
    public MessageDTO findById(Long id){
        return messageRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Transactional(readOnly = true)
    public Set<MessageDTO> findAll(){
        return toDto(messageRepository.findAll());
    }

    @Transactional(readOnly = true)
    public Set<MessageDTO> findAllByParties(Long user1, Long user2){
        return toDto(messageRepository.findAllByParties(user1, user2));
    }

    public MessageDTO save(MessageDTO messageDTO){
        return toDto(messageRepository.save(toEntity(messageDTO)));
    }

    public MessageDTO update(MessageDTO messageDTO){
        return toDto(messageRepository.save(toEntity(messageDTO)));
    }

    public void delete(Long id){
        messageRepository.deleteById(id);
    }

    public MessageDTO toDto(Message message){
        if(message == null) return null;

        MessageDTO messageDTO = new MessageDTO();

        messageDTO.setId(message.getId());
        messageDTO.setBody(message.getBody());
        messageDTO.setLabels(message.getLabels());
        messageDTO.setTimestamp(message.getTimestamp());
        messageDTO.setStatus(message.getStatus());
        messageDTO.setSenderId(message.getSender().getId());
        messageDTO.setReceiverId(message.getReceiver().getId());

        return messageDTO;
    }

    public Set<MessageDTO> toDto(List<Message> messages){
        return messages.stream().map(this::toDto).collect(Collectors.toSet());
    }

    public Message toEntity(MessageDTO messageDTO){
        if(messageDTO == null) return null;

        Message message = new Message();

        message.setId(messageDTO.getId());
        message.setBody(messageDTO.getBody());
        message.setLabels(messageDTO.getLabels());
        message.setTimestamp(messageDTO.getTimestamp());
        message.setStatus(messageDTO.getStatus());
        applicationUserRepository.findById(messageDTO.getSenderId()).ifPresent(message::setSender);
        applicationUserRepository.findById(messageDTO.getReceiverId()).ifPresent(message::setReceiver);

        return message;
    }
}
