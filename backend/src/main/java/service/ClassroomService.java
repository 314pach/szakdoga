package service;

import model.ApplicationUser;
import model.Classroom;
import model.Modul;
import model.dto.ClassroomDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import repository.ClassroomRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class ClassroomService {
    @Autowired
    private ApplicationUserService applicationUserService;

    @Autowired
    private ModulService modulService;

    private final ClassroomRepository classroomRepository;

    public ClassroomService(ClassroomRepository classroomRepository) {
        this.classroomRepository = classroomRepository;
    }

    @Transactional(readOnly = true)
    public ClassroomDTO findById(Long id){
        return classroomRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Transactional(readOnly = true)
    public Set<ClassroomDTO> findAll(){
        return toDto(classroomRepository.findAll());
    }

    public ClassroomDTO save(ClassroomDTO classroomDTO){
        return toDto(classroomRepository.save(toEntity(classroomDTO)));
    }

    public void delete(Long id){
        classroomRepository.deleteById(id);
    }

    public ClassroomDTO toDto(Classroom classroom){
        if(classroom == null) return null;

        ClassroomDTO classroomDTO = new ClassroomDTO();

        classroomDTO.setId(classroom.getId());
        classroomDTO.setName(classroom.getName());
        classroomDTO.setSubject(classroom.getSubject());
        classroomDTO.setModulIds(classroom.getModuls()
                .stream().map(Modul::getId)
                .collect(Collectors.toSet()));
        classroomDTO.setApplicationUserIds(classroom.getUsers()
                .stream().map(ApplicationUser::getId)
                .collect(Collectors.toSet()));

        return classroomDTO;
    }

    public Set<ClassroomDTO> toDto(List<Classroom> classrooms){
        return classrooms.stream().map(this::toDto).collect(Collectors.toSet());
    }

    public Classroom toEntity(ClassroomDTO classroomDTO){
        if(classroomDTO == null) return null;

        Classroom classroom = new Classroom();

        classroom.setId(classroomDTO.getId());
        classroom.setName(classroomDTO.getName());
        classroom.setSubject(classroomDTO.getSubject());
        classroom.setModuls(classroomDTO.getModulIds()
                .stream().map(modulId ->
                        modulService.toEntity(modulService.findById(modulId)))
                .collect(Collectors.toSet())
        );
        classroom.setUsers(classroomDTO.getApplicationUserIds()
                .stream().map(
                        userId -> applicationUserService.toEntity(applicationUserService.findById(userId)))
                .collect(Collectors.toSet())
        );

        return classroom;
    }
}
