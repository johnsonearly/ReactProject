package backendremita.Springsecurityfiles.config.controllers.dtos;

import lombok.Data;

@Data
public class JWTAuthenticationResponse {
    private String token;
    private String refreshToken;
}
