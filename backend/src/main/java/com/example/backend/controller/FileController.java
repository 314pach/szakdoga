package com.example.backend.controller;

import com.example.backend.model.File;
import com.example.backend.service.FileService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/file")
public class FileController {
    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Long> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            File newFile = fileService.store(file);

            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return new ResponseEntity<Long>(newFile.getId(), HttpStatus.CREATED);
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/files/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id) {
        File fileDB = fileService.getFile(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
                .contentType(fileService.checkFileType(fileDB.getName()))
                .body(fileDB.getData());
    }

    @GetMapping("/images/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) throws IllegalAccessException {
        File fileDB = fileService.getFile(id);

        MediaType type = fileService.checkIfFileImage(fileDB.getName());
        if (type == null){
            throw new  IllegalAccessException("not an image");
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
                .contentType(type)
                .body(fileDB.getData());
    }
}
