package com.example.backend.model.dto;

import java.time.LocalDate;
import java.util.Set;

public class ModulDTO {
    private Long id;
    private String title;
    private LocalDate beginning;
    private LocalDate end;
    private Integer pointsFor2;
    private Integer pointsFor3;
    private Integer pointsFor4;
    private Integer pointsFor5;
    private String bannerPath;
    private Long creatorId;
    private Set<Long> classRoomIds;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getBeginning() {
        return beginning;
    }

    public void setBeginning(LocalDate beginning) {
        this.beginning = beginning;
    }

    public LocalDate getEnd() {
        return end;
    }

    public void setEnd(LocalDate end) {
        this.end = end;
    }

    public Integer getPointsFor2() {
        return pointsFor2;
    }

    public void setPointsFor2(Integer pointsFor2) {
        this.pointsFor2 = pointsFor2;
    }

    public Integer getPointsFor3() {
        return pointsFor3;
    }

    public void setPointsFor3(Integer pointsFor3) {
        this.pointsFor3 = pointsFor3;
    }

    public Integer getPointsFor4() {
        return pointsFor4;
    }

    public void setPointsFor4(Integer pointsFor4) {
        this.pointsFor4 = pointsFor4;
    }

    public Integer getPointsFor5() {
        return pointsFor5;
    }

    public void setPointsFor5(Integer pointsFor5) {
        this.pointsFor5 = pointsFor5;
    }

    public String getBannerPath() {
        return bannerPath;
    }

    public void setBannerPath(String bannerPath) {
        this.bannerPath = bannerPath;
    }

    public Long getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }

    public Set<Long> getClassRoomIds() {
        return classRoomIds;
    }

    public void setClassRoomIds(Set<Long> classRoomIds) {
        this.classRoomIds = classRoomIds;
    }
}
