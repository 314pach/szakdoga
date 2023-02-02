package com.example.backend.model.dto;

import java.util.HashSet;
import java.util.Set;

public class ApplicationUserDTO {
    private Long id;
    private String name;
    private String email;
    private String password;
    private Boolean role;
    private Set<Long> classroomIds = new HashSet<>();

    private Set<Long> commitmentIds = new HashSet<>();

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getRole() {
        return role;
    }

    public void setRole(Boolean role) {
        this.role = role;
    }

    public Set<Long> getClassroomIds() {
        return classroomIds;
    }

    public void setClassroomIds(Set<Long> classroomIds) {
        this.classroomIds = classroomIds;
    }

    public Set<Long> getCommitmentIds() {
        return commitmentIds;
    }

    public void setCommitmentIds(Set<Long> commitmentIds) {
        this.commitmentIds = commitmentIds;
    }
}
