package com.healthyreal.be.api.repository.cloud;

import com.healthyreal.be.api.entity.cloud.S3Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface S3ImageRepository extends JpaRepository<S3Image, Long> {
}
