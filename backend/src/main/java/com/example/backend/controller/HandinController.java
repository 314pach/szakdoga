package com.example.backend.controller;

import com.example.backend.model.dto.HandinDTO;
import com.example.backend.service.HandinService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/handin")
public class HandinController {
    private final HandinService handinService;

    public HandinController(HandinService handinService) {
        this.handinService = handinService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<Set<HandinDTO>> getAllHandins(){
        Set<HandinDTO> handinDTOS = handinService.findAll();
        return new ResponseEntity<>(handinDTOS, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<HandinDTO> findHandinById(@PathVariable("id") Long id){
        HandinDTO handinDTO = handinService.findById(id);
        return new ResponseEntity<>(handinDTO, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<HandinDTO> addHandin(@RequestBody() HandinDTO handinDTO){
        HandinDTO newHandin = handinService.save(handinDTO);
        return new ResponseEntity<>(newHandin, HttpStatus.CREATED);
    }

    @PostMapping("/update")
    public ResponseEntity<HandinDTO> updateHandin(@RequestBody() HandinDTO handinDTO){
        HandinDTO updatedHandin = handinService.save(handinDTO);
        return new ResponseEntity<>(updatedHandin, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteHandin(@PathVariable("id") Long id){
        handinService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
