package com.example.backend.model;

import jakarta.persistence.*;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Table
@Entity
public class Badge {
    @Id
    @SequenceGenerator(
            name = "badge_sequence",
            sequenceName = "badge_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "badge_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;
    @Column(
            name = "tooltip",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String tooltip;
    @Column(
            name = "icon",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String icon;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTooltip() {
        return tooltip;
    }

    public void setTooltip(String tooltip) {
        this.tooltip = tooltip;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}
