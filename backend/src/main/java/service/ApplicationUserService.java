package service;

import model.ApplicationUser;
import model.Classroom;
import model.dto.ApplicationUserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import repository.ApplicationUserRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class ApplicationUserService {

    @Autowired
    private ClassroomService classroomService;
    private final ApplicationUserRepository applicationUserRepository;

    public ApplicationUserService(ApplicationUserRepository applicationUserRepository) {
        this.applicationUserRepository = applicationUserRepository;
    }

    @Transactional(readOnly = true)
    public ApplicationUserDTO findById(Long id){
        return applicationUserRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Transactional(readOnly = true)
    public Set<ApplicationUserDTO> findAll(){
        return toDto(applicationUserRepository.findAll());
    }

    public ApplicationUserDTO save(ApplicationUserDTO applicationUserDTO){
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
        applicationUserDTO.setClassroomIds(applicationUser.getClassrooms()
                .stream().map(Classroom::getId)
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
        applicationUser.setClassrooms(applicationUserDTO.getClassroomIds()
                .stream().map(classroomId -> classroomService.toEntity(classroomService.findById(classroomId)))
                .collect(Collectors.toSet()));

        return applicationUser;
    }
}
