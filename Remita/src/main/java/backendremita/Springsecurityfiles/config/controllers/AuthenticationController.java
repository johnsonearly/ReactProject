package backendremita.Springsecurityfiles.config.controllers;


import backendremita.Entities.userEntity;
import backendremita.Repositories.userInterface;
import backendremita.Springsecurityfiles.config.controllers.dtos.JWTAuthenticationResponse;
import backendremita.Springsecurityfiles.config.controllers.dtos.RefreshTokenRequest;
import backendremita.Springsecurityfiles.config.controllers.repos.Authentication;
import backendremita.dto.Login;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    @Autowired
  private final Authentication authentication;
    @Autowired
    private userInterface userRepo;


    @PostMapping("/signin")
    public ResponseEntity<JWTAuthenticationResponse> signin(@RequestBody Login signsIn){
        JWTAuthenticationResponse response = authentication.signIn(signsIn);


        return ResponseEntity.ok(response);

    }
    @PostMapping("/refreshtoken")
    public ResponseEntity<JWTAuthenticationResponse> refresh(@RequestBody RefreshTokenRequest refreshTokenRequest){
        return ResponseEntity.ok(authentication.refreshToken(refreshTokenRequest));
    }
//    @GetMapping("/info")
//    public userEntity getUserDetails(){
//        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        return authentication.findByEmail(email).get();
//    }


}

