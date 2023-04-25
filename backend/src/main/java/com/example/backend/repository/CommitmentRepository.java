package com.example.backend.repository;

import com.example.backend.model.Commitment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommitmentRepository extends JpaRepository<Commitment, Long> {
    //?1 IN (SELECT user.id FROM commitment.students user) AND
    @Query("SELECT commitment FROM Commitment commitment INNER JOIN commitment.students s WHERE s.id = ?1 AND commitment.task.id IN ?2")
    //todo rename
    List<Commitment> test(Long userId, List<Long> taskIds);

    @Query("SELECT commitment FROM Commitment commitment INNER JOIN commitment.students s WHERE s.id IN ?1 AND commitment.task.id IN ?2")
    List<Commitment> getCommitmentsByUsersAndModul(List<Long> userIds, List<Long> taskIds);
}
