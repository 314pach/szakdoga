package com.example.backend.controller;

import com.example.backend.model.dto.BadgeDTO;
import com.example.backend.service.BadgeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/badge")
public class BadgeController {
    private final BadgeService badgeService;

    public BadgeController(BadgeService badgeService) {
        this.badgeService = badgeService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<Set<BadgeDTO>> getAllBadges(){
        Set<BadgeDTO> badgeDTOS = badgeService.findAll();
        return new ResponseEntity<>(badgeDTOS, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<BadgeDTO> getBadgeById(@PathVariable("id") Long id){
        BadgeDTO badgeDTO = badgeService.findById(id);
        return new ResponseEntity<>(badgeDTO, HttpStatus.OK);
    }

    @PostMapping("/findBadgesByIds")
    public ResponseEntity<Set<BadgeDTO>> getBadgesByIds(@RequestBody() List<Long> badgeIds) {
        Set<BadgeDTO> badgeDTOS = badgeService.findAllByIds(badgeIds);
        return new ResponseEntity<>(badgeDTOS, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<BadgeDTO> addBadge(@RequestBody() BadgeDTO badgeDTO){
        BadgeDTO newBadge = badgeService.save(badgeDTO);
        return new ResponseEntity<>(newBadge, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<BadgeDTO> updateBadge(@RequestBody() BadgeDTO badgeDTO){
        BadgeDTO updatedBadge = badgeService.save(badgeDTO);
        return new ResponseEntity<>(updatedBadge, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id){
        badgeService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
