package backendremita.dto;

import backendremita.Entities.Role;
import lombok.Data;

@Data
public class LogInResponse {
    private String name;
    private String email;
    private int id;
    private boolean admin;
}
