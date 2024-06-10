package backendremita.Controllers;

import backendremita.Entities.TaskManagementEntity;
import backendremita.Entities.userEntity;
import backendremita.Services.TaskManagementServiceImpl;
import backendremita.Springsecurityfiles.config.controllers.Services.UserAuthenticationImplService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@Slf4j
@RequestMapping("/api/v1/tasks")

public class TaskControllers {
    @Autowired
    TaskManagementServiceImpl taskManagementService;
    @Autowired
    UserAuthenticationImplService userAuthenticationImplService;

    @PostMapping("/insertTasks")
    public ResponseEntity<String> insertTasks(@RequestBody TaskManagementEntity taskManagementEntity){

        return  taskManagementService.insertTasks(taskManagementEntity);

    }

    @PostMapping("/signup")
    public ResponseEntity<userEntity> signedup(@RequestBody userEntity signsUp){

        return ResponseEntity.ok(userAuthenticationImplService.signUp(signsUp));

    }
    @GetMapping("getByMonth/{month}")
    public List<TaskManagementEntity> getByMonth(@PathVariable String month) {
        return taskManagementService.getTaskByMonth(month);
    }

    @GetMapping("getByName/{name}")
    public List<TaskManagementEntity> getByName(@PathVariable String name) {
        return taskManagementService.getTasksByName(name);
    }
    @GetMapping("getById/{id}")
    public TaskManagementEntity getById(@PathVariable int id) {
        return taskManagementService.getTaskById(id);
    }
    @PutMapping("update/{id}")
    public TaskManagementEntity updateTasks(@PathVariable int id, @RequestBody TaskManagementEntity taskUpdate){
        return taskManagementService.updateTasks(id,taskUpdate);
    }



}
