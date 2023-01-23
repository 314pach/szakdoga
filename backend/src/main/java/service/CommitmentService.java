package service;

import model.ApplicationUser;
import model.Commitment;
import model.dto.CommitmentDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import repository.CommitmentRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class CommitmentService {
    @Autowired
    private TaskService taskService;

    @Autowired
    private ApplicationUserService applicationUserService;
    private final CommitmentRepository commitmentRepository;

    public CommitmentService(CommitmentRepository commitmentRepository) {
        this.commitmentRepository = commitmentRepository;
    }

    @Transactional(readOnly = true)
    public CommitmentDTO findById(Long id){
        return commitmentRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Transactional(readOnly = true)
    public Set<CommitmentDTO> findAll(){
        return toDto(commitmentRepository.findAll());
    }

    public CommitmentDTO save(CommitmentDTO commitmentDTO){
        return toDto(commitmentRepository.save(toEntity(commitmentDTO)));
    }

    public void delete(Long id){
        commitmentRepository.deleteById(id);
    }

    public CommitmentDTO toDto(Commitment commitment){
        if(commitment == null) return null;

        CommitmentDTO commitmentDTO = new CommitmentDTO();

        commitmentDTO.setId(commitment.getId());
        commitmentDTO.setDeadline(commitment.getDeadline());
        commitmentDTO.setPoints(commitment.getPoints());
        commitmentDTO.setStatus(commitment.getStatus());
        commitmentDTO.setTaskId(commitment.getTask().getId());
        commitmentDTO.setStudentIds(commitment.getStudents()
                .stream().map(ApplicationUser::getId)
                .collect(Collectors.toSet()));

        return commitmentDTO;
    }

    public Set<CommitmentDTO> toDto(List<Commitment> commitments){
        return commitments.stream().map(this::toDto).collect(Collectors.toSet());
    }

    public Commitment toEntity(CommitmentDTO commitmentDTO){
        if(commitmentDTO == null) return null;

        Commitment commitment = new Commitment();

        commitment.setId(commitmentDTO.getId());
        commitment.setDeadline(commitmentDTO.getDeadline());
        commitment.setPoints(commitmentDTO.getPoints());
        commitment.setStatus(commitmentDTO.getStatus());
        commitment.setTask(taskService.toEntity(taskService.findById(commitmentDTO.getTaskId())));
        commitment.setStudents(commitmentDTO.getStudentIds()
                .stream().map(studentId ->
                        applicationUserService.toEntity(applicationUserService.findById(studentId)))
                .collect(Collectors.toSet()));

        return commitment;
    }
}
