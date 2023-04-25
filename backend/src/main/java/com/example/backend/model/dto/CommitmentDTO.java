package com.example.backend.model.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class CommitmentDTO {
    private Long id;
    private Integer points;
    private String status;
    private Date deadline;
    private Long taskId;
    private Set<Long> studentIds = new HashSet<>();

    private Set<Long> badgeIds = new HashSet<>();

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

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public Set<Long> getStudentIds() {
        return studentIds;
    }

    public void setStudentIds(Set<Long> studentIds) {
        this.studentIds = studentIds;
    }

    public Set<Long> getBadgeIds() {
        return badgeIds;
    }

    public void setBadgeIds(Set<Long> badgeIds) {
        this.badgeIds = badgeIds;
    }
}
