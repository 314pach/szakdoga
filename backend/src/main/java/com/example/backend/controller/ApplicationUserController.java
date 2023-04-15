package com.example.backend.controller;

import com.example.backend.model.dto.ApplicationUserDTO;
import com.example.backend.service.ApplicationUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/user")
public class ApplicationUserController {
    private final ApplicationUserService applicationUserService;

    public ApplicationUserController(ApplicationUserService applicationUserService) {
        this.applicationUserService = applicationUserService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<Set<ApplicationUserDTO>> getAllUsers(){
        Set<ApplicationUserDTO> userDTOS = applicationUserService.findAll();
        return new ResponseEntity<>(userDTOS, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<ApplicationUserDTO> getUserById(@PathVariable("id") Long id){
        ApplicationUserDTO applicationUserDTO = applicationUserService.findById(id);
        return new ResponseEntity<>(applicationUserDTO, HttpStatus.OK);
    }

    @GetMapping("/findUserByToken/{token}")
    public ResponseEntity<ApplicationUserDTO> getUserByToken(@PathVariable("token") String token){
        ApplicationUserDTO applicationUserDTO = applicationUserService.findByToken(token);
        return new ResponseEntity<>(applicationUserDTO, HttpStatus.OK);
    }

    @GetMapping("/findUsersByClassroom/{classroomId}")
    public ResponseEntity<Set<ApplicationUserDTO>> getAllUsersByClassroom(@PathVariable("classroomId") Long classroomId){
        Set<ApplicationUserDTO> userDTOS = applicationUserService.findAllByClassroom(classroomId);
        return new ResponseEntity<>(userDTOS, HttpStatus.OK);
    }

    @PostMapping("/findUsersByIds")
    public ResponseEntity<Set<ApplicationUserDTO>> getUsersByIds(@RequestBody() List<Long> userIds){
        Set<ApplicationUserDTO> applicationUserDTOS = applicationUserService.findAllByIds(userIds);
        return new ResponseEntity<>(applicationUserDTOS, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ApplicationUserDTO> addUser(@RequestBody() ApplicationUserDTO applicationUserDTO){
        ApplicationUserDTO newApplicationUser = applicationUserService.save(applicationUserDTO);
        return new ResponseEntity<>(newApplicationUser, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<ApplicationUserDTO> updateUser(@RequestBody() ApplicationUserDTO applicationUserDTO){
        ApplicationUserDTO updatedApplicationUser = applicationUserService.update(applicationUserDTO);
        return new ResponseEntity<>(updatedApplicationUser, HttpStatus.OK);
    }

    @PutMapping("/updatePassword")
    public ResponseEntity<ApplicationUserDTO> updateUserPassword(@RequestBody() ApplicationUserDTO applicationUserDTO){
        ApplicationUserDTO updatedApplicationUser = applicationUserService.updatePassword(applicationUserDTO);
        return new ResponseEntity<>(updatedApplicationUser, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id){
        applicationUserService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
