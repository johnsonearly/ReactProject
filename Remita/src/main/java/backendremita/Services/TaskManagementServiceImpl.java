package backendremita.Services;

import backendremita.Entities.TaskManagementEntity;
import backendremita.Entities.userEntity;
import backendremita.Repositories.TaskManagementInterface;
import backendremita.Repositories.userInterface;
import backendremita.Springsecurityfiles.config.controllers.Services.JWTServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.time.ZoneId;
import java.time.format.TextStyle;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@Service
@Slf4j
public class TaskManagementServiceImpl {
    @Autowired
    public TaskManagementInterface taskManagementInterface;
    @Autowired
    public JWTServiceImpl service;
    @Autowired
    public userInterface interrepo;


    public ResponseEntity<String> insertTasks(TaskManagementEntity taskManagementEntity){
        try {
            Date currentDate = new Date();
            log.info(String.valueOf(taskManagementEntity));
            taskManagementEntity.setMonth(getMonthFromDate(currentDate));
            taskManagementInterface.save(taskManagementEntity);
            return ResponseEntity.ok("Task has been saved successfully");
        }
        catch (HttpMessageNotReadableException ex){
            return ResponseEntity.badRequest().body("Invalid date format in the request");
        }
        catch (Exception ex){
            return ResponseEntity.status(403).body(ex.getMessage());
        }
    }

    //Get All Information on tasks
    public List<TaskManagementEntity> getAllTasks(){

       List<TaskManagementEntity> tasks = taskManagementInterface.findByOrderByNameAsc();
       return tasks;
    }

public List<TaskManagementEntity> getTaskByMonth(String month){
        return taskManagementInterface.getAllByMonth(month);
}
    private  String getMonthFromDate(Date date) {
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Month month = localDate.getMonth();
        return month.getDisplayName(TextStyle.FULL, Locale.getDefault());
    }


    public  List<TaskManagementEntity> getTasksByName(String token){
        userEntity user = interrepo.findByEmail(service.extractUsername(token));
        String name = user.getName();
        List<TaskManagementEntity> tasks = taskManagementInterface.getAllByName(name);
        return tasks;
    }
    public TaskManagementEntity updateTasks(int id, TaskManagementEntity taskUpdate){
        TaskManagementEntity task = taskManagementInterface.findById(id).get();
        task.setTaskDone(String.valueOf(taskUpdate.getTaskDone()));
        task.setStatus(taskUpdate.getStatus());
        task.setGitLabCommitUrl(task.getGitLabCommitUrl());
        task.setStartDate(task.getStartDate());
        task.setEndDate(taskUpdate.getEndDate());
        task.setGitLabUrl(task.getGitLabUrl());
        taskManagementInterface.save(task);
        return task;
    }
    public TaskManagementEntity getTaskById(int id){
        TaskManagementEntity task = taskManagementInterface.findById(id).get();
        return task;

    }
    public Page<TaskManagementEntity> findAllTasks(int pageSize, int no){
        Pageable pageable = PageRequest.of(no-1,pageSize);
        return taskManagementInterface.findAll(pageable);
    }
 public Page<TaskManagementEntity> sortedTasks(int pageSize, int no){
        Pageable pageable = PageRequest.of(no-1,pageSize);
        return taskManagementInterface.findByOrderByNameAsc(pageable);

 }
    public Page<TaskManagementEntity> getEntitiesSortedByDateBetween(LocalDate startDate, LocalDate endDate, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return taskManagementInterface.findAllByStartDateBetweenOrderByStartDateAsc(startDate, endDate, pageRequest);
    }



}




