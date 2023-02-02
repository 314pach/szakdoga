package com.example.backend.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Table
@Entity(name = "Classroom")
public class Classroom {
    @Id
    @SequenceGenerator(
            name = "classroom_sequence",
            sequenceName = "classroom_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "classroom_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;
    @Column(
            name = "name",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String name;
    @Column(
            name = "subject",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String subject;
    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.MERGE, CascadeType.REFRESH}
    )
    @JoinTable(
            name = "learns",
            inverseJoinColumns =
                    @JoinColumn(name = "modul_id"),
            joinColumns =
                    @JoinColumn(name = "classroom_id")
    )
    private Set<Modul> moduls = new HashSet<>();
    @ManyToMany(
            cascade = {CascadeType.MERGE, CascadeType.REFRESH},
            fetch = FetchType.LAZY
    )
    @JoinTable(
            name = "attends",
            inverseJoinColumns =
            @JoinColumn(name = "user_id"),
            joinColumns =
            @JoinColumn(name = "classroom_id")
    )
    private Set<ApplicationUser> users = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Set<Modul> getModuls() {
        return moduls;
    }

    public void setModuls(Set<Modul> moduls) {
        this.moduls = moduls;
    }

    public Set<ApplicationUser> getUsers() {
        return users;
    }

    public void setUsers(Set<ApplicationUser> users) {
        this.users = users;
    }
}
