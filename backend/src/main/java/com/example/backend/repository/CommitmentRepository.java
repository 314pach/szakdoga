package com.example.backend.repository;

import com.example.backend.model.Commitment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommitmentRepository extends JpaRepository<Commitment, Long> {
    @Query("SELECT commitment FROM Commitment commitment WHERE ?1 IN (SELECT user.id FROM commitment.students user) AND commitment.task.id IN ?2")
    List<Commitment> test(Long userId, List<Long> taskIds);
}
