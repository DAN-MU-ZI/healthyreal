package com.healthyreal.be.repository;

import com.healthyreal.be.domain.Member;
import com.healthyreal.be.domain.ProviderType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
	Optional<Member> findByProviderTypeAndEmail(ProviderType providerType, String email);
}
