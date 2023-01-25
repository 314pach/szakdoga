package com.example.backend.service;

import com.example.backend.model.Task;
import com.example.backend.model.dto.TaskDTO;
import com.example.backend.repository.ModulRepository;
import com.example.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class TaskService {
    @Autowired
    private ModulService modulService;

    @Autowired
    private ModulRepository modulRepository;

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Transactional(readOnly = true)
    public TaskDTO findById(Long id){
        return taskRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Transactional(readOnly = true)
    public Set<TaskDTO> findAll(){
        return toDto(taskRepository.findAll());
    }

    public TaskDTO save(TaskDTO taskDTO){
        return toDto(taskRepository.save(toEntity(taskDTO)));
    }

    public TaskDTO update(TaskDTO taskDTO){
        return toDto(taskRepository.save(toEntity(taskDTO)));
    }

    public void delete(Long id){
        taskRepository.deleteById(id);
    }

    public TaskDTO toDto(Task task){
        if(task == null) return null;

        TaskDTO taskDTO = new TaskDTO();

        taskDTO.setId(task.getId());
        taskDTO.setTitle(task.getTitle());
        taskDTO.setSummary(task.getSummary());
        taskDTO.setDescription(task.getDescription());
        taskDTO.setPoints(task.getPoints());
        taskDTO.setTeamwork(task.getTeamwork());
        taskDTO.setHeadcount(task.getHeadcount());
        taskDTO.setModulId(task.getModul().getId());

        return taskDTO;
    }

    public Set<TaskDTO> toDto(List<Task> tasks){
        return tasks.stream().map(this::toDto).collect(Collectors.toSet());
    }

    public Task toEntity(TaskDTO taskDTO){
        if(taskDTO == null) return null;

        Task task = new Task();

        task.setId(taskDTO.getId());
        task.setTitle(taskDTO.getTitle());
        task.setSummary(taskDTO.getSummary());
        task.setDescription(taskDTO.getDescription());
        task.setPoints(taskDTO.getPoints());
        task.setTeamwork(taskDTO.getTeamwork());
        task.setHeadcount(taskDTO.getHeadcount());
        modulRepository.findById(taskDTO.getModulId()).ifPresent(task::setModul);

        return task;
    }
}
