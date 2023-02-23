package com.example.backend.model.dto;

import com.example.backend.model.Role;

import java.util.HashSet;
import java.util.Set;

public class ApplicationUserDTO {
    private Long id;
    private String name;
    private String email;
    private String password;
    private Role role;
    private Set<Long> classRoomIds = new HashSet<>();

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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Set<Long> getClassRoomIds() {
        return classRoomIds;
    }

    public void setClassRoomIds(Set<Long> classRoomIds) {
        this.classRoomIds = classRoomIds;
    }

    public Set<Long> getCommitmentIds() {
        return commitmentIds;
    }

    public void setCommitmentIds(Set<Long> commitmentIds) {
        this.commitmentIds = commitmentIds;
    }
}
