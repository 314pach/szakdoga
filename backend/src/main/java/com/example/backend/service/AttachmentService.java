package com.example.backend.service;

import com.example.backend.model.Attachment;
import com.example.backend.model.dto.AttachmentDTO;
import com.example.backend.repository.ApplicationUserRepository;
import com.example.backend.repository.AttachmentRepository;
import com.example.backend.repository.FileRepository;
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
    private ApplicationUserRepository applicationUserRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private FileRepository fileRepository;

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

    @Transactional(readOnly = true)
    public Set<AttachmentDTO> findAllByTaskId(Long taskId){
        return toDto(attachmentRepository.getAttachmentsByTask_Id(taskId));
    }

    public AttachmentDTO save(AttachmentDTO attachmentDTO){
        return toDto(attachmentRepository.save(toEntity(attachmentDTO)));
    }

    public Set<AttachmentDTO> saveAll(Set<AttachmentDTO> attachmentDTOSet) {
        return toDto(attachmentRepository.saveAll(toEntity(attachmentDTOSet)));
    }

    public AttachmentDTO update(AttachmentDTO attachmentDTO){
        return toDto(attachmentRepository.save(toEntity(attachmentDTO)));
    }

    public void delete(Long id){
        attachmentRepository.findById(id).ifPresent(attachment -> fileRepository.deleteById(attachment.getId()));
        attachmentRepository.deleteById(id);
    }
    public void deleteAllById(Set<Long> ids){
        ids.forEach(attachmentId -> attachmentRepository.findById(attachmentId).ifPresent(attachment -> fileRepository.deleteById(attachment.getId())));
        attachmentRepository.deleteAllById(ids);
    }

    public AttachmentDTO toDto(Attachment attachment){
        if(attachment == null) return null;

        AttachmentDTO attachmentDTO = new AttachmentDTO();

        attachmentDTO.setId(attachment.getId());
        attachmentDTO.setPath(attachment.getPath());
        attachmentDTO.setType(attachment.getType());
        attachmentDTO.setTaskId(attachment.getTask().getId());
        attachmentDTO.setUploaderId(attachment.getUploader().getId());
        if(attachment.getFile() != null){
            attachmentDTO.setFileId(attachment.getFile().getId());
        } else {
            attachmentDTO.setFileId(null);
        }

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
        attachment.setType(attachmentDTO.getType());
        taskRepository.findById(attachmentDTO.getTaskId()).ifPresent(attachment::setTask);
        applicationUserRepository.findById(attachmentDTO.getUploaderId()).ifPresent(attachment::setUploader);
        attachment.setFile(
                fileRepository.findById(attachmentDTO.getFileId()).orElse(null));

        return attachment;
    }

    public Set<Attachment> toEntity(Set<AttachmentDTO> attachmentDtos){
        return attachmentDtos.stream().map(this::toEntity).collect(Collectors.toSet());
    }
}
