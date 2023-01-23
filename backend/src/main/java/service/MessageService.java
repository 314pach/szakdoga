package service;

import model.Message;
import model.dto.MessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import repository.MessageRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class MessageService {
    @Autowired
    private ApplicationUserService applicationUserService;

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

    public MessageDTO save(MessageDTO messageDTO){
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
        message.setSender(
                applicationUserService.toEntity(
                        applicationUserService.findById(messageDTO.getSenderId())
                )
        );
        message.setReceiver(
                applicationUserService.toEntity(
                        applicationUserService.findById(messageDTO.getReceiverId())
                )
        );

        return message;
    }
}
