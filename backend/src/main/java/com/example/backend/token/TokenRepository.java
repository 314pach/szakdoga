package com.example.backend.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {
    @Query("SELECT token FROM Token token INNER JOIN ApplicationUser user ON token.applicationUser.id = user.id WHERE user.id = ?1 AND (token.expired = false OR token.revoked = false)")
    List<Token> findAllValidTokensByUser(Long userId);

    Optional<Token> findByToken(String token);
}
