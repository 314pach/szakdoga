package com.example.backend.repository;

import com.example.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> getTasksByModul_Id(Long modulId);

    @Query("SELECT task FROM Task task WHERE task.id in ?1")
    List<Task> findAllById(List<Long> taskIds);
}
