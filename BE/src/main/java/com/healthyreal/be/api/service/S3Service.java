package com.healthyreal.be.api.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.healthyreal.be.api.entity.cloud.S3Image;
import com.healthyreal.be.api.repository.cloud.S3ImageRepository;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class S3Service {
	private final AmazonS3Client amazonS3Client;
	private final S3ImageRepository s3ImageRepository;

	@Value("${cloud.aws.credentials.bucket}")
	private String bucket;

	public List<S3Image> saveImages(final List<MultipartFile> images, final String directory) {
		if (images.isEmpty()) {
			return Collections.emptyList();
		}

		return images.stream()
			.map(image -> saveImage(image, directory))
			.toList();
	}

	public S3Image saveImage(final MultipartFile file, final String entityName) {
		String originalFilename = getOriginalFilename(file);
		ObjectMetadata metadata = createObjectMetadata(file);
		String s3Path = generateS3Path(entityName, originalFilename);

		try (InputStream inputStream = file.getInputStream()) {
			uploadToS3(s3Path, inputStream, metadata);
			S3Image s3Image = new S3Image(originalFilename, getFileUrl(s3Path), LocalDateTime.now(),
				metadata.getContentLength(), metadata.getContentType());

			return s3ImageRepository.save(s3Image);
		} catch (IOException e) {
			throw new IllegalArgumentException();
		}
	}

	private String getOriginalFilename(final MultipartFile file) {
		return file.getOriginalFilename();
	}

	private ObjectMetadata createObjectMetadata(final MultipartFile file) {
		ObjectMetadata metadata = new ObjectMetadata();
		metadata.setContentLength(file.getSize());
		metadata.setContentType(file.getContentType());
		return metadata;
	}

	private String generateS3Path(final String entityName, final String originalFilename) {
		return entityName + "/" + UUID.randomUUID().toString() + "_" + originalFilename;
	}

	private void uploadToS3(final String path, final InputStream inputStream, final ObjectMetadata metadata) {
		amazonS3Client.putObject(
			new PutObjectRequest(bucket, path, inputStream, metadata)
				.withCannedAcl(CannedAccessControlList.PublicRead));
	}

	private String getFileUrl(final String path) {
		return amazonS3Client.getUrl(bucket, path).toString();
	}
}
