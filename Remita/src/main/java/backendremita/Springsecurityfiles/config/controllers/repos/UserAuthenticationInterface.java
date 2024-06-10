package backendremita.Springsecurityfiles.config.controllers.repos;
import backendremita.Entities.userEntity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserAuthenticationInterface extends JpaRepository<userEntity,Long> {
    Optional<userEntity> findByEmail(String email);




}
