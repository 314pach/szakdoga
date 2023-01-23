package service;

import model.Attachment;
import model.dto.AttachmentDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import repository.AttachmentRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class AttachmentService {
    @Autowired
    private ApplicationUserService applicationUserService;
    @Autowired
    private TaskService taskService;

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
        attachment.setTask(
                taskService.toEntity(
                    taskService.findById(attachmentDTO.getTaskId())
                )
        );
        attachment.setUploader(
                applicationUserService.toEntity(
                    applicationUserService.findById(attachmentDTO.getUploaderId())
                )
        );

        return attachment;
    }
}
