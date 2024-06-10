package backendremita.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @ToString
public class TaskManagementEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;

    private String taskDone;

    @Temporal(TemporalType.DATE)
    private LocalDate startDate;
    @Temporal(TemporalType.DATE)
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private currentStatus status;

    private String gitLabUrl;

    private  String gitLabCommitUrl;

    @Enumerated(EnumType.STRING)
    private serviceTeam team;

    private String month;

}
