package com.example.backend.auth;


import com.example.backend.model.dto.ApplicationUserDTO;

public class AuthenticationResponse {
    private String token;
    private ApplicationUserDTO applicationUser;

    public AuthenticationResponse() {

    }

    public AuthenticationResponse(String token, ApplicationUserDTO user) {
        this.token = token;
        this.applicationUser = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public ApplicationUserDTO getApplicationUser() {
        return applicationUser;
    }

    public void setApplicationUser(ApplicationUserDTO applicationUser) {
        this.applicationUser = applicationUser;
    }
}
