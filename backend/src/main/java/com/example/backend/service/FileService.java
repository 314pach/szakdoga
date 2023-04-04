package com.example.backend.service;

import com.example.backend.model.File;
import com.example.backend.repository.FileRepository;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;
import java.util.stream.Stream;

@Service
@Transactional
public class FileService {
    private final FileRepository fileRepository;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public File store(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        File File = new File(fileName, file.getContentType(), file.getBytes());

        return fileRepository.save(File);
    }

    public File getFile(Long id) {
        return fileRepository.findById(id).get();
    }

    public Stream<File> getAllFiles() {
        return fileRepository.findAll().stream();
    }

    public MediaType checkIfFileImage(String filename) {
        String fileType = filename.split("\\.")[1];
        if(Objects.equals(fileType, "png")) return MediaType.IMAGE_PNG;
        else if(Objects.equals(fileType, "jpeg") || Objects.equals(fileType, "jpg")) return MediaType.IMAGE_JPEG;
        else if(Objects.equals(fileType, "gif")) return MediaType.IMAGE_GIF;
        else return null;
    }

    public MediaType checkFileType(String filename) {
        String fileType = filename.split("\\.")[1];
        if(Objects.equals(fileType, "png")) return MediaType.IMAGE_PNG;
        else if(Objects.equals(fileType, "jpeg") || Objects.equals(fileType, "jpg")) return MediaType.IMAGE_JPEG;
        else if(Objects.equals(fileType, "gif")) return MediaType.IMAGE_GIF;
        else if(Objects.equals(fileType, "pdf")) return MediaType.APPLICATION_PDF;
        else return MediaType.TEXT_PLAIN;
    }
}
