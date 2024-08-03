package com.healthyreal.be.api.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthyreal.be.api.entity.Meal;
import com.healthyreal.be.api.entity.user.Member;

public interface MealRepository extends JpaRepository<Meal, Long> {

	@Query("SELECT m " +
		"FROM Meal m " +
		"JOIN Ticket t ON m.member = t.member " +
		"WHERE t.trainer = :trainer AND t.endPoint > :date AND m.comment IS NULL")
	List<Meal> findMealsWithoutComment(@Param("trainer") Member trainer, @Param("date") LocalDate date);
}
