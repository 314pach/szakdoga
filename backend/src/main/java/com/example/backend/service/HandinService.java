package com.example.backend.service;

import com.example.backend.model.Handin;
import com.example.backend.model.dto.HandinDTO;
import com.example.backend.repository.ApplicationUserRepository;
import com.example.backend.repository.CommitmentRepository;
import com.example.backend.repository.HandinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class HandinService {
    @Autowired
    private ApplicationUserRepository applicationUserRepository;

    @Autowired
    private CommitmentRepository commitmentRepository;

    private final HandinRepository handinRepository;

    public HandinService(HandinRepository handinRepository) {
        this.handinRepository = handinRepository;
    }

    @Transactional(readOnly = true)
    public HandinDTO findById(Long id){
        return handinRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Transactional(readOnly = true)
    public Set<HandinDTO> findAll(){
        return toDto(handinRepository.findAll());
    }

    public HandinDTO save(HandinDTO handinDTO){
        return toDto(handinRepository.save(toEntity(handinDTO)));
    }

    public HandinDTO update(HandinDTO handinDTO){
        return toDto(handinRepository.save(toEntity(handinDTO)));
    }

    public void delete(Long id){
        handinRepository.deleteById(id);
    }

    public HandinDTO toDto(Handin handin){
        if(handin == null) return null;

        HandinDTO handinDTO = new HandinDTO();

        handinDTO.setId(handin.getId());
        handinDTO.setPath(handin.getPath());
        handinDTO.setTimestamp(handin.getTimestamp());
        handinDTO.setCommitmentId(handin.getCommitment().getId());
        handinDTO.setUploaderId(handin.getUploader().getId());

        return handinDTO;
    }

    public Set<HandinDTO> toDto(List<Handin> handins){
        return handins.stream().map(this::toDto).collect(Collectors.toSet());
    }

    public Handin toEntity(HandinDTO handinDTO){
        if(handinDTO == null) return null;

        Handin handin = new Handin();

        handin.setId(handinDTO.getId());
        handin.setPath(handinDTO.getPath());
        handin.setTimestamp(handinDTO.getTimestamp());
        commitmentRepository.findById(handinDTO.getCommitmentId()).ifPresent(handin::setCommitment);
        applicationUserRepository.findById(handinDTO.getUploaderId()).ifPresent(handin::setUploader);

        return handin;
    }
}
