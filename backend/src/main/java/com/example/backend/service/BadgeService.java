package com.example.backend.service;

import com.example.backend.model.Badge;
import com.example.backend.model.dto.BadgeDTO;
import com.example.backend.repository.BadgeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class BadgeService {
    private final BadgeRepository badgeRepository;

    public BadgeService(BadgeRepository badgeRepository) {
        this.badgeRepository = badgeRepository;
    }

    @Transactional(readOnly = true)
    public BadgeDTO findById(Long id){
        return badgeRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Transactional(readOnly = true)
    public Set<BadgeDTO> findAll(){
        return toDto(badgeRepository.findAll());
    }

    public BadgeDTO save(BadgeDTO badgeDTO){
        return toDto(badgeRepository.save(toEntity(badgeDTO)));
    }

    public BadgeDTO update(BadgeDTO badgeDTO){
        return toDto(badgeRepository.save(toEntity(badgeDTO)));
    }

    public void delete(Long id){
        badgeRepository.deleteById(id);
    }

    public BadgeDTO toDto(Badge badge){
        if(badge == null) return null;

        BadgeDTO badgeDTO = new BadgeDTO();

        badgeDTO.setId(badge.getId());
        badgeDTO.setTooltip(badge.getTooltip());
        badgeDTO.setIcon(badge.getIcon());

        return badgeDTO;
    }

    public Set<BadgeDTO> toDto(List<Badge> badges){
        return badges.stream().map(this::toDto).collect(Collectors.toSet());
    }

    public Badge toEntity(BadgeDTO badgeDTO){
        if(badgeDTO == null) return null;

        Badge badge = new Badge();

        badge.setId(badgeDTO.getId());
        badge.setTooltip(badgeDTO.getTooltip());
        badge.setIcon(badgeDTO.getIcon());

        return badge;
    }
}
