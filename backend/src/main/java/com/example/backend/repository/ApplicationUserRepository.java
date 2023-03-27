package com.example.backend.repository;

import com.example.backend.model.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationUserRepository extends JpaRepository<ApplicationUser, Long> {
    @Query("SELECT user FROM ApplicationUser user WHERE user IN (SELECT classroom.users FROM Classroom classroom WHERE classroom.id = ?1)")
    List<ApplicationUser> findAllByClassId(Long id);

    @Query("SELECT user FROM ApplicationUser user WHERE user.id in ?1")
    List<ApplicationUser> findAllById(List<Long> userIds);
}
