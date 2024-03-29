package com.example.backend.auth;

import com.example.backend.config.JwtService;
import com.example.backend.model.ApplicationUser;
import com.example.backend.model.Role;
import com.example.backend.repository.ApplicationUserRepository;
import com.example.backend.repository.FileRepository;
import com.example.backend.service.ApplicationUserService;
import com.example.backend.token.Token;
import com.example.backend.token.TokenRepository;
import com.example.backend.token.TokenType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class AuthenticationService {

    private final ApplicationUserRepository applicationUserRepository;
    private final ApplicationUserService applicationUserService;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @Autowired
    private FileRepository fileRepository;

    public AuthenticationService(ApplicationUserRepository applicationUserRepository, ApplicationUserService applicationUserService, TokenRepository tokenRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.applicationUserRepository = applicationUserRepository;
        this.applicationUserService = applicationUserService;
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
        user.setProfilePicture(fileRepository.findById(1L).orElse(null));
        user.setClassRooms(new HashSet<>());
        user.setCommitments(new HashSet<>());

        var savedUser = applicationUserRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
//        revokeAllUserTokens(savedUser);
        saveUserToken(savedUser, jwtToken);
        return new AuthenticationResponse(
                jwtToken,
                this.applicationUserService.toDto(user)
        );
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
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return new AuthenticationResponse(
                jwtToken,
                this.applicationUserService.toDto(user)
        );
    }

    private void revokeAllUserTokens(ApplicationUser user){
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
