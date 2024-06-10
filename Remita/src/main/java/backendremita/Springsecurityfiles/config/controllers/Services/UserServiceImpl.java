package backendremita.Springsecurityfiles.config.controllers.Services;

import backendremita.Springsecurityfiles.config.controllers.repos.User;
import backendremita.Springsecurityfiles.config.controllers.repos.UserAuthenticationInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements User {
    private final UserAuthenticationInterface userInterface;
    @Override
    public UserDetailsService userDetailsService(){
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                return userInterface.findByEmail(username)
                        .orElseThrow(() -> new  UsernameNotFoundException("UserNotFound") );
            }
        };
    }
}
