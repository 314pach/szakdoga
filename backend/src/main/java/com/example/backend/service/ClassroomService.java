package com.example.backend.service;

import com.example.backend.model.ApplicationUser;
import com.example.backend.model.Classroom;
import com.example.backend.model.Modul;
import com.example.backend.model.dto.ClassroomDTO;
import com.example.backend.repository.ApplicationUserRepository;
import com.example.backend.repository.ClassroomRepository;
import com.example.backend.repository.ModulRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class ClassroomService {
    @Autowired
    private ApplicationUserRepository applicationUserRepository;

    @Autowired
    private ModulRepository modulRepository;

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
        Classroom classroom = this.toEntity(classroomDTO);
        classroomRepository.save(classroom);
        return toDto(classroomRepository.save(classroom));
    }

    public ClassroomDTO update(ClassroomDTO classroomDTO){
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
        classroom.setModuls(
                classroomDTO.getModulIds().stream()
                        .map(id -> modulRepository.findById(id))
                        .filter(Optional::isPresent)
                        .map(Optional::get)
                        .collect(Collectors.toSet())
        );
        classroom.setUsers(
                classroomDTO.getApplicationUserIds().stream()
                        .map(id -> applicationUserRepository.findById(id))
                        .filter(Optional::isPresent)
                        .map(Optional::get)
                        .collect(Collectors.toSet())
        );

        return classroom;
    }
}
