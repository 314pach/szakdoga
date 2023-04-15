package com.example.backend.service;

import com.example.backend.model.Classroom;
import com.example.backend.model.Modul;
import com.example.backend.model.dto.ModulDTO;
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
public class ModulService {
    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    ApplicationUserRepository applicationUserRepository;

    private final ModulRepository modulRepository;

    public ModulService(ModulRepository modulRepository) {
        this.modulRepository = modulRepository;
    }

    @Transactional(readOnly = true)
    public ModulDTO findById(Long id) {
        return modulRepository.findById(id).filter(modul -> !modul.getDeleted()).map(this::toDto).orElse(null);
    }

    @Transactional(readOnly = true)
    public Set<ModulDTO> findAll() {
        return toDto(modulRepository.findAll().stream().filter(modul -> !modul.getDeleted()).collect(Collectors.toList()));
    }

    @Transactional(readOnly = true)
    public Set<ModulDTO> findAllByClassroomId(List<Long> classroomId) {
        return toDto(modulRepository.findAllById(classroomId).stream().filter(modul -> !modul.getDeleted()).collect(Collectors.toList()));
    }

    @Transactional(readOnly = true)
    public Set<ModulDTO> findAllByCreatorId(Long creatorId) {
        return toDto(modulRepository.findAllByCreator_Id(creatorId).stream().filter(modul -> !modul.getDeleted()).collect(Collectors.toList()));
    }

    public ModulDTO save(ModulDTO modulDTO) {
        return toDto(modulRepository.save(toEntity(modulDTO)));
    }

    public ModulDTO update(ModulDTO modulDTO) {
        return toDto(modulRepository.save(toEntity(modulDTO)));
    }

    public void delete(Long id) {
        modulRepository.deleteById(id);
    }

    public ModulDTO toDto(Modul modul) {
        if (modul == null) return null;

        ModulDTO modulDTO = new ModulDTO();

        modulDTO.setId(modul.getId());
        modulDTO.setDeleted(modul.getDeleted());
        modulDTO.setTitle(modul.getTitle());
        modulDTO.setBannerPath(modul.getBannerPath());
        modulDTO.setBeginning(modul.getBeginning());
        modulDTO.setEnd(modul.getEnd());
        modulDTO.setPointsFor2(modul.getPointsFor2());
        modulDTO.setPointsFor3(modul.getPointsFor3());
        modulDTO.setPointsFor4(modul.getPointsFor4());
        modulDTO.setPointsFor5(modul.getPointsFor5());
        modulDTO.setCreatorId(modul.getCreator().getId());
        modulDTO.setClassRoomIds(modul.getClasses()
                .stream().map(Classroom::getId)
                .collect(Collectors.toSet()));

        return modulDTO;
    }

    public Set<ModulDTO> toDto(List<Modul> moduls) {
        return moduls.stream().map(this::toDto).collect(Collectors.toSet());
    }

    public Modul toEntity(ModulDTO modulDTO) {
        if (modulDTO == null) return null;

        Modul modul = new Modul();

        modul.setId(modulDTO.getId());
        modul.setDeleted(modulDTO.getDeleted());
        modul.setTitle(modulDTO.getTitle());
        modul.setBannerPath(modulDTO.getBannerPath());
        modul.setBeginning(modulDTO.getBeginning());
        modul.setEnd(modulDTO.getEnd());
        modul.setPointsFor2(modulDTO.getPointsFor2());
        modul.setPointsFor3(modulDTO.getPointsFor3());
        modul.setPointsFor4(modulDTO.getPointsFor4());
        modul.setPointsFor5(modulDTO.getPointsFor5());
        applicationUserRepository.findById(modulDTO.getCreatorId()).ifPresent(modul::setCreator);
        modul.setClasses(
                modulDTO.getClassRoomIds().stream()
                .map(id -> classroomRepository.findById(id))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet())
        );

        return modul;
    }
}
