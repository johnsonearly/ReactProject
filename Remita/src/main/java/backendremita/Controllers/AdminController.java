package backendremita.Controllers;

import backendremita.Entities.TaskManagementEntity;
import backendremita.Services.TaskManagementServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/v1/admin/tasks")
public class AdminController {
    @Autowired
    TaskManagementServiceImpl taskManagementService;

    @GetMapping
    public List<TaskManagementEntity> fetchTasks(){
        return taskManagementService.getAllTasks();
    }


@GetMapping("/page/{pageNo}")
public Page<TaskManagementEntity> sortByName(@PathVariable(value = "pageNo") int pageNo) {
    int pageSize = 5;   // How many records on per page
    Page<TaskManagementEntity> page= taskManagementService.sortedTasks( pageSize,pageNo);
    return page;

}
    @GetMapping("/page/{pageNo}/{startDate}/{endDate}")
    public Page<TaskManagementEntity> sortByDate(
            @PathVariable(value = "startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @PathVariable(value ="endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @PathVariable(value = "pageNo") int pageNo) {
        int pageSize = 10;   // How many records on per page
        Page<TaskManagementEntity> page = taskManagementService.getEntitiesSortedByDateBetween(startDate, endDate, pageNo, pageSize);
        return page;
    }


    }




