package com.example.backend.auth;

import com.example.backend.config.JwtService;
import com.example.backend.model.ApplicationUser;
import com.example.backend.model.Role;
import com.example.backend.repository.ApplicationUserRepository;
import com.example.backend.token.Token;
import com.example.backend.token.TokenRepository;
import com.example.backend.token.TokenType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final ApplicationUserRepository applicationUserRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(ApplicationUserRepository applicationUserRepository, TokenRepository tokenRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.applicationUserRepository = applicationUserRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(RegisterRequest request) {
        var user = new ApplicationUser();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.STUDENT);
//        user.setClassRooms(new HashSet<>());
//        user.setCommitments(new HashSet<>());

        var savedUser = applicationUserRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
//        revokeAlllUserTokens(savedUser);
        saveUserToken(savedUser, jwtToken);
        return new AuthenticationResponse(jwtToken);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = applicationUserRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        revokeAlllUserTokens(user);
        saveUserToken(user, jwtToken);
        return new AuthenticationResponse(jwtToken);
    }

    private void revokeAlllUserTokens(ApplicationUser user){
        var validUserTokens = tokenRepository.findAllValidTokensByUser(user.getId());
        if (validUserTokens.isEmpty()){
            return;
        }
        validUserTokens.forEach(t -> {
            t.setExpired(true);
            t.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    private void saveUserToken(ApplicationUser user, String jwtToken) {
        var token = new Token();
        token.setApplicationUser(user);
        token.setToken(jwtToken);
        token.setTokenType(TokenType.BEARER);
        token.setRevoked(false);
        token.setExpired(false);
        tokenRepository.save(token);
    }
}
