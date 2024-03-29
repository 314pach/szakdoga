package com.example.backend.service;

import com.example.backend.model.ApplicationUser;
import com.example.backend.model.Classroom;
import com.example.backend.model.Commitment;
import com.example.backend.model.dto.ApplicationUserDTO;
import com.example.backend.repository.ApplicationUserRepository;
import com.example.backend.repository.ClassroomRepository;
import com.example.backend.repository.CommitmentRepository;
import com.example.backend.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class ApplicationUserService {
    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    private CommitmentRepository commitmentRepository;

    @Autowired
    private FileRepository fileRepository;

    private final PasswordEncoder passwordEncoder;

    private final ApplicationUserRepository applicationUserRepository;

    public ApplicationUserService(PasswordEncoder passwordEncoder, ApplicationUserRepository applicationUserRepository) {
        this.passwordEncoder = passwordEncoder;
        this.applicationUserRepository = applicationUserRepository;
    }

    @Transactional(readOnly = true)
    public ApplicationUserDTO findById(Long id){
        return applicationUserRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Transactional(readOnly = true)
    public ApplicationUserDTO findByToken(String token){
        return applicationUserRepository.findByToken(token).map(this::toDto).orElse(null);
    }

    @Transactional(readOnly = true)
    public Set<ApplicationUserDTO> findAll(){
        return toDto(applicationUserRepository.findAll());
    }

    @Transactional(readOnly = true)
    public Set<ApplicationUserDTO> findAllByClassroom(Long classroomId){
        return toDto(applicationUserRepository.findAllByClassId(classroomId));
    }

    @Transactional(readOnly = true)
    public Set<ApplicationUserDTO> findAllByIds(List<Long> ids) {
        return toDto(applicationUserRepository.findAllById(ids));
    }

    public ApplicationUserDTO save(ApplicationUserDTO applicationUserDTO){
        return toDto(applicationUserRepository.save(toEntity(applicationUserDTO)));
    }

    public ApplicationUserDTO update(ApplicationUserDTO applicationUserDTO){
        return toDto(applicationUserRepository.save(toEntity(applicationUserDTO)));
    }

    public ApplicationUserDTO updatePassword(ApplicationUserDTO applicationUserDTO){
        applicationUserDTO.setPassword(passwordEncoder.encode(applicationUserDTO.getPassword()));
        return toDto(applicationUserRepository.save(toEntity(applicationUserDTO)));
    }

    public void delete(Long id){
        applicationUserRepository.deleteById(id);
    }

    public ApplicationUserDTO toDto(ApplicationUser applicationUser){
        if (applicationUser == null) return null;

        ApplicationUserDTO applicationUserDTO = new ApplicationUserDTO();

        applicationUserDTO.setId(applicationUser.getId());
        applicationUserDTO.setName(applicationUser.getName());
        applicationUserDTO.setEmail(applicationUser.getEmail());
        applicationUserDTO.setPassword(applicationUser.getPassword());
        applicationUserDTO.setRole(applicationUser.getRole());
        if(applicationUser.getProfilePicture() != null){
            applicationUserDTO.setProfilePictureId(applicationUser.getProfilePicture().getId());
        } else {
            applicationUserDTO.setProfilePictureId(null);
        }
        applicationUserDTO.setClassRoomIds(applicationUser.getClassRooms()
                .stream().map(Classroom::getId)
                .collect(Collectors.toSet()));
        applicationUserDTO.setCommitmentIds(applicationUser.getCommitments()
                .stream().map(Commitment::getId)
                .collect(Collectors.toSet()));

        return applicationUserDTO;
    }

    public Set<ApplicationUserDTO> toDto(List<ApplicationUser> applicationUsers){
        return applicationUsers.stream().map(this::toDto).collect(Collectors.toSet());
    }

    public ApplicationUser toEntity(ApplicationUserDTO applicationUserDTO){
        if(applicationUserDTO == null) return null;

        ApplicationUser applicationUser = new ApplicationUser();

        applicationUser.setId(applicationUserDTO.getId());
        applicationUser.setName(applicationUserDTO.getName());
        applicationUser.setEmail(applicationUserDTO.getEmail());
        applicationUser.setPassword(applicationUserDTO.getPassword());
        applicationUser.setRole(applicationUserDTO.getRole());
        if (applicationUserDTO.getProfilePictureId() != null) {
            applicationUser.setProfilePicture(
                    fileRepository.findById(applicationUserDTO.getProfilePictureId()).orElse(null));
        } else {
            applicationUser.setProfilePicture(null);
        }
        applicationUser.setClassRooms(
                applicationUserDTO.getClassRoomIds().stream()
                        .map(id -> classroomRepository.findById(id))
                        .filter(Optional::isPresent)
                        .map(Optional::get)
                        .collect(Collectors.toSet())
        );

        applicationUser.setCommitments(
                applicationUserDTO.getCommitmentIds().stream()
                        .map(id -> commitmentRepository.findById(id))
                        .filter(Optional::isPresent)
                        .map(Optional::get)
                        .collect(Collectors.toSet())
        );

        return applicationUser;
    }
}
