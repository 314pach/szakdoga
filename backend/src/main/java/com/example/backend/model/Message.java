package com.example.backend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Table
@Entity
public class Message {
    @Id
    @SequenceGenerator(
            name = "message_sequence",
            sequenceName = "message_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "message_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;
    @Column(
            name = "timestamp",
            nullable = false,
            columnDefinition = "TIMESTAMP"
    )
    private LocalDateTime timestamp;
    @Column(
            name = "body",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String body;
    @Column(
            name = "status",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String status;
    @Column(
            name = "labels",
            columnDefinition = "TEXT"
    )
    private String labels;
    @ManyToOne(
            fetch = FetchType.LAZY
    )
    @JoinColumn(
            name = "sender_id"
    )
    @OnDelete(
            action = OnDeleteAction.NO_ACTION
    )
    private ApplicationUser sender;
    @ManyToOne(
            fetch = FetchType.LAZY
    )
    @JoinColumn(
            name = "receiver_id"
    )
    @OnDelete(
            action = OnDeleteAction.NO_ACTION
    )
    private ApplicationUser receiver;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLabels() {
        return labels;
    }

    public void setLabels(String labels) {
        this.labels = labels;
    }

    public ApplicationUser getSender() {
        return sender;
    }

    public void setSender(ApplicationUser sender) {
        this.sender = sender;
    }

    public ApplicationUser getReceiver() {
        return receiver;
    }

    public void setReceiver(ApplicationUser receiver) {
        this.receiver = receiver;
    }
}
