package com.healthyreal.be.api.service;

import com.healthyreal.be.api.entity.userschedule.UserSchedule;
import com.healthyreal.be.api.service.userschedule.UserScheduleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-schedules")
public class UserScheduleController {
	private final UserScheduleService userScheduleService;

	public UserScheduleController(UserScheduleService userScheduleService) {
		this.userScheduleService = userScheduleService;
	}

	@PostMapping
	public UserSchedule createSchedule(@RequestBody UserSchedule userSchedule) {
		return userScheduleService.createSchedule(userSchedule);
	}

	@DeleteMapping("/{id}")
	public void deleteSchedule(@PathVariable Long id) {
		userScheduleService.deleteSchedule(id);
	}

	@GetMapping("/{id}")
	public UserSchedule getSchedule(@PathVariable Long id) {
		return userScheduleService.getSchedule(id);
	}

	@GetMapping("/user/{userId}")
	public List<UserSchedule> getSchedulesByUserId(@PathVariable Long userId) {
		return userScheduleService.getSchedulesByUserId(userId);
	}
}