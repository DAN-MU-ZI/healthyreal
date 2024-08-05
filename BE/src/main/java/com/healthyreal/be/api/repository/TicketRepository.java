package com.healthyreal.be.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthyreal.be.api.entity.Ticket;
import com.healthyreal.be.api.entity.user.Member;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

	@Query("select t from Ticket t where t.trainer = :trainer")
	List<Ticket> findAllByTrainer(@Param("trainer") Member trainer);

	Ticket findByTrainerAndMember(Member trainer, Member member);

	List<Ticket> findAllByMember(Member member);
}
