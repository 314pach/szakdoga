package com.example.backend.service;

import com.example.backend.model.ApplicationUser;
import com.example.backend.model.Badge;
import com.example.backend.model.Commitment;
import com.example.backend.model.dto.CommitmentDTO;
import com.example.backend.repository.ApplicationUserRepository;
import com.example.backend.repository.BadgeRepository;
import com.example.backend.repository.CommitmentRepository;
import com.example.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class CommitmentService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ApplicationUserRepository applicationUserRepository;

    @Autowired
    private BadgeRepository badgeRepository;
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

    @Transactional(readOnly = true)
    public Set<CommitmentDTO> findAllByUserAndModul(Long user, List<Long> tasks){
        List<Commitment> commitments= commitmentRepository.test(user, tasks);
        return toDto(commitments);
    }

    @Transactional(readOnly = true)
    public Set<CommitmentDTO> findAllByUsersAndModul(List<Long> users, List<Long> tasks){
        List<Commitment> commitments= commitmentRepository.getCommitmentsByUsersAndModul(users, tasks);
        return toDto(commitments);
    }

    public CommitmentDTO save(CommitmentDTO commitmentDTO){
        return toDto(commitmentRepository.save(toEntity(commitmentDTO)));
    }

    public Set<CommitmentDTO> saveAll(Set<CommitmentDTO> commitmentDTOSet) {
        return toDto(commitmentRepository.saveAll(toEntity(commitmentDTOSet)));
    }

    public CommitmentDTO update(CommitmentDTO commitmentDTO){
        return toDto(commitmentRepository.save(toEntity(commitmentDTO)));
    }

    public void delete(Long id){
        commitmentRepository.deleteById(id);
    }

    public void deleteAllById(Set<Long> ids){
        commitmentRepository.deleteAllById(ids);
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
        commitmentDTO.setBadgeIds(commitment.getBadges()
                .stream().map(Badge::getId)
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
        taskRepository.findById(commitmentDTO.getTaskId()).ifPresent(commitment::setTask);
        commitment.setStudents(
                commitmentDTO.getStudentIds().stream()
                        .map(id -> applicationUserRepository.findById(id))
                        .filter(Optional::isPresent)
                        .map(Optional::get)
                        .collect(Collectors.toSet())
        );
        commitment.setBadges(
                commitmentDTO.getBadgeIds().stream()
                        .map(id -> badgeRepository.findById(id))
                        .filter(Optional::isPresent)
                        .map(Optional::get)
                        .collect(Collectors.toSet())
        );

        return commitment;
    }

    public Set<Commitment> toEntity(Set<CommitmentDTO> commitmentDTOSet){
        return commitmentDTOSet.stream().map(this::toEntity).collect(Collectors.toSet());
    }
}
