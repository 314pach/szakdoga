package com.example.backend.repository;

import com.example.backend.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("SELECT message FROM Message message WHERE (message.sender.id = ?1 AND message.receiver.id = ?2) OR (message.sender.id = ?2 AND message.receiver.id = ?1)")
    List<Message> findAllByParties(Long user1, Long user2);
}
