package com.example.backend.repository;

import com.example.backend.model.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationUserRepository extends JpaRepository<ApplicationUser, Long> {

    Optional<ApplicationUser> findByEmail(String email);

    @Query("SELECT user FROM ApplicationUser user WHERE user IN (SELECT classroom.users FROM Classroom classroom WHERE classroom.id = ?1)")
    List<ApplicationUser> findAllByClassId(Long id);

    @Query("SELECT user FROM ApplicationUser user WHERE user.id in ?1")
    List<ApplicationUser> findAllById(List<Long> userIds);

    @Query("SELECT user FROM ApplicationUser user INNER JOIN Token token ON token.applicationUser.id = user.id WHERE token.token = ?1")
    Optional<ApplicationUser> findByToken(String token);
}
