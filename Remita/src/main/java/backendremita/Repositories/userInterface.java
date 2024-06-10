package backendremita.Repositories;

import backendremita.Entities.userEntity;
import backendremita.Springsecurityfiles.config.controllers.dtos.JWTAuthenticationResponse;
import backendremita.Springsecurityfiles.config.controllers.dtos.RefreshTokenRequest;
import backendremita.dto.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface userInterface extends JpaRepository<userEntity,Integer> {
    userEntity findByEmail(String email);

}
