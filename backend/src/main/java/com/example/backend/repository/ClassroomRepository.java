package com.example.backend.repository;

import com.example.backend.model.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassroomRepository extends JpaRepository<Classroom, Long> {
    @Query("SELECT classroom FROM Classroom classroom INNER JOIN classroom.users users WHERE users.id = ?1")
    List<Classroom> findAllByApplicationUser(Long id);
}
