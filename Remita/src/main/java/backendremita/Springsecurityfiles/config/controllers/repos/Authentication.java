package backendremita.Springsecurityfiles.config.controllers.repos;
import backendremita.Entities.userEntity;
import backendremita.Springsecurityfiles.config.controllers.dtos.JWTAuthenticationResponse;
import backendremita.Springsecurityfiles.config.controllers.dtos.RefreshTokenRequest;
import backendremita.dto.Login;

public interface Authentication {
    userEntity signUp(userEntity entity);
    JWTAuthenticationResponse signIn(Login signInRequest);
    JWTAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);

}
