package com.example.backend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Table
@Entity
public class Modul {
    @Id
    @SequenceGenerator(
            name = "modul_sequence",
            sequenceName = "modul_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "modul_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;
    @Column(
            name = "title",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String title;
    @Column(
            name = "beginning",
            nullable = false
    )
    private LocalDate beginning;
    @Column(
            name = "ending",
            nullable = false
    )
    private LocalDate end;
    @Column(
            name = "points_for_2",
            nullable = false
    )
    private Integer pointsFor2;
    @Column(
            name = "points_for_3",
            nullable = false
    )
    private Integer pointsFor3;
    @Column(
            name = "points_for_4",
            nullable = false
    )
    private Integer pointsFor4;
    @Column(
            name = "points_for_5",
            nullable = false
    )
    private Integer pointsFor5;
    @Column(
            name = "banner_path",
            columnDefinition = "TEXT"
    )
    private String bannerPath;
    @ManyToOne(
            fetch = FetchType.LAZY
    )
    @JoinColumn(
            name = "creator_id"
    )
    @OnDelete(
            action = OnDeleteAction.NO_ACTION
    )
    private ApplicationUser creator;
    @ManyToMany(
            mappedBy = "moduls",
            fetch = FetchType.LAZY
    )
    private Set<Classroom> classes = new HashSet<>();

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

    public ApplicationUser getCreator() {
        return creator;
    }

    public void setCreator(ApplicationUser creator) {
        this.creator = creator;
    }

    public Set<Classroom> getClasses() {
        return classes;
    }

    public void setClasses(Set<Classroom> classes) {
        this.classes = classes;
    }
}
