package com.cagkankantarci.e_ticaret.service.impl;

import com.cagkankantarci.e_ticaret.model.User;
import com.cagkankantarci.e_ticaret.payload.request.LoginRequest;
import com.cagkankantarci.e_ticaret.repository.UserRepository;
import com.cagkankantarci.e_ticaret.security.JwtUtils;
import com.cagkankantarci.e_ticaret.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    public User login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return userRepository.findByUsername(loginRequest.getUsername())
            .orElseThrow(() -> new RuntimeException("Hata: Kullanıcı bulunamadı."));
    }
}