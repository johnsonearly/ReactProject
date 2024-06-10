package backendremita.Springsecurityfiles.config.controllers.Services;
import backendremita.Entities.Role;
import backendremita.Entities.userEntity;
import backendremita.Springsecurityfiles.config.controllers.dtos.JWTAuthenticationResponse;
import backendremita.Springsecurityfiles.config.controllers.dtos.RefreshTokenRequest;
import backendremita.Springsecurityfiles.config.controllers.repos.Authentication;
import backendremita.Springsecurityfiles.config.controllers.repos.JWTService;
import backendremita.Springsecurityfiles.config.controllers.repos.UserAuthenticationInterface;
import backendremita.dto.Login;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;


@Service
@RequiredArgsConstructor
public class UserAuthenticationImplService implements Authentication {
    @Autowired
    private  final UserAuthenticationInterface userauth;

    @Autowired
    private  final PasswordEncoder passwordEncoder;
    @Autowired
    private  final AuthenticationManager authenticationManager;
    @Autowired
    private final JWTService jwtService;



    public userEntity signUp(userEntity signingUp){
        userEntity user = new userEntity();
        if(userauth.findByEmail(signingUp.getEmail()).isEmpty()) {
            user.setEmail(signingUp.getEmail());
            user.setName(signingUp.getName());
            user.setRole(signingUp.getRole());
            user.setPassword(passwordEncoder.encode(signingUp.getPassword()));

            user.setRole(signingUp.getRole());
            user.setAdmin(signingUp.getRole() == Role.ADMIN);

            return  userauth.save(user);


        }
        else{
            return null;

        }

    }
    public JWTAuthenticationResponse signIn(Login signInRequest) {
                try {
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getEmail(),
                            signInRequest.getPassword()));

                    var user = userauth.findByEmail(signInRequest.getEmail()).orElseThrow(() -> new IllegalArgumentException("Email not available"));
                    var jwt = jwtService.generateToken( user,user);

                    var refreshToken = jwtService.generateRefreshToken(new HashMap<>(),  user );

                    JWTAuthenticationResponse jwtAuthenticationResponse = new JWTAuthenticationResponse();
                     jwtAuthenticationResponse.setToken(jwt);
                     jwtAuthenticationResponse.setRefreshToken(refreshToken);
                    return jwtAuthenticationResponse;
        } catch (Exception e) {
           throw new IllegalArgumentException("Error" + e.getMessage());
        }


    }
    public JWTAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest){
        String username = jwtService.extractUsername(refreshTokenRequest.getToken());
       userEntity userAuthentication =  userauth.findByEmail(username).orElseThrow();
        if(jwtService.isTokenValid(refreshTokenRequest.getToken(),userAuthentication)){
            var jwt = jwtService.generateToken(userAuthentication,userAuthentication);
            JWTAuthenticationResponse jwtAuthenticationResponse = new JWTAuthenticationResponse();
            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());
            return jwtAuthenticationResponse;
        }

      return null;


    }
}
