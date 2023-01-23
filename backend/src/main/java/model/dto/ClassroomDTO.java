package model.dto;

import java.util.Set;

public class ClassroomDTO {
    private Long id;
    private String name;
    private String subject;
    private Set<Long> modulIds;
    private Set<Long> applicationUserIds;

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

    public Set<Long> getModulIds() {
        return modulIds;
    }

    public void setModulIds(Set<Long> modulIds) {
        this.modulIds = modulIds;
    }

    public Set<Long> getApplicationUserIds() {
        return applicationUserIds;
    }

    public void setApplicationUserIds(Set<Long> applicationUserIds) {
        this.applicationUserIds = applicationUserIds;
    }
}
