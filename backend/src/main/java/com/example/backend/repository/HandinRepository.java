package com.example.backend.repository;

import com.example.backend.model.Handin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HandinRepository extends JpaRepository<Handin, Long> {
}
