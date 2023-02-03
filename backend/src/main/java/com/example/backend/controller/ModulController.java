package com.example.backend.controller;

import com.example.backend.model.dto.ModulDTO;
import com.example.backend.service.ModulService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/modul")
public class ModulController {
    private final ModulService modulService;

    public ModulController(ModulService modulService) {
        this.modulService = modulService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<Set<ModulDTO>> getAllModuls(){
        Set<ModulDTO> modulDTOS = modulService.findAll();
        return new ResponseEntity<>(modulDTOS, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<ModulDTO> getModulById(@PathVariable("id") Long id){
        ModulDTO modulDTO = modulService.findById(id);
        return new ResponseEntity<>(modulDTO, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ModulDTO> addModul(@RequestBody() ModulDTO modulDTO){
        ModulDTO newModul = modulService.save(modulDTO);
        return new ResponseEntity<>(newModul, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<ModulDTO> updateModul(@RequestBody() ModulDTO modulDTO){
        ModulDTO updatedModul = modulService.update(modulDTO);
        return new ResponseEntity<>(updatedModul, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteModul(@PathVariable("id") Long id){
        modulService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
