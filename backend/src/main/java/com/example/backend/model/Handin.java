package com.example.backend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Table
@Entity
public class Handin {
    @Id
    @SequenceGenerator(
            name = "handin_sequence",
            sequenceName = "handin_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "handin_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;
    @Column(
            name = "path",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String path;
    @Column(
            name = "timestamp",
            nullable = false,
            columnDefinition = "TIMESTAMP"
    )
    private Date timestamp;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fileId", referencedColumnName = "id", nullable = false)
    private File file;
    @ManyToOne(
            fetch = FetchType.LAZY
    )
    @JoinColumn(
            name = "commitment_id"
    )
    @OnDelete(
            action = OnDeleteAction.NO_ACTION
    )
    private Commitment commitment;
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

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public Commitment getCommitment() {
        return commitment;
    }

    public void setCommitment(Commitment commitment) {
        this.commitment = commitment;
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
