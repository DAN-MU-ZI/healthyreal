package com.healthyreal.be.api.repository;

import static org.assertj.core.api.Assertions.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.healthyreal.be.api.entity.Meal;
import com.healthyreal.be.api.entity.MealType;
import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.repository.user.UserRepository;
import com.healthyreal.be.oauth.entity.ProviderType;
import com.healthyreal.be.oauth.entity.RoleType;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class MealRepositoryTest {

	@Autowired
	private MealRepository mealRepository;
	@Autowired
	private UserRepository userRepository;
	private Member user;

	@BeforeEach
	void setUp() {
		user = new Member(
			"localuser",
			"Local User",
			"localuser@example.com",
			"Y",
			"http://test.com",
			ProviderType.KAKAO,
			RoleType.USER,
			LocalDateTime.now(),
			LocalDateTime.now()
		);
		userRepository.save(user);
	}

	@Test
	void testSaveAndFindMeal() {
		Meal meal = new Meal("Title", "Content", MealType.BREAKFAST, LocalDate.of(2024, 8, 4));
		meal.setMember(user);

		// When
		mealRepository.save(meal);
		List<Meal> meals = mealRepository.findAll();

		// Then
		assertThat(meals).hasSize(1);
		Meal savedMeal = meals.get(0);
		assertThat(savedMeal.getTitle()).isEqualTo("Title");
		assertThat(savedMeal.getContent()).isEqualTo("Content");
		assertThat(savedMeal.getMealType()).isEqualTo(MealType.BREAKFAST);
		assertThat(savedMeal.getDate()).isEqualTo(LocalDate.of(2024, 8, 4));
		assertThat(savedMeal.getMember()).isEqualTo(user);
	}

	@Test
	void testFindMealsByDate() {
		LocalDate targetDate = LocalDate.of(2024, 8, 4);
		Meal meal1 = new Meal("Title1", "Content1", MealType.BREAKFAST, targetDate);
		Meal meal2 = new Meal("Title2", "Content2", MealType.LUNCH, targetDate);
		Meal meal3 = new Meal("Title3", "Content3", MealType.DINNER, targetDate);
		Meal meal4 = new Meal("Title4", "Content4", MealType.DINNER, LocalDate.of(2222, 3, 3));
		List<Meal> mealList = List.of(meal1, meal2, meal3, meal4);
		mealList.forEach(meal -> meal.setMember(user));

		// When
		mealRepository.saveAll(mealList);
		List<Meal> mealsByDate = mealRepository.findMealsByDateAndMember(targetDate, user);

		// Then
		assertThat(mealsByDate).hasSize(3);
	}
}