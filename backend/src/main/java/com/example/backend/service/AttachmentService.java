package com.example.backend.service;

import com.example.backend.model.Attachment;
import com.example.backend.model.dto.AttachmentDTO;
import com.example.backend.repository.ApplicationUserRepository;
import com.example.backend.repository.AttachmentRepository;
import com.example.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class AttachmentService {
    @Autowired
    private ApplicationUserService applicationUserService;

    @Autowired
    private ApplicationUserRepository applicationUserRepository;
    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskRepository taskRepository;

    private final AttachmentRepository attachmentRepository;

    public AttachmentService(AttachmentRepository attachmentRepository) {
        this.attachmentRepository = attachmentRepository;
    }

    @Transactional(readOnly = true)
    public AttachmentDTO findById(Long id){
        return attachmentRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Transactional(readOnly = true)
    public Set<AttachmentDTO> findAll(){
        return toDto(attachmentRepository.findAll());
    }

    public AttachmentDTO save(AttachmentDTO attachmentDTO){
        return toDto(attachmentRepository.save(toEntity(attachmentDTO)));
    }

    public AttachmentDTO update(AttachmentDTO attachmentDTO){
        return toDto(attachmentRepository.save(toEntity(attachmentDTO)));
    }

    public void delete(Long id){
        attachmentRepository.deleteById(id);
    }

    public AttachmentDTO toDto(Attachment attachment){
        if(attachment == null) return null;

        AttachmentDTO attachmentDTO = new AttachmentDTO();

        attachmentDTO.setId(attachment.getId());
        attachmentDTO.setPath(attachment.getPath());
        attachmentDTO.setTaskId(attachment.getTask().getId());
        attachmentDTO.setUploaderId(attachment.getUploader().getId());

        return attachmentDTO;
    }

    public Set<AttachmentDTO> toDto(List<Attachment> attachments){
        return attachments.stream().map(this::toDto).collect(Collectors.toSet());
    }

    public Attachment toEntity(AttachmentDTO attachmentDTO){
        if(attachmentDTO == null) return null;

        Attachment attachment = new Attachment();

        attachment.setId(attachmentDTO.getId());
        attachment.setPath(attachmentDTO.getPath());
        taskRepository.findById(attachmentDTO.getTaskId()).ifPresent(attachment::setTask);
        applicationUserRepository.findById(attachmentDTO.getUploaderId()).ifPresent(attachment::setUploader);

        return attachment;
    }
}
