package backendremita.Repositories;

import backendremita.Entities.TaskManagementEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface TaskManagementInterface extends JpaRepository<TaskManagementEntity,Integer> {


    List<TaskManagementEntity> getAllByMonth(String month);

    List<TaskManagementEntity> getAllByName(String name);

    Page<TaskManagementEntity> findAllByName(String name, Pageable pageable);

    Page<TaskManagementEntity> findByOrderByNameAsc(Pageable pageable);

    List<TaskManagementEntity> findByOrderByNameAsc();

    Page<TaskManagementEntity> findAllByStartDateBetweenOrderByStartDateAsc(LocalDate startDate, LocalDate endDate, PageRequest pageRequest);
}
