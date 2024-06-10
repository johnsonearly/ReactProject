package backendremita.Springsecurityfiles.config.controllers.repos;

import backendremita.Entities.userEntity;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;

public interface JWTService {

    String generateToken(UserDetails userDetails, userEntity user);

    boolean isTokenValid(String token, UserDetails userDetails);

    String generateRefreshToken(Map<String, Object> extraClaims, UserDetails userDetails);

    String extractUsername(String token);
}
