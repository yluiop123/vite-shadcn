package com.mm.security;

import java.util.ArrayList;

import com.mm.repository.system.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // create a user for "randomuser123"/"password".
        com.mm.entity.User user = userRepository.findByUsername(username);
        if (user==null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        } else {
            return new User(username,user.getPassword(), // encoded password
                    new ArrayList<>());
        }
    }
}
