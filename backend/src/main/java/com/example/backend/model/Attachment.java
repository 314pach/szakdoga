package com.example.backend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Table
@Entity
public class Attachment {
    @Id
    @SequenceGenerator(
            name = "attachment_sequence",
            sequenceName = "attachment_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "attachment_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;
    @Column(
            name = "path",
            nullable = true,
            columnDefinition = "TEXT"
    )
    private String path;

    @Column(
            name = "type",
            nullable = false,
            columnDefinition = "TEXT"
    )
    @Enumerated(EnumType.STRING)
    private AttachmentType type;
    @ManyToOne(
            fetch = FetchType.LAZY
    )
    @JoinColumn(
            name = "task_id"
    )
    @OnDelete(
            action = OnDeleteAction.NO_ACTION
    )
    private Task task;
    @ManyToOne(
            fetch = FetchType.LAZY
    )
    @JoinColumn(
            name = "uploader_id"
    )
    @OnDelete(
            action = OnDeleteAction.NO_ACTION
    )
    private ApplicationUser uploader;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fileId", referencedColumnName = "id", nullable = true)
    private File file;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public AttachmentType getType() {
        return type;
    }

    public void setType(AttachmentType type) {
        this.type = type;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public ApplicationUser getUploader() {
        return uploader;
    }

    public void setUploader(ApplicationUser uploader) {
        this.uploader = uploader;
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }
}
