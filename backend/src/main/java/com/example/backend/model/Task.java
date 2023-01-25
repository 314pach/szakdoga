package com.example.backend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Table
@Entity(name = "Task")
public class Task {

    @Id
    @SequenceGenerator(
            name = "task_sequence",
            sequenceName = "task_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "task_sequence"
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
            name = "summary",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String summary;
    @Column(
            name = "description",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String description;
    @Column(
            name = "points",
            nullable = false
    )
    private Integer points;
    @Column(
            name = "teamwork",
            nullable = false
    )
    private Boolean teamwork;
    @Column(
            name = "headcount",
            nullable = false
    )
    private Integer headcount;
    @ManyToOne(
            fetch = FetchType.LAZY
    )
    @JoinColumn(
            name = "modul_id"
    )
    @OnDelete(
            action = OnDeleteAction.NO_ACTION
    )
    private Modul modul;

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

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public Boolean getTeamwork() {
        return teamwork;
    }

    public void setTeamwork(Boolean teamwork) {
        this.teamwork = teamwork;
    }

    public Integer getHeadcount() {
        return headcount;
    }

    public void setHeadcount(Integer headcount) {
        this.headcount = headcount;
    }

    public Modul getModul() {
        return modul;
    }

    public void setModul(Modul modul) {
        this.modul = modul;
    }
}
