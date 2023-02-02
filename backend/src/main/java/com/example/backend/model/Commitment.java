package com.example.backend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Table
@Entity(name = "Commitment")
public class Commitment {
    @Id
    @SequenceGenerator(
            name = "commitment_sequence",
            sequenceName = "commitment_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "commitment_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;
    @Column(
            name = "poits",
            nullable = false
    )
    private Integer points;
    @Column(
            name = "status",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String status;
    @Column(
            name = "deadline",
            nullable = false
    )
    private LocalDate deadline;
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
    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}
    )
    @JoinTable(
            name = "commits",
            inverseJoinColumns =
                    @JoinColumn(name = "student_id"),
            joinColumns =
                    @JoinColumn(name = "commitment_id")
    )
    private Set<ApplicationUser> students = new HashSet<>();
    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}
    )
    @JoinTable(
            name = "awards",
            inverseJoinColumns =
            @JoinColumn(name = "badge_id"),
            joinColumns =
            @JoinColumn(name = "commitment_id")
    )
    private Set<Badge> badges = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public Set<ApplicationUser> getStudents() {
        return students;
    }

    public void setStudents(Set<ApplicationUser> students) {
        this.students = students;
    }

    public Set<Badge> getBadges() {
        return badges;
    }

    public void setBadges(Set<Badge> badges) {
        this.badges = badges;
    }
}
