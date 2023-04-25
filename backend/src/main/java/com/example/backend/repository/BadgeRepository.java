package com.example.backend.repository;

import com.example.backend.model.Badge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BadgeRepository extends JpaRepository<Badge, Long> {
    @Query("SELECT badge FROM Badge badge WHERE badge.id in ?1")
    List<Badge> findAllById(List<Long> badgeIds);
}
